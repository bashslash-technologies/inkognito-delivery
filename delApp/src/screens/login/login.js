import React, {Fragment, useState, useRef, useContext} from 'react';
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
import {showMessage} from 'react-native-flash-message';
import {AuthContext} from '../../navigation/rootNavigator';
import {post} from '../../services/transport';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef(null);
  const [{signIn}] = useContext(AuthContext);

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
    //validate
    if (!validate(email.trim(), 'Email Address is invalid', 'email')) return;
    if (
      !validate(
        password.trim(),
        'Password should be more than 6 characters',
        'password',
      )
    )
      return;

    try {
      setLoading(true);
      let results = await post('/rider/login', {
        email: email.trim(),
        password: password.trim(),
      });
      setLoading(false);

      //check for verification
      if (!results.data.payload.isVerified)
        return navigation.navigate('VerifyRegister', {
          id: results.data.data.id,
          contact: `+${results.data.data.profile.contact}`,
        });
      await signIn(results.data.payload);
      setEmail('');
      setPassword('');
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
                LOGIN
              </Text>
            </View>
            <TextInput
              style={{...styles.Input, marginTop: 30}}
              placeholder="Email"
              onSubmitEditing={() => passwordRef.current.focus()}
              autoFocus={true}
              keyboardAppearance="dark"
              textContentType="emailAddress"
              returnKeyType="next"
              keyboardType="email-address"
              value={email}
              autoCapitalize={'none'}
              onChangeText={(e) => setEmail(e)}
            />
            <TextInput
              ref={passwordRef}
              style={{...styles.Input, marginVertical: 15}}
              placeholder="password"
              returnKeyType="done"
              keyboardAppearance="dark"
              secureTextEntry={true}
              value={password}
              onChangeText={(e) => setPassword(e)}
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
                disabled={loading}
                onPress={handleSubmit}
                title={loading ? 'Logging in...' : '"Login"'}
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
