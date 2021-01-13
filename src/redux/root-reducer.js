import { combineReducers } from 'redux';

import orderReducer from './order/order.reducer';
import productDataReducer from './product-data/product-data.reducer';
import userReducer from './user/user.reducer';

const appReducer = combineReducers({
  order: orderReducer,
  productData: productDataReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'USER_LOGGED_OUT') {
    state = undefined;
    console.log('clearing store');
  }

  return appReducer(state, action);
};

export default rootReducer;
