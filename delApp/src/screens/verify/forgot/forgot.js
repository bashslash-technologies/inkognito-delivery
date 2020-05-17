import React, {Fragment} from 'react';
import colors from '../../../constants/colors';
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
                Forgot Password?
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
              Please enter your email to receive instructions on how to reset
              password
            </Text>
            <TextInput
              style={{...styles.Input, marginTop: 30, zIndex: 2}}
              placeholder="Email"
              autoFocus={true}
              keyboardAppearance="dark"
              keyboardType="email-address"
            />
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
                  navigation.push('verify');
                }}
                title="Send Now"
                color="#fff"
              />
            </View>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <FontAwesome5
              name="envelope-open-text"
              color={colors['color-primary-900']}
              style={{zIndex: 2, fontSize: RFValue(100)}}
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
          <TouchableOpacity>
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
