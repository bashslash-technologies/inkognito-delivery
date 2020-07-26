import React, {Fragment, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {get} from '../../../../services/transport';
import {showMessage} from 'react-native-flash-message';

const OngoingRequestsComponent = ({navigation}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let results = await get(`/trips/courier`);
        results = results.data;
        if (results.success === false)
          showMessage({
            message: 'Failed to fetch',
            description: results.message,
            type: 'danger',
          });
        setData(results?.payload?.trips);
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
  }, [page, size]);

  return (
    <Fragment>
      {loading ? (
        <View style={styles.emptyContainer}>
          <Text>Loading trips...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <SingleElement goTo={() => navigation.push('track')} />
        </View>
      )}

      {/* {loading ? (
        <View style={styles.emptyContainer}>
          <Text>Loading trips...</Text>
        </View>
      ) : data && data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No ongoing trips</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <SingleElement />
          <SingleElement />
        </View>
      )} */}
    </Fragment>
  );
};

const SingleElement = ({goTo}) => {
  return (
    <Fragment>
      <View underlayColor={'#eee'} style={styles.cardContainer}>
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
              <Text>Vendor: Hello</Text>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={goTo}
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
                  View
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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

export default OngoingRequestsComponent;
