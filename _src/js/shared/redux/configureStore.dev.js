import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createApiMiddleware from './middleware/create-api-middleware.js';
import { browserHistory } from 'react-router';
import { enableBatching } from 'redux-batched-actions';
import reducer from './rootReducer.js';

import { persistState } from 'redux-devtools';
import DevTools from '../containers/DevTools.jsx';

let enhancer = undefined;

if (typeof window !== 'undefined' && window.location) {
    enhancer = compose(
        DevTools.instrument(),
        persistState(
            window.location.href.match(
                /[?&]debug_session=([^&]+)\b/
            )
        )
    );
}

export default function configureStore(initialState, api) {
    const middleware = [
        //createLogger(),
        routerMiddleware(browserHistory),
        thunk,
        createApiMiddleware(api)
    ];

    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

    return createStoreWithMiddleware(enableBatching(reducer), initialState, enhancer);
}