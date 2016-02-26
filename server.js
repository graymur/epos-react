import React from 'react';
const dv = console.log.bind(console);

import createLocation from 'history/lib/createLocation';
import routes from './_src/js/main/routes.jsx';
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './_src/js/main/redux/configureStore.js';
import serverApi from './_src/js/server/api.js';

match({ routes, location: '/en/gallery' }, (err, redirectLocation, renderProps) => {
    if (err) {
        //console.error(err);
        //return res.status(500).end('Internal server error');
    }

    const __INITIAL_STATE__ = { meta: serverApi('meta', { lang: 'en' }) };
    const store = configureStore(__INITIAL_STATE__);

    let { query, params } = renderProps;
    let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;

    params.dispatch = store.dispatch;

    let promise = comp.fetch ? comp.fetch(params) : Promise.resolve();

    promise.then(data => {
        let reduxState = JSON.stringify(store.getState());

        const InitialComponent = (
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        const content = renderToString(InitialComponent);
        console.log(content);
    }).catch(err => {
        //console.log(err);
    });
});
