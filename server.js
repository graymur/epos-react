import express from 'express';
import fs from 'fs';

import React from 'react';
import createLocation from 'history/lib/createLocation';
import routes from './_src/js/shared/routes.jsx';
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './_src/js/shared/redux/configureStore.js';
import api from './_src/js/server/api.js';
import compression from 'compression';

const port = 3000;

let app = express();
let layout;

const dv = console.log.bind(console);

fs.readFile('./_src/js/server/layout.html', 'utf8', (err, data) => {
    layout = data;
});

try {
    app.use(compression());

    app.use('/css', express.static('./css'));
    app.use('/files', express.static('./files'));
    app.use('/img', express.static('./img'));
    app.use('/js', express.static('./js'));

    app.get('/api/1/:endpoint', (req, res) => {
        api(req.params.endpoint, req.query).then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data), null, 4);
        });
    });

    app.get('*', (req, res) => {
        match({ routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {
            if (err) {
                throw err;
            }

            if (redirectLocation && redirectLocation.pathname) {
                res.redirect(redirectLocation.pathname)
            }

            let store;

            api('meta', { lang: renderProps.params.lang }).then(meta => {
                store = configureStore({ meta: meta }, api);

                let { query, params } = renderProps;
                let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;

                params.dispatch = store.dispatch;

                return comp.fetch ? comp.fetch(params) : Promise.resolve();
            }).then(data => {
                const InitialComponent = (
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );

                let content = renderToString(InitialComponent);

                let response = layout.replace('{{content}}', content);
                response = response.replace('{{state}}', JSON.stringify(store.getState()));

                res.setHeader('Content-Type', 'text/html');
                res.send(response);
            }).catch(e => {
                // TODO: handle wrong requests
                res.setHeader('Content-Type', 'text/html');
                res.send('error');
            });


        });
    });
} catch (error) {
    console.log(error);
}

app.listen(port, () => {
    console.log(`Epos app listening on port ${port}!`);
});