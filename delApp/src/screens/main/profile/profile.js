import React, {Fragment, useState, useRef} from 'react';
import colors from '../../../constants/colors';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import {showMessage} from 'react-native-flash-message';
import {patch} from '../../../services/transport';

export default function Profile({navigation, route}) {
  const [last, setLast] = useState('');
  const [others, setOthers] = useState('');
  const othersRef = useRef(null);
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
    if (!validate(last.trim(), 'Last Name is required')) return;
    if (!validate(others.trim(), 'Other Names is required')) return;

    try {
      setLoading(true);
      let results = await patch('/rider/updateProfile', {
        id: route.params.id,
        last,
        others,
      });
      setLoading(false);
      setLast('');
      setOthers('');
      return navigation.push('UploadLicense', {
        id: results.data.payload.id,
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
        <View style={styles.headerView}></View>
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
                placeholder={'Last Name'}
                returnKeyType={'next'}
                onSubmitEditing={() => othersRef.current.focus()}
                value={last}
                onChangeText={(e) => setLast(e)}
              />
              <TextInput
                ref={othersRef}
                style={{
                  ...styles.Input,
                  marginTop: 20,
                  zIndex: 2,
                }}
                keyboardAppearance="dark"
                placeholder={'Other Names'}
                returnKeyType={'done'}
                value={others}
                onChangeText={(e) => setOthers(e)}
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
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
                {loading ? 'Loading...' : 'Next'}
              </Text>

              <FontAwesome5
                style={{position: 'absolute', right: 10}}
                name={'chevron-right'}
                size={RFValue(16)}
                color={'#fff'}
              />
            </TouchableOpacity>
          </View>
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
