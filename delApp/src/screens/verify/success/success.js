import React, {useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StatusBar,
  Text,
  Button,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../../constants/colors';
import {AuthContext} from '../../../navigation/rootNavigator';

const SuccessPage = ({route, navigation}) => {
  let progress = new Animated.Value(0);
  let textProgress = new Animated.Value(0);
  let buttonProgress = new Animated.Value(0);
  const [{signIn}] = useContext(AuthContext);

  useEffect(() => {
    Animated.sequence([
      Animated.spring(progress, {
        toValue: 1,
        friction: 10,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.spring(textProgress, {
        toValue: 1,
        friction: 10,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.timing(buttonProgress, {
        toValue: 1,
        friction: 10,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSubmit = async () => {
    await signIn(route.params.user_data);
  };
  return (
    <View style={styles.root}>
      <StatusBar animated barStyle="light-content" />
      <Animated.Text
        style={[
          styles.header,
          {
            transform: [
              {
                scale: progress,
              },
            ],
          },
        ]}>
        Hurray
      </Animated.Text>
      <Animated.Text
        style={[
          styles.subText,
          {
            transform: [
              {
                scale: textProgress,
              },
            ],
          },
        ]}>
        Thanks for taking your time to create an account with us. This is the
        fun part.
      </Animated.Text>
      <Animated.View
        style={{
          transform: [
            {
              scale: buttonProgress,
            },
          ],
        }}>
        <Button
          title={'Get Started'}
          style={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: 5,
          }}
          onPress={handleSubmit}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 13,
            }}>
            <Text
              style={{
                color: colors['color-primary-900'],
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Return Home
            </Text>
            <Ionicons
              type="arrow-forward"
              style={{
                color: colors['color-primary-900'],
                fontSize: 20,
                marginLeft: 10,
              }}
            />
          </View>
        </Button>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors['color-primary-900'],
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RFValue(20),
  },
  subText: {
    marginBottom: RFValue(10),
    fontSize: RFValue(15),
    color: '#fff',
    textAlign: 'center',
  },
  header: {
    marginBottom: RFValue(10),
    fontSize: RFValue(22),
    color: '#fff',
    textAlign: 'center',
  },
});

export default SuccessPage;
