import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
