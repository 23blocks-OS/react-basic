import { ProductTypes } from './product-data.types';

const INITIAL_STATE = {
  currentCategory: null,
  currentProduct: null
}

const productDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductTypes.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload
      }
    case ProductTypes.SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload
      }
    default:
      return state;
  }
}

export default productDataReducer;