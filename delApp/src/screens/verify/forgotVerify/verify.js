import React, {Fragment, useEffect, useState} from 'react';
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
  Modal,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import CodeInput from 'react-native-confirmation-code-input';
import {get, patch, post} from '../../../services/transport';
import {showMessage} from 'react-native-flash-message';

export default function Verify({navigation, route}) {
  const [countDown, setCountdown] = useState(59);
  const [resendLoad, setResetLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let timer;
    if (countDown > 0) setTimeout(() => setCountdown(countDown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countDown]);

  const handleSubmit = async (code) => {
    try {
      setLoading(true);
      let results = await post('/users/reset', {
        username: route.params.email,
        code,
      });
      results = results.data;
      console.log(results);
      if (!results.success) {
        setLoading(false);
        showMessage({
          message: 'Error',
          description: results.message,
          type: 'danger',
        });
        return;
      }
      navigation.push('NewPassword', {
        id: results.payload.id,
        user_data: results.payload,
      });
      setLoading(false);
      return;
    } catch (e) {
      setLoading(false);
      setTimeout(() => {
        showMessage({
          message: 'Error',
          description: e.response.data.error,
          type: 'danger',
        });
      }, 900);
    }
  };

  const handleResendVerification = async () => {
    try {
      setResetLoad(true);
      let results = await get(`/users/reset?username=${route.params.email}`);
      results = results.data;
      if (!results.success) {
        setLoading(false);
        showMessage({
          message: 'Error',
          description: results.message,
          type: 'danger',
        });
        return;
      }
      setResetLoad(false);
      if (countDown == 0) setCountdown(59);
    } catch (e) {
      setResetLoad(false);
      setCountdown(0);
      showMessage({
        message: 'Error',
        description: e.response.data.error,
        type: 'danger',
      });
    }
  };
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
                Password Reset
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
              A verification code has been sent to{' '}
              <Text style={{fontWeight: 'bold', fontSize: RFValue(12)}}>
                your phone
              </Text>
            </Text>
            <View style={{height: 110}}>
              <CodeInput
                keyboardType="numeric"
                activeColor={'#000'}
                inactiveColor="#000"
                autoFocus={true}
                inputPosition="center"
                codeLength={6}
                className={'border-circle'}
                space={10}
                size={40}
                onFulfill={(code) => handleSubmit(code)}
                containerStyle={{marginTop: 30}}
                codeInputStyle={{
                  borderWidth: 1,
                  borderRadius: 3,
                  fontSize: 20,
                  color: '#000',
                }}
              />
            </View>

            <View style={styles.resend_code}>
              <Text style={styles.subText} subText={true}>
                Didn't receive SMS?{' '}
              </Text>
              {resendLoad ? (
                <Text subText={true} style={styles.resendBtn}>
                  {' '}
                  Loading...
                </Text>
              ) : countDown !== 0 ? (
                <Text subText={true} style={styles.resendBtn}>
                  {' '}
                  0:{countDown < 10 ? `0${countDown}` : countDown}
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResendVerification}>
                  <Text subText={true} style={styles.resendBtn}>
                    {' '}
                    Resend Code
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <FontAwesome5
              name="user-check"
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
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '400',
              opacity: 0.5,
              fontSize: RFValue(12),
              marginTop: 20,
            }}>
            {' '}
            Verify your account to get started.
          </Text>
        </View>
      </SafeAreaView>
      <View>
        <Modal transparent={true} visible={loading} animationType={'fade'}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,.7)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator />
          </View>
        </Modal>
      </View>
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
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  form: {
    width: '80%',
    justifyContent: 'center',
  },
  resend_code: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendBtn: {
    fontWeight: 'bold',
  },
});
