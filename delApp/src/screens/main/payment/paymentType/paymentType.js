import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../../../constants/colors';
import {Image} from 'react-native-paper/src/components/Avatar/Avatar';

const PaymentType = ({navigation}) => {
  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" size={20} style={{fontWeight: 'bold'}} />
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
                Payment Type
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
              <Image
                style={{backgroundColor: '#fff'}}
                source={require('../../../../assets/Images/momo.png')}
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
                    fontSize: RFValue(18),
                    // paddingVertical: RFValue(4),
                  }}>
                  MTN MOBILE MONEY
                </Text>
              </View>
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
              <Image
                style={{backgroundColor: '#fff'}}
                source={require('../../../../assets/Images/momo.png')}
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
                    fontSize: RFValue(18),
                    // paddingVertical: RFValue(4),
                  }}>
                  Airtel / Tigo cash
                </Text>
              </View>
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
              <Image
                style={{backgroundColor: '#fff'}}
                source={require('../../../../assets/Images/momo.png')}
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
                    fontSize: RFValue(18),
                    // paddingVertical: RFValue(4),
                  }}>
                  Vodafone Cash
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.push('dash')}
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
                Done
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

export default PaymentType;
