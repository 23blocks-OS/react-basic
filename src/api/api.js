import axios from 'axios';
import {get} from 'lodash';

export const instance = axios.create({
    baseURL: 'https://stage-gateway.23blocks.com'
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(formatErrorResponse(error.response));
});

function formatErrorResponse(error) {

    let details = get(error, 'data.errors[0].detail', 'Try again');

    if (Array. isArray(details)) {
        details = details[0];
    }

    return {error, errorDetail: details};
}

export function setApiKey() {
    console.log("Setting api key", process.env.REACT_APP_API_KEY);
    instance.defaults.headers.common['APPID'] = process.env.REACT_APP_API_KEY;
}

export function sendFormData(url, data) {
    return instance({
        method: 'post',
        url,
        data: objectToFormData(data),
        headers: {'Content-Type': 'multipart/form-data'}
    })
}

export function getFrom(url) {
    return instance({
        method: 'get',
        url
    })
}

function objectToFormData(object) {
    var data =  new FormData();

    for (let [key, value] of Object.entries(object)) {
        data.set(key, value);
    }

    return data;
}