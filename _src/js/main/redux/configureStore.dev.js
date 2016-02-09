import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import { combineReducers } from 'redux';
import history from '../util/get-browser-history.js';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './rootReducer.js';

import { persistState } from 'redux-devtools';

import DevTools from '../containers/DevTools.jsx';

const enhancer = compose(
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&]+)\b/
        )
    )
);

const reduxRouterMiddleware = syncHistory(history);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunk/*, createLogger()*/)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(reducer, initialState, enhancer);
}


