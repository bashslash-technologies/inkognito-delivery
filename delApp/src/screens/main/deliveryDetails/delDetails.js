import React, {Fragment} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../../constants/colors';

const DelDetails = ({navigation}) => {
  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <FontAwesome5
              name="arrow-left"
              size={16}
              style={{fontWeight: 'bold'}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 12, alignItems: 'center'}}>
          <View style={styles.form}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFValue(17),
                  color: colors['color-primary-900'],
                  fontFamily: 'Quicksand-Bold',
                }}>
                Delivery Details
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '400',
                opacity: 0.5,
                fontSize: RFValue(12),
                marginTop: 20,
              }}>
              {' '}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
                borderRadius: 5,
                backgroundColor: '#fff',
                paddingHorizontal: RFValue(10),
                zIndex: 2,
              }}>
              <FontAwesome5
                name={'map-marker-alt'}
                color={colors['color-primary-700']}
                size={RFValue(16)}
              />
              <TextInput
                style={{...styles.Input, flex: 1}}
                placeholder="Enter a new address"
                autoFocus={true}
                keyboardAppearance="dark"
                keyboardType="email-address"
              />
            </View>

            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: RFValue(25),
                flexDirection: 'row',
              }}>
              <FontAwesome5
                name={'location-arrow'}
                color={colors['color-primary-700']}
                size={15}
              />
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Quicksand-light',
                  marginHorizontal: RFValue(10),
                  textAlign: 'center',
                }}>
                Use current location
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: RFValue(60),
                backgroundColor: '#fff',
                borderRadius: 10,
                flexDirection: 'row',
                zIndex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: RFValue(8),
                marginBottom: RFValue(10),
              }}>
              <FontAwesome5
                style={{flex: 1}}
                name={'clock'}
                color={colors['color-primary-700']}
                size={RFValue(16)}
              />
              <View
                style={{
                  flex: 12,
                  flexDirection: 'column',
                  paddingHorizontal: RFValue(10),
                }}>
                <Text
                  style={{
                    fontFamily: 'Quicksand-Regular',
                    fontWeight: '600',
                    // paddingVertical: RFValue(4),
                  }}>
                  Unit 10 , 2F. 123 Dome Street
                </Text>
                <Text
                  style={{
                    fontFamily: 'Quicksand-Light',
                    paddingVertical: RFValue(4),
                  }}>
                  Accra - Ghana
                </Text>
              </View>
              <FontAwesome5
                style={{flex: 1}}
                name={'check'}
                color={colors['color-success-900']}
                size={RFValue(16)}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.push('paymentType')}
              style={{
                backgroundColor: colors['color-primary-900'],
                borderRadius: 5,
                color: '#fff',
                height: 40,
                zIndex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: RFValue(18),
                  fontWeight: '800',
                  fontFamily: 'Quicksand-Light',
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['color-warning-transparent-100'],
  },
  headerView: {
    padding: 15,
    flex: 1,
  },
  Input: {
    height: 40,
    borderRadius: 5,
    backgroundColor: '#fff',
    zIndex: 2,
    padding: 10,
  },
  form: {
    width: '80%',
    justifyContent: 'center',
  },
});

export default DelDetails;
