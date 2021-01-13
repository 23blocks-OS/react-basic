import axios from 'axios';
import { get } from 'lodash';

export const instance = axios.create({
  baseURL: 'https://stage-gateway.23blocks.com',
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(formatErrorResponse(error.response));
  }
);

instance.interceptors.request.use((request) => {
  const authData = getAuthData();
  if (authData.companyToken) {
    request.headers.common['company-token'] = authData.companyToken;
    request.headers.common['access-token'] = authData.accessToken;
    request.headers.common['client'] = authData.client;
    request.headers.common['expiry'] = authData.expiry;
    request.headers.common['token-type'] = authData.tokenType;
    request.headers.common['uid'] = authData.uid;
    request.headers.common['appid'] = process.env.REACT_APP_API_KEY;
    // console.log('set headers');
  } else {
    request.headers.common['appid'] = process.env.REACT_APP_API_KEY;
    // console.log('set api key');
  }
  return request;
});

function formatErrorResponse(error) {
  let details = get(error, 'data.errors[0].detail', 'Try again');

  if (Array.isArray(details)) {
    details = details[0];
  }

  return { error, errorDetail: details };
}

export function setApiKey() {
  // console.log('Setting api key', process.env.REACT_APP_API_KEY);
  instance.defaults.headers.common['APPID'] = process.env.REACT_APP_API_KEY;
}

// Add 'company-Token' header to axios requests
export function setCompanyToken(companyToken) {
  instance.defaults.headers.common['company-token'] = companyToken;
  // console.log(
  //   'Setting gateway company token',
  //   instance.defaults.headers.common['company-token']
  // );
}

export function sendFormData(url, data) {
  return instance({
    method: 'post',
    url,
    data: objectToFormData(data),
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function getFrom(url) {
  return instance({
    method: 'get',
    url,
  });
}

export function validateToken() {
  return instance({
    method: 'get',
    url: '/auth/validate_token',
  });
}

export function signOut() {
  return instance({
    method: 'delete',
    url: '/auth/sign_out',
  });
}

function objectToFormData(object) {
  var data = new FormData();

  for (let [key, value] of Object.entries(object)) {
    data.set(key, value);
  }

  return data;
}

export const getAuthData = () => {
  return {
    companyToken: localStorage.getItem('company-token'),
    accessToken: localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    expiry: localStorage.getItem('expiry'),
    tokenType: localStorage.getItem('token-type'),
    uid: localStorage.getItem('uid'),
    appid: process.env.REACT_APP_API_KEY,
  };
};

export const setAuthData = (authApiResponse) => {
  const headers = authApiResponse.headers;
  const authData = {
    companyToken: headers['company-token'],
    accessToken: headers['access-token'],
    client: headers['client'],
    expiry: headers['expiry'],
    tokenType: headers['token-type'],
    uid: headers['uid'],
    appid: process.env.REACT_APP_API_KEY,
  };

  localStorage.setItem('company-token', authData.companyToken);
  localStorage.setItem('access-token', authData.accessToken);
  localStorage.setItem('client', authData.client);
  localStorage.setItem('expiry', authData.expiry);
  localStorage.setItem('token-type', authData.tokenType);
  localStorage.setItem('uid', authData.uid);
  localStorage.setItem('appid', process.env.REACT_APP_API_KEY);
};

export const setHeaders = (authData) => {
  instance.defaults.headers.common['company-token'] = authData.companyToken;
  instance.defaults.headers.common['access-token'] = authData.accessToken;
  instance.defaults.headers.common['client'] = authData.client;
  instance.defaults.headers.common['expiry'] = authData.expiry;
  instance.defaults.headers.common['token-type'] = authData.tokenType;
  instance.defaults.headers.common['uid'] = authData.uid;
  instance.defaults.headers.common['appid'] = process.env.REACT_APP_API_KEY;
};
