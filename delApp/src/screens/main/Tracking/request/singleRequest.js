import React, {Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../../../../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';

const SingleRequest = ({navigation, route}) => {
  return (
    <Fragment>
      <View style={styles.container}>
        <ScrollView style={{padding: 20}}>
          <View
            style={{
              flex: 4,
              width: '100%',
              borderRadius: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View></View>
            <View style={{flexDirection: 'row'}}>
              <View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.push('viewMap')}
                  style={{
                    backgroundColor: colors['color-primary-900'],
                    borderRadius: 5,
                    color: '#fff',
                    zIndex: 2,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: RFValue(12),
                      fontWeight: '800',
                      fontFamily: 'Quicksand-Light',
                    }}>
                    View Vendor On Map
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{marginTop: 30}}>
            <Text style={{fontWeight: 'bold'}}>Notes : </Text>
            <Text style={{marginTop: 10}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
          </View>

          {route?.params?.request?.accept && (
            <View style={{marginTop: 30}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => alert('acccept')}
                style={{
                  backgroundColor: colors['color-primary-900'],
                  borderRadius: 5,
                  color: '#fff',
                  zIndex: 2,
                  marginRight: 10,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: RFValue(12),
                    fontWeight: '800',
                    fontFamily: 'Quicksand-Light',
                  }}>
                  Start Delivery
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SingleRequest;
