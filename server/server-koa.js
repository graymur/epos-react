/*eslint-env node*/

import path from 'path';
import fs from 'fs';
import koa from 'koa';
import staticCache from 'koa-static-cache';
import joiRouter from 'koa-joi-router';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';

import routes from '../_src/js/shared/routes.jsx';
import configureStore from '../_src/js/shared/redux/configureStore.prod.js';
import api from '../_src/js/server/api.js';
import { errorAction } from '../_src/js/shared/modules/app/actions.js';
import resize, { parseOptions } from './koa-resize.js';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const publicPath = path.resolve(__dirname + '/../public');
const port = 3000;
const defaultLanguage = 'en';
const layout = fs.readFileSync(__dirname + '/../_src/js/server/layout.html', 'utf8');

const json = arg => JSON.stringify(arg, null, 4);
const dv = arg => console.log(json(arg));

const app = koa();

app.use(staticCache(path.join(__dirname, '/../public'), {
    maxAge: 365 * 24 * 60 * 60
}));

// routes
const router = joiRouter();

router.get('/resize/*', resize({
    sourceDir: path.join(publicPath, 'files'),
    targetDir: path.resolve(publicPath, 'resize'),
    ImageMagickPath: /^win/.test(process.platform) ? 'D:/www/util/ImageMagick/convert.exe' : 'convert',
    quality: 80
}));

router.get('/api/1/:endpoint', function *() {
    var data = yield api(this.request.params.endpoint, this.request.query);
    this.type = 'application/json; charset=utf-8';
    this.body = JSON.stringify(data);
});

function render(store, renderProps, context) {
    if (!renderProps) return false;

    const InitialComponent = (
        <Provider store={store}>
            <RouterContext {...renderProps} />
        </Provider>
    );

    return renderToString(InitialComponent);
}

router.route({
    path: '*',
    method: ['GET', 'POST'],
    handler: function *() {
        const context = this;
        let store, redirectLocation, renderProps;

        let pathname = '/' + this.request.path.replace(/^\/+|\/+$/g, '');

        try {
            let path = this.request.url.split('/', 2);
            let lang = path.length ? path[1] : defaultLanguage;

            let meta = yield api('meta', { lang: lang });

            store = configureStore({ meta }, api);

            let matchPromise = new Promise((resolve, reject) => {
                match({ routes, location: this.request.path }, (err, redirectLocation, renderProps) => {
                    if (err) {
                        reject(renderProps);
                    }

                    if (redirectLocation && redirectLocation.pathname) {
                        context.redirect(redirectLocation.pathname);
                        resolve([redirectLocation]);
                    }

                    let { query, params } = renderProps;
                    let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;

                    params.dispatch = store.dispatch;

                    (comp.fetch ? comp.fetch(params) : Promise.resolve())
                        .then(data => resolve([redirectLocation, renderProps]))
                        .catch(e => resolve([redirectLocation, renderProps]));
                });
            });

            [redirectLocation, renderProps] = yield matchPromise;
        } catch (e) {
            let meta = yield api('meta', { lang: defaultLanguage });
            meta.error = String(e);
            store = configureStore({ meta }, api);

            let matchPromise = new Promise((resolve, reject) => {
                match({ routes, location: pathname }, (err, redirectLocation, renderProps) => {
                    resolve([redirectLocation, renderProps]);
                });
            });

            [redirectLocation, renderProps] = yield matchPromise;
        } finally {
            if (redirectLocation && redirectLocation.pathname) {
                this.redirect(redirectLocation.pathname);
            } else {
                if (store.getState().meta.error) {
                    context.status = 404;
                }

                this.body = layout.replace('{{content}}', render(store, renderProps));
                this.body = this.body.replace('{{state}}', JSON.stringify(store.getState()));
            }
        }
    }
});

app.use(router.middleware());

app.listen(port);

console.log(`Epos app listening on port ${port}!`);