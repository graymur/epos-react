import 'babel-es6-polyfill/polyfill';

import '../../sass/main.sass';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../shared/redux/configureStore.js';
import Root from "../shared/Root.jsx";
import api from './api.js';

window.Perf = require('react-addons-perf');

const store = configureStore(window.__INITIAL_STATE__, api);

render((
    <Provider store={store}>
        <Root />
    </Provider>
), document.getElementById('root'));