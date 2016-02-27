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
import serverApi from './_src/js/server/api.js';

const port = 3000;

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
        match({ routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {
            if (err) {
                throw err;
            }

            if (redirectLocation && redirectLocation.pathname) {
                res.redirect(redirectLocation.pathname)
            }

            const store = configureStore({ meta: serverApi('meta', { lang: renderProps.params.lang }) });

            let { query, params } = renderProps;
            let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;

            params.dispatch = store.dispatch;

            let promise = comp.fetch ? comp.fetch(params) : Promise.resolve();

            promise.then(data => {
                let state = JSON.stringify(store.getState());

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
            }).catch(error => {
                console.log(error);
                throw new Error(error);
            });
        });
    });
} catch (error) {
    console.log(error);
}

app.listen(port, () => {
    console.log(`Epos app listening on port ${port}!`);
});