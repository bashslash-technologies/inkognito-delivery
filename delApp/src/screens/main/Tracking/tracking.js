import React, {useState, useEffect, useRef, Fragment} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
const {width, height} = Dimensions.get('window');
const GOOGLE_MAPS_APIKEY = 'AIzaSyAOSV1eGuYeUr5hZPPUFd4F9Vidgdsekec';
const destination = {latitude: 37.771707, longitude: -122.4053769};

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
  const [loading, setLoading] = useState(true);
  const [directionData, setDirData] = useState(null);

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
        <MapViewDirections
          mode={'BICYCLING'}
          optimizeWaypoints={true}
          strokeWidth={3}
          strokeColor="hotpink"
          origin={location}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          onReady={({distance, duration}) => {
            setLoading(false);
            setDirData({distance, duration});
          }}
        />
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
      <View style={styles.bottom}>
        <SafeAreaView>
          <DetailsCard
            directionsReady={loading}
            directionData={directionData}
          />
        </SafeAreaView>
      </View>
      <Modal visible={loading} transparent={true}>
        <Fragment>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <ActivityIndicator color={'#fff'} />
          </View>
        </Fragment>
      </Modal>
    </View>
  );
};

const DetailsCard = ({directionsReady, directionData}) => {
  return (
    <Fragment>
      {!directionsReady ? (
        <Fragment>
          <View style={styles.detailsRoot}>
            <View style={styles.left}>
              <View style={styles.leftContent}>
                <FontAwesome5 name={'truck'} color={'red'} size={RFValue(20)} />
              </View>
            </View>
            <View style={styles.right}>
              <Text type={'bold'} style={{fontSize: RFValue(15)}}>
                Distance: {directionData?.distance} km away
              </Text>
              <Text type={'light'} style={{fontSize: RFValue(11)}}>
                Duration: About {parseFloat(directionData?.duration).toFixed(2)}{' '}
                mins
              </Text>
            </View>
          </View>
        </Fragment>
      ) : (
        <Fragment>
          <View style={styles.detailsRoot}>
            <View style={styles.right}>
              <Text type={'light'} style={{fontSize: RFValue(11)}}>
                Loading...
              </Text>
            </View>
          </View>
        </Fragment>
      )}
    </Fragment>
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
  bottom: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    height: height / 5,
    borderTopRightRadius: RFValue(20),
    borderTopLeftRadius: RFValue(20),
    padding: RFValue(20),
    justifyContent: 'center',
  },
  detailsRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: RFValue(20),
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(30),
  },
  left: {flex: 1, alignItems: 'center'},
  leftContent: {
    backgroundColor: '#f2d8db',
    padding: RFValue(10),
    borderRadius: RFValue(10),
  },
  right: {flex: 3},
  bottomHalf: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(15),
  },
  bottomLeft: {
    flex: 1,
    alignItems: 'center',
  },
  bottomRight: {
    flex: 3,
  },
  bottomLeftContent: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: RFValue(25),
    paddingVertical: RFValue(22),
    borderRadius: RFValue(15),
  },
  bottomRightContent: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(10),
    borderRadius: RFValue(15),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});

export default TrackingComponent;
