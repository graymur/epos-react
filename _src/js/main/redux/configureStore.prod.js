import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import api from './middleware/api.js';
import { browserHistory } from 'react-router';
import { enableBatching } from 'redux-batched-actions';
import reducer from './rootReducer.js';

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunk, api/*, createLogger()*/)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(enableBatching(reducer), initialState);
}


