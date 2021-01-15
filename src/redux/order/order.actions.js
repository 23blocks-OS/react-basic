import { getCart, sendFormData, updateCartItemQty } from '../../api/productsApi';
import { OrderTypes } from './order.types';
import build from 'redux-object';
import normalize from 'json-api-normalizer';

export const addProductToOrder = (addedProduct) => ({
  type: OrderTypes.ADD_PRODUCT_TO_ORDER,
  payload: addedProduct,
});

export const removeProductFormOrder = (removedProduct) => ({
  type: OrderTypes.REMOVE_PRODUCT_FROM_ORDER,
  payload: removedProduct,
});

export const totalTip = (tip) => ({
  type: OrderTypes.ADD_TIP,
  payload: tip,
});

export const totalTax = (tax) => ({
  type: OrderTypes.ADD_TAX,
  payload: tax,
});

export const setOrderStatus = (status) => ({
  type: OrderTypes.SET_ORDER_STATUS,
  payload: status,
});

export const cartLoaded = (cartItems) => ({
  type: OrderTypes.CART_LOADED,
  payload: cartItems,
});

export const cartCreated = () => ({
  type: OrderTypes.CART_CREATED,
});

export const updateCartAsync = (userId, item, qty, category) => {
  return async (dispatch, getState) => {
    const apiResponse = await updateCartItemQty(userId, item, qty, category);
    const data = normalize(apiResponse.data);
    const _products = build(data, 'cartDetail', null, {
      eager: true,
    });
    dispatch(cartLoaded(_products ? _products : []));
  };
};

export const fetchCart = (userId) => {
  return async (dispatch, getState) => {
    try {
      const apiResponse = await getCart(userId);
      const data = normalize(apiResponse.data);
      const _products = build(data, 'cartDetail', null, {
        eager: true,
      });
      dispatch(cartLoaded(_products ? _products : []));
    } catch (err) {
      console.log(err, 'error fetching cart');
    }
  };
};

export const createCart = (userId) => {
  return async (dispatch, getState) => {
    try {
      const apiResponse = await sendFormData('/carts/', {
        'cart[user_unique_id]': userId,
        'cart[notes]': 'test',
        'cart[delivery]': 0,
      });
      dispatch(cartCreated());
    } catch (err) {
      console.log(err, 'err creating cart');
    }
  };
};

export const deleteCartContent = (userId) => {
  return async (dispatch, getState) => {
    try {
      getState().order.orderItems.forEach((item) => {
        dispatch(
          updateCartAsync(userId, item, -item.quantity, { name: '', uniqueId: '' })
        );
      });
    } catch (err) {
      console.log(err, 'err creating cart');
    }
  };
};
