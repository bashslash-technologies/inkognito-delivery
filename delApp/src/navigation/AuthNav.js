import React, {Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import RegisterNav from './registerNav';
import loginNav from './loginNav';
const Stack = createStackNavigator();
const AuthNav = () => {
  return (
    <Fragment>
      <Stack.Navigator>
        <Stack.Screen
          name={'loginRoot'}
          component={loginNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'registerRoot'}
          component={RegisterNav}
          options={{headerShown: false}}
        />
        {/*<Stack.Screen name={LoginNav} options={{headerShown:false}} />*/}
      </Stack.Navigator>
    </Fragment>
  );
};

export default AuthNav;
