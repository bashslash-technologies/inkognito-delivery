import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
const {width} = Dimensions.get('window');
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import Geolocation from '@react-native-community/geolocation';

const TrackingComponent = ({navigation}) => {
  const [location, setLocation] = useState({
    latitude: 7.9465,
    longitude: 1.0232,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  let mapView = useRef();
  const moveToLoc = () => {
    mapView.current.animateToRegion(location, 500);
  };

  useEffect(() => {
    const watchID = Geolocation.watchPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        const newCoordinate = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        if (mapView) {
          mapView.current.animateToRegion(newCoordinate, 500);
        }
        setLocation(newCoordinate);
      },
      (error) => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    return () => Geolocation.clearWatch(watchID);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        loadingEnabled
        initialRegion={location}
        ref={mapView}
        zoomEnabled={true}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={location} />
      </MapView>
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: RFValue(10),
            marginTop: RFValue(10),
          }}>
          <View>
            <TouchableOpacity
              underlayColor={'#000'}
              style={styles.locateMeButton}
              onPress={() => navigation.pop()}>
              <FontAwesome5
                name="arrow-left"
                size={20}
                style={{color: '#000'}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            underlayColor={'#000'}
            style={styles.locateMeButton}
            onPress={moveToLoc}>
            <FontAwesome5
              name="map-marker-alt"
              size={20}
              style={{color: '#000'}}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  styledViewOnMap: {
    width,
  },
  locateMeButton: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default TrackingComponent;
