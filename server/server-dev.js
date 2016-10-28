/*eslint-env node*/

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const publicPath = path.resolve(__dirname + '/../public');

import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import createLocation from 'history/lib/createLocation';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import cropperExpress from 'cropper-express';
import compression from 'compression';

// require is used here instead of import because imports are asynchronous and
// in node 6.1.0 some modules are imported before dotenv and do not receive
// env variables
import routes from '../_src/js/shared/routes.jsx';
import configureStore from '../_src/js/shared/redux/configureStore.prod.js';
import api from '../_src/js/server/api.js';
import { errorAction } from '../_src/js/shared/modules/app/actions.js';

const port = 3000;
const layout = fs.readFileSync('./_src/js/server/layout.html', 'utf8');
const defaultLanguage = 'en';

let app = express();

//app.use(compression());

/* --------------------- */
var bundle = require('./bundle.js');
bundle('localhost', port + 1);

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

app.all('/js/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:3001'
    });
});

proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
});
/* --------------------- */

app.use('/css', express.static(path.join(publicPath, 'css')));
app.use('/files', express.static(path.join(publicPath, 'files')));
app.use('/img', express.static(path.join(publicPath, 'img')));
//app.use('/js', express.static(path.join(publicPath, 'js')));

app.use('/resize', cropperExpress({
    sourceDir: path.join(__dirname, '/../public/files'),
    targetDir: path.join(__dirname, '/../public/resize'),
    ImageMagickPath: /^win/.test(process.platform) ? 'D:/www/util/ImageMagick/convert.exe' : 'convert',
    quality: 80,
    on404: (req, res, next) => next('Cropper error')
}));

app.all('/api/1/:endpoint', (req, res) => {
    api(req.params.endpoint, req.query).then(data => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data), null, 4);
    });
});

// request meta in middleware so it's available to render methods
// without nesting promises
app.use((req, res, next) => {
    let path = req.path.split('/', 2);
    let lang = path.length ? path[1] : defaultLanguage;

    api('meta', { lang: lang }).then(meta => {
        req.meta = meta;
        return next();
    }).catch(e => next(e));
});

function render(renderProps, res, store) {
    const InitialComponent = (
        <Provider store={store}>
            <RouterContext {...renderProps} />
        </Provider>
    );

    let content = renderToString(InitialComponent);

    let response = layout.replace('{{content}}', content);
    response = response.replace('{{state}}', JSON.stringify(store.getState()));

    if (store.getState().meta.error) {
        res.status(404);
    }

    res.setHeader('Content-Type', 'text/html');
    res.send(response);
}

app.use('*', (req, res, next) => {
    match({ routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {
        if (err) {
            return next(err);
        }

        if (redirectLocation && redirectLocation.pathname) {
            return res.redirect(redirectLocation.pathname);
        }

        let store = configureStore({ meta: req.meta }, api);

        let { query, params } = renderProps;
        let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;

        params.dispatch = store.dispatch;

        (comp.fetch ? comp.fetch(params) : Promise.resolve()).then(data => {
            render(renderProps, res, store);
        }).catch(e => next(e));
    });
});

// catch all error and render 404 page
app.use(function(err, req, res, next) {
    if (err) {
        return false;
    }

    api('meta', { lang: defaultLanguage }).then(meta => {
        match({ routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {
            if (err) {
                return false;
            }

            if (redirectLocation && redirectLocation.pathname) {
                return res.redirect(redirectLocation.pathname);
            }

            meta.error = true;
            let store = configureStore({ meta: meta }, api);
            render(renderProps, res, store);
        });
    });
});

app.listen(port, () => {
    console.log(`Epos app listening on port ${port}!`);
});