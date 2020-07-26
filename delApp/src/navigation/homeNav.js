import React, {Fragment} from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import TrackingComponent from '../screens/main/Tracking';
import SingleRequest from '../screens/main/Tracking/request/singleRequest';
import VendorOnMap from '../screens/main/Tracking/request/vendorOnMap';
import colors from '../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MyTabs from '../screens/main/Tracking/request';
const Stack = createStackNavigator();

//import screens

const TrackingNav = () => {
  return (
    <Fragment>
      <Stack.Navigator>
        <Stack.Screen
          name={'Requests'}
          component={MyTabs}
          options={({navigation}) => ({
            headerTitleStyle: {color: '#fff'},
            headerStyle: {backgroundColor: colors['color-primary-900']},
            headerLeft: () => (
              <Fragment>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.toggleDrawer()}>
                  <FontAwesome5 name={'bars'} color={'#fff'} size={20} />
                </TouchableOpacity>
              </Fragment>
            ),
            headerLeftContainerStyle: {
              marginLeft: 20,
            },
          })}
        />
        <Stack.Screen
          name={'track'}
          component={TrackingComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'singleRequest'}
          component={SingleRequest}
          options={({navigation, route}) => ({
            title: route.params.request.name,
            headerTitleStyle: {color: '#fff'},
            headerBackTitleStyle: {color: '#fff'},
            headerStyle: {backgroundColor: colors['color-primary-900']},
          })}
        />
        <Stack.Screen
          name={'viewMap'}
          component={VendorOnMap}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Fragment>
  );
};

export default React.memo(TrackingNav);
