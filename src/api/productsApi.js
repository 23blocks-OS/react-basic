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
  console.log('Setting products api key', process.env.REACT_APP_RESTTOGO_API_KEY);
  productsInstance.defaults.headers.common['APPID'] = process.env.REACT_APP_API_KEY;
}

// Add 'company-Token' header to axios requests
export function setCompanyToken() {
  console.log('Setting company token', process.env.REACT_APP_COMPANY_TOKEN);
  productsInstance.defaults.headers.common['company-token'] =
    process.env.REACT_APP_COMPANY_TOKEN;
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

// Convert object to form data format to send in POST requests
function objectToFormData(object) {
  var data = new FormData();

  for (let [key, value] of Object.entries(object)) {
    data.set(key, value);
  }

  return data;
}
