import React, {Fragment} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login';
import forgot from '../screens/verify/forgot';
import Verify from '../screens/verify/forgotVerify';
import NewPasswordComponent from '../screens/verify/newPassword';

const Stack = createStackNavigator();

//import screens

const LoginNav = () => {
  return (
    <Fragment>
      <Stack.Navigator>
        <Stack.Screen
          name={'login'}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'verify'}
          component={Verify}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'reset'}
          component={forgot}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'NewPassword'}
          component={NewPasswordComponent}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Fragment>
  );
};

export default React.memo(LoginNav);
