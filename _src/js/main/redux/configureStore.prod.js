import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import { combineReducers } from 'redux';
import history from '../util/get-browser-history.js';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './rootReducer.js';

const reduxRouterMiddleware = syncHistory(history);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunk/*, createLogger()*/)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(reducer, initialState);
}


