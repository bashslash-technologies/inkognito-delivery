import React, {Fragment} from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/main/profile';
import Tracking from '../screens/main/Tracking';
import DelDetails from '../screens/main/deliveryDetails';
import PaymentType from '../screens/main/payment/paymentType';
const Stack = createStackNavigator();
const MainNav = () => {
  return (
    <Fragment>
      <Stack.Navigator>
        <Stack.Screen
          name={'profile'}
          component={Profile}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={'tracking'}
          component={Tracking}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={'deldetails'}
          component={DelDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={'paymentType'}
          component={PaymentType}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Fragment>
  );
};
export default React.memo(MainNav);
