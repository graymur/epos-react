import express from 'express';
import api from './_src/js/server/api.js';
import fs from 'fs';

import React from 'react';
import createLocation from 'history/lib/createLocation';
import routes from './_src/js/main/routes.jsx';
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './_src/js/main/redux/configureStore.js';

let app = express();
let layout;

const dv = console.log.bind(console);

fs.readFile('./_src/js/server/layout.html', 'utf8', (err, data) => {
    layout = data;
});

try {
    app.use('/css', express.static('./css'));
    app.use('/files', express.static('./files'));
    app.use('/img', express.static('./img'));
    app.use('/js', express.static('./js'));

    app.get('/api/1/:endpoint', (req, res) => {
        let response = api(req.params.endpoint, req.query);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response), null, 4);
    });

    app.get('*', (req, res) => {

        var __INITIAL_STATE__ = {
            meta: {
                "menu":[
                    {"link":"about","title":"About us"},
                    {"link":"services","title":"Services"},
                    {"link":"contacts","title":"Contact us"},
                    {"link":"speakers","title":"Guest Speakers"},
                    {"link":"gallery","title":"Gallery"}
                ],
                "languages":[
                    {"code":"en","title":"English"},
                    {"code":"si","title":"Sloven\u010dina"}
                ],
                "currentLanguage":"en"
            }
        };

        dv(api('meta', { lang: 'en'}));

        const store = configureStore(__INITIAL_STATE__);

        match({ routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {
            if (err) {
                //console.error(err);
                //return res.status(500).end('Internal server error');
            }

            //function getReduxPromise () {
            //    let { query, params } = renderProps;
            //    let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
            //
            //    return comp.fetch
            //        ? comp.fetch(store.dispatch)
            //        : Promise.resolve();
            //}

            //var p = getReduxPromise();
            //
            //p.then(() => {
            //    let reduxState = JSON.stringify(store.getState());
            //
            //    const InitialComponent = (
            //        <Provider store={store}>
            //            <RouterContext {...renderProps} />
            //        </Provider>
            //    );
            //
            //    const content = renderToString(InitialComponent);
            //    console.log(content);
            //
            //    res.send(layout);
            //});

        });
    });
} catch (err) {
    console.log(err);
}

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});