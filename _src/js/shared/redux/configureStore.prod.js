import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createApiMiddleware from './middleware/create-api-middleware.js';
import { browserHistory } from 'react-router';
import { enableBatching } from 'redux-batched-actions';
import reducer from './rootReducer.js';

export default function configureStore(initialState, api) {
    const middleware = [
        routerMiddleware(browserHistory),
        createApiMiddleware(api)
    ];

    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

    return createStoreWithMiddleware(enableBatching(reducer), initialState);
}
