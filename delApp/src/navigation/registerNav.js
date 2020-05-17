import React, {Fragment} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import register from '../screens/verify/register';
import VerifyPass from '../screens/verify/verifypass';
import profile from '../screens/main/profile';
const Stack = createStackNavigator();

const RegisterNav = () => {
  return (
    <Fragment>
      <Stack.Navigator>
        <Stack.Screen
          name={'register'}
          component={register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'verifyRegister'}
          component={VerifyPass}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Fragment>
  );
};
export default React.memo(RegisterNav);
