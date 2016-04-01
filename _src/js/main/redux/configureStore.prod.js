import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createApiMiddleware from './middleware/create-api-middleware.js';
import { browserHistory } from 'react-router';
import { enableBatching } from 'redux-batched-actions';
import reducer from './rootReducer.js';

export default function configureStore(initialState, api) {
    const middleware = [
        thunk,
        createApiMiddleware(api),
        //createLogger()
    ];

    if (typeof window !== 'undefined') {
        middleware.push(syncHistory(browserHistory));
    }

    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

    return createStoreWithMiddleware(enableBatching(reducer), initialState);
}


