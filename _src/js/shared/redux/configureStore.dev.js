import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createApiMiddleware from './middleware/create-api-middleware.js';
import { browserHistory } from 'react-router';
import { enableBatching } from 'redux-batched-actions';
import reducer from './rootReducer.js';

import { persistState } from 'redux-devtools';
import DevTools from '../containers/DevTools.jsx';

let enhancer;

if (typeof window !== 'undefined' && window.location) {
    enhancer = compose(
        DevTools.instrument(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    );
}

export default function configureStore(initialState, api) {
    const middleware = [
        routerMiddleware(browserHistory),
        createApiMiddleware(api)
    ];

    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

    let store = createStoreWithMiddleware(enableBatching(reducer), initialState, enhancer);

    if (module.hot) {
        module.hot.accept('./rootReducer.js', () => {
            const nextRootReducer = require('./rootReducer.js').default;

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}