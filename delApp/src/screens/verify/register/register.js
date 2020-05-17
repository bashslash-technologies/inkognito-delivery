import React, {Fragment} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../../constants/colors';

const Register = ({navigation}) => {
  const [value, onChangeText] = React.useState('');
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
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={styles.form}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFValue(18),
                  color: colors['color-primary-900'],
                  fontFamily: 'Quicksand-Bold',
                }}>
                Create your account
              </Text>
            </View>
            <TextInput
              style={{...styles.Input, marginTop: 40}}
              placeholder="Email"
              autoFocus={true}
              keyboardAppearance="dark"
              keyboardType="email-address"
            />
            <TextInput
              style={{...styles.Input, marginVertical: 15}}
              placeholder="password"
              keyboardAppearance="dark"
              secureTextEntry={true}
            />
            <TextInput
              style={{...styles.Input}}
              placeholder="phone"
              keyboardAppearance="dark"
              maxLength={12}
              keyboardType="numbers-and-punctuation"
            />

            <TouchableOpacity
              onPress={() => {
                navigation.push('verifyRegister');
              }}
              style={{
                backgroundColor: colors['color-primary-900'],
                borderRadius: 5,
                color: '#fff',
                height: 40,
                zIndex: 2,
                marginVertical: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: RFValue(16),
                  fontFamily: 'Quicksand-Bold',
                  marginHorizontal: RFValue(5),
                }}>
                Next
              </Text>
              <FontAwesome5
                color="#fff"
                name="chevron-circle-right"
                size={18}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '300',
                opacity: 0.4,
                fontSize: RFValue(10),
              }}>
              {' '}
              By signing up you agree to our terms of use and privacy policy
            </Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{aspectRatio: 1, resizeMode: 'contain'}}
              source={require('../../../assets/Images/ride.png')}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{textAlign: 'center', fontWeight: '300', opacity: 0.4}}>
            {' '}
            Already have an account?...
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('loginRoot');
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: colors['color-primary-600'],
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['color-warning-transparent-100'],
    zIndex: 0,
  },
  headerView: {
    padding: 10,
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
    zIndex: 0,
  },
});

export default Register;
