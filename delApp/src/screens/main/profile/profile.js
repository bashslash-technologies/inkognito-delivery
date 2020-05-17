import React, {Fragment} from 'react';
import colors from '../../../constants/colors';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';

export default function Profile({navigation}) {
  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          {/*<TouchableOpacity onPress={() => navigation.pop()}>*/}
          {/*  <FontAwesome5*/}
          {/*    name="arrow-left"*/}
          {/*    size={16}*/}
          {/*    style={{fontWeight: 'bold'}}*/}
          {/*  />*/}
          {/*</TouchableOpacity>*/}
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
                Create your Profile
              </Text>
            </View>
            <View
              style={{
                marginVertical: 40,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{borderRadius: 100, width: 110, height: 110}}
                source={require('../../../assets/Images/pro.jpeg')}
              />
              <View
                style={{
                  bottom: 8,
                  right: 0,
                  zIndex: 2,
                  position: 'absolute',
                  backgroundColor: '#fff',
                  borderRadius: 100,
                }}>
                <FontAwesome5
                  name="plus-circle"
                  color={colors['color-primary-900']}
                  style={{zIndex: 2, fontSize: RFValue(23)}}
                />
              </View>
            </View>
          </View>

          <View style={{width: '80%'}}>
            <View style={{}}>
              <TextInput
                style={{
                  ...styles.Input,
                  marginTop: 20,
                  zIndex: 2,
                }}
                autoFocus={true}
                keyboardAppearance="dark"
                placeholder={'First'}
                returnKeyType={'next'}
              />
              <TextInput
                style={{
                  ...styles.Input,
                  marginTop: 20,
                  zIndex: 2,
                }}
                keyboardAppearance="dark"
                placeholder={'last'}
                returnKeyType={'done'}
              />
            </View>

            <TouchableOpacity
              onPress={() => navigation.push('deldetails')}
              style={{
                backgroundColor: colors['color-primary-900'],
                borderRadius: 5,
                color: '#fff',
                height: 40,
                zIndex: 2,
                flexDirection: 'row',
                marginVertical: 30,
                justifyContent: 'center',
                alignItems: 'center',
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

              <FontAwesome5
                style={{position: 'absolute', right: 10}}
                name={'chevron-right'}
                size={RFValue(16)}
                color={'#fff'}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              width: '70%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '400',
                opacity: 0.3,
                fontSize: RFValue(10),
                fontFamily: 'Quicksand-Light',
              }}>
              {' '}
              By signing up, you agree to our terms of use and privacy policy
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors['color-primary-900'],
            borderRadius: 5,
            color: '#fff',
            height: 40,
            zIndex: 2,
            flexDirection: 'row',
            marginVertical: 30,
            marginHorizontal: RFValue(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: RFValue(18),
              fontWeight: '800',
              fontFamily: 'Quicksand-Regular',
            }}>
            Skip
          </Text>

          <FontAwesome5
            style={{position: 'absolute', right: 10}}
            name={'chevron-right'}
            size={RFValue(16)}
            color={'#fff'}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </Fragment>
  );
}

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
    height: 47,
    backgroundColor: '#fff',
    zIndex: 2,
    padding: 10,
    borderRadius: 5,
    fontFamily: 'Quicksand-Regular',
  },
  form: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
