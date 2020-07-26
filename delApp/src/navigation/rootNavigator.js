import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  Fragment,
  useReducer,
} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import welcome from '../screens/welcome';
import MainNav from './mainNav';
import AuthNavigator from './AuthNav';
import Store from '../services';
import LoadingComponent from './loading';

const Stack = createStackNavigator();
function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Onboard'}
        component={welcome}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export const AuthContext = createContext();
const Manipulator = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.userToken,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

const RootNavigator = (props) => {
  const [state, dispatch] = useReducer(Manipulator, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  useEffect(() => {
    (async () => {
      let userToken;
      try {
        userToken = await Store.getToken('@user_token');
      } catch (e) {
        console.warn(e.message);
      }
      //dispatch the token into context
      dispatch({
        type: 'RESTORE_TOKEN',
        userToken: JSON.parse(userToken),
      });
    })();
  }, []);

  const authContextController = useMemo(
    () => ({
      signIn: async (data) => {
        try {
          await Store.storeToken('@user_token', JSON.stringify(data));
          dispatch({type: 'SIGN_IN', token: data});
        } catch (e) {
          console.warn(e);
        }
      },
      signOut: async () => {
        try {
          await Store.storeToken('@user_token', null);
          dispatch({type: 'SIGN_OUT'});
        } catch (e) {
          console.log(e.message);
        }
      },
    }),
    [],
  );

  return (
    <Fragment>
      {state.isLoading ? (
        <LoadingComponent />
      ) : (
        <AuthContext.Provider value={[authContextController, state]}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={'Onboard'}>
              {state.userToken === null ? (
                <Fragment>
                  <Stack.Screen
                    name={'Onboard'}
                    component={Root}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name={'Auth'}
                    component={AuthNavigator}
                    options={{
                      headerShown: false,
                      animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                    }}
                  />
                </Fragment>
              ) : (
                <Stack.Screen
                  name={'MainNav'}
                  component={MainNav}
                  options={{headerShown: false}}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      )}
    </Fragment>
  );
};
export default RootNavigator;
