import { OrderTypes } from './order.types';
import { addingProducts, removingProducts } from './order.utils';

const INITIAL_STATE = {
  orderItems: [],
  status: 'pending',
  tip: null,
  tax: 0,
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderTypes.ADD_TIP:
      return {
        ...state,
        tip: action.payload,
      };
    case OrderTypes.ADD_TAX:
      return {
        ...state,
        tax: action.payload,
      };
    case OrderTypes.ADD_PRODUCT_TO_ORDER:
      return {
        ...state,
        orderItems: addingProducts(state.orderItems, action.payload),
      };
    case OrderTypes.REMOVE_PRODUCT_FROM_ORDER:
      return {
        ...state,
        orderItems: removingProducts(state.orderItems, action.payload),
      };
    case OrderTypes.SET_ORDER_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case OrderTypes.CART_LOADED:
      return {
        ...state,
        orderItems: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
