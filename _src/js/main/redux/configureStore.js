import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'react-router-redux';
import { combineReducers } from 'redux';
import history from '../util/get-browser-history.js';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const reduxRouterMiddleware = syncHistory(history);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunk/*, createLogger()*/)(createStore);

export default createStoreWithMiddleware;