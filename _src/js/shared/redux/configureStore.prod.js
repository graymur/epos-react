import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { combineReducers } from 'redux';
//import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createApiMiddleware from './middleware/create-api-middleware.js';
import { browserHistory } from 'react-router';
import { enableBatching } from 'redux-batched-actions';
import reducer from './rootReducer.js';

export default function configureStore(initialState, api) {
    const middleware = [
        //createLogger(),
        routerMiddleware(browserHistory),
        //thunk,
        createApiMiddleware(api)
    ];

    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

    return createStoreWithMiddleware(enableBatching(reducer), initialState);
}


