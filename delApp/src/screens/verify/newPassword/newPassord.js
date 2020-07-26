import React, {Fragment, useState, useRef} from 'react';
import colors from '../../../constants/colors';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import {showMessage} from 'react-native-flash-message';
import {patch, post} from '../../../services/transport';

export default function NewPasswordComponent({navigation, route}) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const confirmRef = useRef(null);

  console.log(route.params.user_data.user._id);

  const validate = (data, errorMsg, type = '') => {
    let valid = true;
    if (type === 'email') valid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data);
    if (type === 'contact') valid = data.length >= 10;
    if (type === 'password') valid = data.length >= 6;
    if (data.trim() === '' || valid === false) {
      showMessage({
        message: 'Error',
        description: errorMsg,
        type: 'danger',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (
      !validate(
        password.trim(),
        'Password should be more than 6 characters',
        'password',
      )
    )
      return;

    if (password.trim() !== confirm.trim()) {
      return showMessage({
        message: 'Error',
        description: 'Passwords do not match',
        type: 'danger',
      });
    }

    try {
      setLoading(true);
      let results = await post(`/users/password`, {
        password: password.trim(),
        user_id: route.params.user_data.user._id,
      });
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
      setLoading(false);
      setPassword('');
      setConfirm('');
      navigation.popToTop();
      showMessage({
        message: 'Success',
        description: 'Your password has been reset successfully',
        type: 'success',
      });
    } catch (e) {
      showMessage({
        message: 'Error',
        description: e.response.data.error,
        type: 'danger',
      });
      setLoading(false);
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
                New Password
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
              Please enter your new password and then confirm it accordingly
            </Text>
            <TextInput
              style={{...styles.Input, marginTop: 30, zIndex: 2}}
              onSubmitEditing={() => confirmRef.current.focus()}
              placeholder="New Password"
              autoFocus={true}
              keyboardAppearance="dark"
              returnKeyType="next"
              secureTextEntry={true}
              autoCapitalize={'none'}
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
            <TextInput
              ref={confirmRef}
              style={{...styles.Input, marginTop: 20, zIndex: 2}}
              placeholder="Confirm Password"
              autoFocus={true}
              keyboardAppearance="dark"
              returnKeyType="done"
              autoCapitalize={'none'}
              value={confirm}
              secureTextEntry={true}
              onChangeText={(e) => setConfirm(e)}
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
                disabled={loading}
                onPress={handleSubmit}
                title={loading ? 'Sending...' : 'Change Password'}
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
