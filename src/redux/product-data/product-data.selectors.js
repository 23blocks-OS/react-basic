/* MEMOIZATION */
import { createSelector } from 'reselect';

const product = state => state.productData;
// To get the current product category only
export const selectCurrentCategory = createSelector(
  [product], productData => productData.currentCategory
);

export const selectCurrentProduct = createSelector(
  [product], productData => productData.currentProduct
);