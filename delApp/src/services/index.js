import AsyncStorage from '@react-native-community/async-storage';
export const BASE_URL = 'http://172.20.10.3:5000';

class Storage {
  async storeToken(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(e);
    }
  }

  async getToken(key) {
    try {
      let token = await AsyncStorage.getItem(key);
      return JSON.parse(token);
    } catch (e) {
      console.warn(e);
    }
  }
}

export default new Storage();
