import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {get} from '../../../../services/transport';
import {showMessage} from 'react-native-flash-message';
import Storage from '../../../../services';
import Geolocation from '@react-native-community/geolocation';

const RequestsComponent = ({navigation}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  const [vendor, setVendor] = useState({
    name: 'God Is Coming Ventures',
    accept: false,
  });
  const [loadingAccpet, setLoadingAccept] = useState(false);

  /**
   * to optimize performance I will cache the location and then use cache as our location
   * in 10 mins interval
   */

  useEffect(() => {
    (async () => {
      let loc = await Storage.getToken('@user_location');
      if (loc === null || Date.now() > JSON.parse(loc).date) {
        await Geolocation.getCurrentPosition(async (l) => {
          await Storage.storeToken(
            '@user_location',
            JSON.stringify({
              coords: {
                latitude: l.coords.latitude,
                longitude: l.coords.longitude,
              },
              date: Date.now() + 60 * 5, // five minutes
            }),
          );
          setLocation({
            latitude: l.coords.latitude,
            longitude: l.coords.longitude,
          });
        });
      } else {
        setLocation({
          ...JSON.parse(loc).coords,
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (location) {
      (async () => {
        setLoading(true);
        try {
          let results = await get(
            `/trips/open?longitude=${location?.longitude}&latitude=${location?.latitude}`,
          );
          results = results.data;
          if (results.success === false)
            showMessage({
              message: 'Failed to fetch',
              description: results.message,
              type: 'danger',
            });
          setData(results.payload.trips);
        } catch (e) {
          console.log(e);
          showMessage({
            message: 'Error',
            description: e.response.data.error,
            type: 'danger',
          });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [location]);

  useEffect(() => {
    if (loadingAccpet) {
      setTimeout(() => {
        setLoadingAccept(false);
        setVendor({...vendor, accept: true});
      }, 2000);
    }
  }, [loadingAccpet, setLoadingAccept, setVendor, vendor]);

  return (
    <Fragment>
      {loading ? (
        <View style={styles.emptyContainer}>
          <Text>Loading trips...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <SingleElement
            nextPage={() =>
              navigation.push('singleRequest', {
                request: vendor,
              })
            }
            accept={() => setLoadingAccept(true)}
            loading={loadingAccpet}
            data={vendor}
          />
        </View>
      )}

      {/* {loading ? (
        <View style={styles.emptyContainer}>
          <Text>Loading trips...</Text>
        </View>
      ) : data && data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No trips available</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <SingleElement navigation={navigation} />
          <SingleElement navigation={navigation} />
        </View>
      )} */}
    </Fragment>
  );
};

const SingleElement = ({data, nextPage, accept, loading}) => {
  return (
    <Fragment>
      <TouchableHighlight
        onPress={nextPage}
        underlayColor={'#eee'}
        style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: '#759aff',
                padding: 20,
                borderRadius: 50,
                width: 60,
              }}>
              <FontAwesome5 name={'store'} color={'#fff'} size={19} />
            </View>
          </View>
          <View
            style={{
              flex: 4,
              width: '100%',
              borderRadius: 10,
              padding: 10,
              backgroundColor: '#eee',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View>
              <Text>{data?.name}</Text>
            </View>
            {data?.accept === false && (
              <View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={accept}
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
                    {loading ? 'loading...' : 'Accept'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableHighlight>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cardContainer: {
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RequestsComponent;
