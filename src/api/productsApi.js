import axios from 'axios';
import { get } from 'lodash';

export const productsInstance = axios.create({
  baseURL: 'https://stage-products.23blocks.com',
});

productsInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(formatErrorResponse(error.response));
  }
);

productsInstance.interceptors.request.use((request) => {
  const authData = getAuthData();
  if (authData.companyToken) {
    request.headers.common['company-token'] = authData.companyToken;
    request.headers.common['appid'] = process.env.REACT_APP_API_KEY;
    // console.log('set product headers');
  } else {
    request.headers.common['appid'] = process.env.REACT_APP_API_KEY;
    // console.log('set product api key');
  }
  return request;
});
// Error handling for axios response
function formatErrorResponse(error) {
  let details = get(error, 'data.errors[0].detail', 'Try again');

  if (Array.isArray(details)) {
    details = details[0];
  }

  return { error, errorDetail: details };
}

// Add 'APPID' header to axios requests
export function setApiKey() {
  // console.log('Setting products api key', process.env.REACT_APP_API_KEY);
  productsInstance.defaults.headers.common['APPID'] = process.env.REACT_APP_API_KEY;
}

// Add 'company-Token' header to axios requests
export function setCompanyToken(companyToken) {
  productsInstance.defaults.headers.common['company-token'] = companyToken;
  // console.log(
  //   'Setting products company token',
  //   productsInstance.defaults.headers.common['company-token']
  // );
}

// Send form data to API POST request
export function sendFormData(url, data) {
  return productsInstance({
    method: 'post',
    url,
    data: objectToFormData(data),
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

// Standard GET request from API
export function getFrom(url) {
  return productsInstance({
    method: 'get',
    url,
  });
}

// Send form data to API POST request
export function sendPutRequest(url, data) {
  return productsInstance({
    method: 'put',
    url,
    data: objectToFormData(data),
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function updateCartItemQty(userId, item, qty) {
  return productsInstance({
    method: 'put',
    url: '/carts/',
    data: objectToFormData({
      'cart[user_unique_id]': userId,
      'cart[notes]': '',
      'product[sku]': item.sku || item.productSku,
      'product[notes]': '',
      'product[quantity]': qty,
    }),
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

// GET Cart content
export function getCart(userId) {
  return productsInstance({
    method: 'get',
    url: '/carts/' + userId,
  });
}

// Convert object to form data format to send in POST requests
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
