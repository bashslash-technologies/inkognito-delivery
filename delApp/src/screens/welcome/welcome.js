/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import bacImage from '../../assets/Images/pac.jpg';
import Storage from '../../services';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../constants/colors';

const Welcome = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [route, setRoute] = useState('');
  const handleAuth = async (props) => {
    try {
      await Storage.storeToken('@onboard', true);
      navigation.navigate(route);
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <ImageBackground
      source={bacImage}
      style={{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
      }}>
      <View
        style={{
          backgroundColor: '#0003',
          flex: 1,
        }}>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 20,
              alignItems: 'center',
              height: height / 4,
            }}>
            <View
              style={{
                width: '22%',
                height: RFValue(65),
                backgroundColor: '#FFF',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2,
              }}>
              <FontAwesome5
                name="truck"
                color={colors['color-primary-800']}
                size={40}
              />
            </View>
            <View style={{width: '70%', marginVertical: 10}}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontFamily: 'Quicksand-Light',
                  fontSize: RFValue(12),
                }}>
                Deliver packages from over 2,000 vendors to clients.
              </Text>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View
              style={{
                height: height / 3,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('loginRoot')}
                style={{
                  ...styles.button,
                  flexDirection: 'row',
                  backgroundColor: colors['color-primary-800'],
                }}>
                <FontAwesome5
                  name="sign-in-alt"
                  style={{fontSize: RFValue(15), padding: 5, color: 'white'}}
                />
                <Text
                  style={{
                    fontSize: RFValue(14),
                    color: '#fff',
                    fontWeight: 'bold',
                    fontFamily: 'Quicksand-Bold',
                  }}>
                  Continue with Login
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('registerRoot')}
                style={{
                  ...styles.button,
                  backgroundColor: '#0001',
                  borderWidth: 1,
                  borderColor: '#fff',
                }}>
                <Text
                  style={{
                    fontSize: RFValue(14),
                    color: '#fff',
                    fontWeight: 'bold',
                    fontFamily: 'Quicksand-Bold',
                  }}>
                  Sign Up with contact
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    opacity: 0.7,
                    fontSize: RFValue(12),
                    fontFamily: 'Quicksand-Light',
                  }}>
                  By signing up you agree to our terms of use and privacy policy
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    height: 50,
    width: '80%',
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Welcome;
