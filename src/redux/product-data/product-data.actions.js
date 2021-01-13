import { ProductTypes } from './product-data.types';

export const setCurrentCategory = category => ({
  type: ProductTypes.SET_CURRENT_CATEGORY,
  payload: category
});

export const setCurrentProduct = product => ({
  type: ProductTypes.SET_CURRENT_PRODUCT,
  payload: product
});