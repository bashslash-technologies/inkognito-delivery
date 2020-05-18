import React, {Fragment, useState, useContext} from 'react';
import {
  View,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
  Text,
  useWindowDimensions,
  Image,
  StatusBar,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Tracking from '../screens/main/Tracking';
import DelDetails from '../screens/main/deliveryDetails';
import PaymentType from '../screens/main/payment/paymentType';
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import {AuthContext} from './rootNavigator';
import colors from '../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainNav = () => {
  const [{signOut}, data] = useContext(AuthContext);
  const dimensions = useWindowDimensions();

  const handleLogout = () => {
    Alert.alert(
      'Notice',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => await signOut(),
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />

      <Drawer.Navigator
        initialRouteName={'Rides'}
        drawerType={dimensions.width > 900 ? 'permanent' : 'front'}
        drawerContent={(props) => {
          return (
            <View
              style={{flex: 1}}
              forceInset={{top: 'always', horizontal: 'never'}}>
              <SafeAreaView
                style={{
                  backgroundColor: colors['color-primary-900'],
                  height: dimensions.height / 3,
                  justifyContent: 'center',
                  marginBottom: RFValue(5),
                }}>
                <View
                  style={{
                    paddingHorizontal: RFValue(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/Images/delguy.jpg')}
                    style={{width: 100, height: 100, borderRadius: 50}}
                  />
                </View>
                <TouchableHighlight
                  underlayColor={'#1c73ff'}
                  onPress={() => {
                    // props.navigation.navigate('Profile')
                    alert('hello');
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: RFValue(10),
                    }}>
                    <View>
                      <Text
                        subText
                        style={{
                          marginTop: 20,
                          color: '#fff',
                          fontSize: 20,
                          textAlign: 'center',
                        }}>
                        {data?.userToken?.profile?.name?.last}{' '}
                        {data?.userToken?.profile?.name?.others}
                      </Text>
                      <Text style={{color: '#f0f0f0', textAlign: 'center'}}>
                        +{data?.userToken?.profile?.contact}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </SafeAreaView>
              <ScrollView>
                <DrawerItemList {...props} />
              </ScrollView>
              <SafeAreaView>
                <TouchableHighlight
                  underlayColor={'#ddd'}
                  onPress={handleLogout}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: RFValue(15),
                      paddingVertical: RFValue(7),
                    }}>
                    <View style={{flex: 1}}>
                      <FontAwesome5
                        name={'sign-out-alt'}
                        size={27}
                        style={{color: colors['color-primary-900']}}
                      />
                    </View>
                    <View style={{flex: 4}}>
                      <Text
                        subText
                        style={{fontSize: RFValue(16), color: '#6e6a6a'}}>
                        Logout
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </SafeAreaView>
            </View>
          );
        }}
        drawerContentOptions={{
          labelStyle: {fontSize: 17},
          activeTintColor: '#343536',
        }}>
        <Drawer.Screen
          component={Tracking}
          name={'Home'}
          options={{
            drawerLabel: 'Home',
            drawerIcon: ({focused}) => (
              <FontAwesome5
                name={'map-pin'}
                size={23}
                style={{
                  color: focused ? colors['color-primary-900'] : '#dedede',
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          component={PaymentType}
          name={'paymentType'}
          options={{
            drawerLabel: 'Payment',
            drawerIcon: ({focused}) => (
              <FontAwesome5
                name={'map-pin'}
                size={23}
                style={{
                  color: focused ? colors['color-primary-900'] : '#dedede',
                }}
              />
            ),
          }}
        />
      </Drawer.Navigator>
      {/*<Stack.Navigator>*/}
      {/*  <Stack.Screen*/}
      {/*    name={'deldetails'}*/}
      {/*    component={DelDetails}*/}
      {/*    options={{headerShown: false}}*/}
      {/*  />*/}

      {/*  <Stack.Screen*/}
      {/*    name={'paymentType'}*/}
      {/*    component={PaymentType}*/}
      {/*    options={{headerShown: false}}*/}
      {/*  />*/}
      {/*</Stack.Navigator>*/}
    </Fragment>
  );
};
export default React.memo(MainNav);
