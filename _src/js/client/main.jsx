import 'babel-es6-polyfill/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../main/redux/configureStore.js';
import Root from '../main/Root.jsx';
import api from './api.js';

const store = configureStore(window.__INITIAL_STATE__, api);

render((
    <Provider store={store}>
        <Root/>
    </Provider>
), document.getElementById('root'));
