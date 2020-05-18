import React, {Fragment} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import register from '../screens/verify/register';
import VerifyPass from '../screens/verify/verifypass';
import profile from '../screens/main/profile';
import Profile from '../screens/main/profile/profile';
import UploadLicense from '../screens/main/profile/uploadLicense';
import SuccessPage from '../screens/verify/success/success';
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
        <Stack.Screen
          name={'profile'}
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'UploadLicense'}
          component={UploadLicense}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'SuccessPage'}
          component={SuccessPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Fragment>
  );
};
export default React.memo(RegisterNav);
