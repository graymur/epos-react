import 'babel-es6-polyfill/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore.js';

import Root from './Root.jsx';


/* -------------------------------- */

//import { createStore, compose } from 'redux';
//import { persistState } from 'redux-devtools';
////import rootReducer from '../reducers';
//import DevTools from './containers/DevTools';
//
//const enhancer = compose(
//    DevTools.instrument(),
//    persistState(
//        window.location.href.match(
//            /[?&]debug_session=([^&]+)\b/
//        )
//    )
//);
//
//function configureStore(initialState) {
//    const store = createStore(rootReducer, initialState, enhancer);
//
//    if (module.hot) {
//        module.hot.accept('../reducers', () =>
//                store.replaceReducer(require('../reducers').default)
//        );
//    }
//
//    return store;
//}


/* -------------------------------- */


const store = configureStore(window.__INITIAL_STATE__);

render((
    <Provider store={store}>
        <Root/>
    </Provider>
), document.getElementById('root'));
