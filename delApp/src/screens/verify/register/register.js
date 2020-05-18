import React, {Fragment, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../../constants/colors';
import {showMessage} from 'react-native-flash-message';
import {post} from '../../../services/transport';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

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
    //validate input
    if (!validate(email.trim(), 'Email Address is invalid', 'email')) return;
    if (!validate(contact.trim(), 'Phone Number is invalid', 'contact')) return;
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
      let results = await post('/rider', {
        email: email.trim(),
        contact: contact.trim(),
        password: password.trim(),
      });
      setLoading(false);
      setEmail('');
      setContact('');
      setPassword('');
      setConfirm('');
      return navigation.push('verifyRegister', {
        id: results.data.payload.id,
        contact: `+${results.data.payload.profile.contact}`,
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
              onSubmitEditing={() => phoneRef.current.focus()}
              style={{...styles.Input, marginTop: 40}}
              placeholder="Email"
              autoFocus={true}
              keyboardAppearance="dark"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize={'none'}
              returnKeyType="next"
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
            <TextInput
              ref={phoneRef}
              onSubmitEditing={() => passwordRef.current.focus()}
              returnKeyType="next"
              style={{...styles.Input, marginVertical: 15}}
              placeholder="phone"
              keyboardAppearance="dark"
              keyboardType="numbers-and-punctuation"
              value={contact}
              onChangeText={(e) => setContact(e)}
            />
            <TextInput
              ref={passwordRef}
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              returnKeyType="next"
              style={{...styles.Input, marginBottom: 15}}
              placeholder="Password"
              keyboardAppearance="dark"
              secureTextEntry={true}
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
            <TextInput
              ref={confirmPasswordRef}
              returnKeyType="done"
              style={{...styles.Input}}
              placeholder="Confirm password"
              keyboardAppearance="dark"
              secureTextEntry={true}
              value={confirm}
              onChangeText={(e) => setConfirm(e)}
            />

            <TouchableOpacity
              disabled={loading}
              onPress={handleSubmit}
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
                {loading ? 'Loading...' : 'Next'}
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
