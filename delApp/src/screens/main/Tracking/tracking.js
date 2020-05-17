import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
const Tracking = ({navigation}) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState('');
  // useEffect(() => {
  //   (() => {
  //     try {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           console.log(position.coords.latitude);
  //           setLocation({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           });
  //         },
  //         (error) => {
  //           setError(error.message);
  //         },
  //         {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000},
  //       );
  //     } catch (e) {
  //       console.warn(e);
  //     }
  //   })();
  // });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={location} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Tracking;
