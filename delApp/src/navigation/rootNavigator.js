import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import welcome from '../screens/welcome';
import Storage from '../services';
import MainNav from './mainNav';
import LoginNav from './loginNav';
import registerNav from './registerNav';

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

const RootNavigator = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      let token = await Storage.getToken('@onboard');
      setData(token);
    })();
  }, [data]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Onboard'}>
        <Stack.Screen
          name={'Onboard'}
          component={Root}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'loginRoot'}
          component={LoginNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'registerRoot'}
          component={registerNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'MainNav'}
          component={MainNav}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
