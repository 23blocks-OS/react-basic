import {
  getAuthData,
  getFrom,
  sendFormData,
  setAuthData,
  signOut,
  validateToken,
} from '../../api/api';
import { createCart, fetchCart } from '../order/order.actions';
import { UserTypes } from './user.types';
import build from 'redux-object';
import normalize from 'json-api-normalizer';
import { setCompanyToken as setProductsCompanyToken } from '../../api/productsApi';
import { parseFormData } from './user.utils';

export const userRequested = () => ({
  type: UserTypes.USER_REQUESTED,
});

export const userLoaded = (user) => ({
  type: UserTypes.USER_LOADED,
  payload: user,
});

export const profileLoaded = (profile) => ({
  type: UserTypes.PROFILE_LOADED,
  payload: profile,
});

export const validateTokenAsync = () => {
  return async (dispatch, getState) => {
    const authData = getAuthData();
    if (!authData.companyToken) {
      return dispatch(userLoaded(null));
    }
    try {
      const authApiResponse = await validateToken();
      const data = normalize(authApiResponse.data);
      const _user = build(data, 'user', authApiResponse.data.data.id, {
        eager: true,
      });
      dispatch(userLoaded(_user));
      dispatch(fetchCart(_user.uniqueId));
    } catch (err) {
      console.log(err, 'error validating token');
    }
  };
};

export const registerUser = (values) => {
  return async (dispatch, getState) => {
    try {
      const formData = parseFormData(values);
      const apiResponse = await sendFormData('/auth/', formData);
      const data = normalize(apiResponse.data);
      const _user = build(data, 'user', apiResponse.data.data.id, {
        eager: true,
      });
      if (_user) {
        setProductsCompanyToken(apiResponse.headers['company-token']);
        dispatch(createCart(_user.uniqueId));
        dispatch(userLogin(values));
      }
    } catch (error) {
      const errorObject = error?.error?.data?.errors?.[0];
      if (errorObject?.status === '422' && errorObject?.code === 105) {
        console.log('user already registered');
        // dispatch(userLogin(values));
      }
      console.log(error, 'error registering user');
    }
  };
};

export const userLogin = (values) => {
  return async (dispatch, getState) => {
    try {
      const apiResponse = await sendFormData('/auth/sign_in/', {
        email: values.email,
        password: values.password,
      });
      const data = normalize(apiResponse.data);
      const _user = build(data, 'user', apiResponse.data.data.id, {
        eager: true,
      });
      if (_user) {
        localStorage.setItem('user', _user.uniqueId);
        setAuthData(apiResponse);
        dispatch(userLoaded(_user));
        dispatch(fetchCart(_user.uniqueId));
      }
    } catch (error) {
      console.log(error, 'error loging in');
    }
  };
};

export const getProfile = (uniqueId) => {
  return async (dispatch, getState) => {
    try {
      const apiResponse = await getFrom(`/users/${uniqueId}/profile`);
      // Standard Response from service
      console.log(apiResponse);
      const normalizedDataObject = normalize(apiResponse.data);
      const _profile = build(
        normalizedDataObject,
        'userProfile',
        apiResponse.data.data.id,
        { eager: true }
      );
      dispatch(profileLoaded(_profile));
    } catch (error) {
      console.log(error);
    }
  };
};

export const userLogout = (history) => {
  return async (dispatch, getState) => {
    try {
      const apiResponse = await signOut();
      localStorage.clear();
      dispatch({ type: 'USER_LOGGED_OUT' });
      history.push('/login');
    } catch (error) {
      console.log(error, 'error logging out');
    }
  };
};
