/* MEMOIZATION */
import { createSelector } from 'reselect';

const selectOrder = state => state.order;
// Just to get the items:
export const selectOrderitems = createSelector(
  [selectOrder], order => order.orderItems
);
// To get the accumulate count of items
export const selectOrderItemsCount = createSelector(
  [selectOrderitems], 
  orderItems => orderItems.reduce((accumItems, item) => accumItems + item.quantity, 0)
);
// To get totals
export const selectOrderTotals = createSelector(
  [selectOrderitems],
  orderItems => orderItems.reduce((accumItems, item) => accumItems + item.quantity * item.price, 0)
)

