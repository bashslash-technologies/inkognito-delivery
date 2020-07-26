import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RequestsComponent from './requests';
import OngoingRequestsComponent from './onGoing';
const Tab = createMaterialTopTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator initialRouteName={'RequestTab'}>
      <Tab.Screen
        name="RequestTab"
        options={{title: 'Upcoming'}}
        component={RequestsComponent}
      />
      <Tab.Screen
        name="OngoingRequest"
        options={{title: 'Ongoing'}}
        component={OngoingRequestsComponent}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
