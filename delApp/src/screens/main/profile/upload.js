import React, {Fragment, useRef, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  StyleSheet,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker';
const {width, height} = Dimensions.get('window');
import colors from '../../../constants/colors';

const Slider = ({image, setFile, doc}) => {
  const [path, setPath] = useState(null);
  const ActionSheetRef = useRef();

  return (
    <React.Fragment>
      <View
        style={{
          flex: 1,
          width,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {doc ? (
          <Fragment>
            <View style={{marginHorizontal: 10}}>
              <Image
                source={!path ? image : {uri: path}}
                resizeMode="contain"
                style={{
                  height: height / 3,
                  width,
                  borderRadius: RFValue(10),
                }}
              />
              <TouchableOpacity
                onPress={() => ActionSheetRef.current.show()}
                activeOpacity={0.7}
                style={{
                  position: 'absolute',
                  bottom: -20,
                  right: 200 / 5,
                  backgroundColor: colors['color-warning-transparent-100'],
                  padding: RFValue(20),
                  borderRadius: RFValue(100),
                }}>
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
                    style={{zIndex: 2, fontSize: RFValue(50)}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </Fragment>
        ) : (
          <View>
            <Image
              source={!path ? image : {uri: path}}
              resizeMode="contain"
              style={{
                height: RFValue(200),
                width: RFValue(200),
                borderRadius: RFValue(100),
              }}
            />
            <TouchableOpacity
              onPress={() => ActionSheetRef.current.show()}
              activeOpacity={0.7}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 200 / 5,
                backgroundColor: colors['color-warning-transparent-100'],
                padding: RFValue(10),
                borderRadius: RFValue(100),
              }}>
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
                  style={{zIndex: 2, fontSize: RFValue(50)}}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ActionSheet
        ref={ActionSheetRef}
        title={'How do you like to add an image ?'}
        options={['Take A Phote', 'Choose from gallery', 'cancel']}
        cancelButtonIndex={2}
        onPress={(index) => {
          /* do something */
          if (index === 0) {
            const options = {
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
              cameraType: 'front',
              allowsEditing: true,
            };
            return ImagePicker.launchCamera(options, (response) => {
              if (response.error) {
                console.log('Camera Error: ', response.error);
              } else {
                setFile({
                  uri: 'data:image/jpeg;base64,' + response.data,
                  type: response.type,
                  name: 'image.jpeg',
                });
                setPath(response.uri);
              }
            });
          }
          if (index === 1) {
            const options = {
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
              allowsEditing: true,
            };
            return ImagePicker.launchImageLibrary(options, (response) => {
              if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else {
                console.log({
                  uri: response.uri,
                  type: response.type,
                  name: response.fileName,
                });
                setPath(response.uri);
                setFile({
                  uri: 'data:image/jpeg;base64,' + response.data,
                  type: response.type,
                  name: 'image.jpeg',
                });
              }
            });
          }
        }}
      />
    </React.Fragment>
  );
};


export default Slider;
