import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import colors from '../../../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Slider from './upload';
import {showMessage} from 'react-native-flash-message';
import {post} from '../../../services/transport';

const UploadLicense = ({navigation, route}) => {
  const [file, setFile] = useState(null);
  const [license, setLicense] = useState('');
  const [certNumber, setCertNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const HandleSubmission = async () => {
    if (file === null)
      return showMessage({
        message: 'Error',
        description: 'Please choose an image',
        type: 'danger',
      });
    if (license.trim() === '')
      return showMessage({
        message: 'Error',
        description: 'Please enter your license number',
        type: 'danger',
      });
    if (certNumber.trim() === '')
      return showMessage({
        message: 'Error',
        description: 'Please enter your certificate number',
        type: 'danger',
      });
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append('certificate', file);
      formData.append('vehicle_number', license);
      formData.append('certificate_number', certNumber);
      let results = await post('/couriers', formData, {
        headers: {
          authorization: `Bearer ${route.params.user_data.token}`,
        },
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

      setLoading(false);
      return navigation.push('SuccessPage', {
        user_data: results.payload,
      });
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
                Upload your license
              </Text>
            </View>
            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Slider
                image={require('../../../assets/Images/pro.jpeg')}
                doc
                setFile={setFile}
              />
            </View>
          </View>

          <View style={{width: '80%'}}>
            <TextInput
              style={{
                ...styles.Input,
                marginTop: 20,
                zIndex: 2,
              }}
              keyboardAppearance="dark"
              placeholder={'License Number'}
              returnKeyType={'done'}
              value={license}
              onChangeText={(e) => setLicense(e)}
            />
            <TextInput
              style={{
                ...styles.Input,
                marginTop: 20,
                zIndex: 2,
              }}
              keyboardAppearance="dark"
              placeholder={'Certificate Number'}
              returnKeyType={'done'}
              value={certNumber}
              onChangeText={(e) => setCertNumber(e)}
            />
          </View>

          <View style={{width: '80%'}}>
            <TouchableOpacity
              disabled={loading}
              onPress={HandleSubmission}
              style={{
                backgroundColor: colors['color-primary-900'],
                borderRadius: 5,
                color: '#fff',
                height: 40,
                zIndex: 2,
                flexDirection: 'row',
                marginVertical: 10,
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
                {loading ? 'Loading...' : 'Save'}
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

export default UploadLicense;
