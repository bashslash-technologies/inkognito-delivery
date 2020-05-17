import React, {Fragment} from 'react';
import colors from '../../constants/colors';
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

export default function Login({navigation}) {
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
                }}>
                LOGIN
              </Text>
            </View>
            <TextInput
              style={{...styles.Input, marginTop: 30}}
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
            <TouchableOpacity
              onPress={() => navigation.push('reset')}
              style={{
                alignItems: 'flex-end',
              }}>
              <Text style={{color: colors['color-primary-900']}}>
                forgot password?
              </Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: colors['color-primary-900'],
                borderRadius: 5,
                color: '#fff',
                height: 40,
                zIndex: 2,
                marginVertical: 20,
              }}>
              <Button
                onPress={() => {
                  navigation.push('tracking');
                }}
                title="Login"
                color="#fff"
              />
            </View>
          </View>

          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{
                aspectRatio: 1.5,
                resizeMode: 'contain',
              }}
              source={require('../../assets/Images/part-time-rider.png')}
            />
          </View>
        </View>
        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text> Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('registerRoot')}>
            <Text
              style={{
                fontWeight: 'bold',
                color: colors['color-primary-600'],
              }}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
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
