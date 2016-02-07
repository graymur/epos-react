import 'babel-es6-polyfill/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import reducer from './redux/rootReducer.js';
import configureStore from './redux/configureStore.js';

import Root from './Root.jsx';

const store = configureStore(reducer, window.__INITIAL_STATE__);

render((
    <Provider store={store}>
        <Root/>
    </Provider>
), document.getElementById('root'));
