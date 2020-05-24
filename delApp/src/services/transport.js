import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {BASE_URL} from './index';

axios.defaults.baseURL = `${BASE_URL}/api/v1`; //

const config = {
  headers: {},
};

function notifyError(msg) {
  showMessage({
    message: 'Error',
    description: msg,
    type: 'danger',
  });
}

const errorhandler = (error) => {
  if (error.message === 'Network Error') {
    notifyError('Network connection lost. Connect and try again');
    return;
  }
  return Promise.reject({...error});
};

const successHandler = (response) => {
  return response;
};

const setToken = (config = {}) => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Accept'] = 'application/json';
  return config;
};

axios.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorhandler(error),
);

axios.interceptors.request.use(
  (config) => setToken(config),
  (error) => Promise.reject(error),
);

export const post = (route, payload, config = null) =>
  new Promise(function (resolve, reject) {
    axios
      .post(route, payload, config)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export const patch = (route, payload) =>
  new Promise(function (resolve, reject) {
    axios
      .patch(route, payload)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export const get = (route) =>
  new Promise((resolve, reject) => {
    axios
      .get(route, config)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export const delete_request = (route) =>
  new Promise((resolve, reject) => {
    axios
      .delete(route)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export const all = (routes) =>
  new Promise((resolve, reject) => {
    axios
      .all(routes)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
