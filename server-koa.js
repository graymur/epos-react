/*eslint-env node*/

require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const json = arg => {
    return JSON.stringify(arg, null, 4);
};

const dv = arg => {
    console.log(json(arg));
};

import fs from 'fs';

const port = 3000;
const defaultLanguage = 'en';
const layout = fs.readFileSync('./_src/js/server/layout.html', 'utf8');

import koa from 'koa';

const app = koa();

// static files
import koaStatic from 'koa-static';
app.use(koaStatic(__dirname + '/public'));

// routes
import joiRouter from 'koa-joi-router';
const router = joiRouter();

router.get('/resize/*', function *() {

});

router.get('/api/1/:endpoint', function *() {
    var data = yield api(this.request.params.endpoint, this.request.query);
    this.type = 'application/json; charset=utf-8';
    this.body = JSON.stringify(data);
});

// require is used here instead of import because imports are asynchronous and
// in node 6.1.0 some modules are imported before dotenv and do not receive
// env variables
const routes = require('./_src/js/shared/routes.jsx').default;
const configureStore = require('./_src/js/shared/redux/configureStore.js').default;
const api = require('./_src/js/server/api.js').default;
const errorAction = require('./_src/js/shared/modules/app/actions.js').errorAction;

import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';

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
        let store, renderProps;

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
                    }

                    let { query, params } = renderProps;
                    let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;

                    params.dispatch = store.dispatch;

                    (comp.fetch ? comp.fetch(params) : Promise.resolve())
                        .then(data => resolve(renderProps))
                        .catch(e => resolve(renderProps));
                });
            });

            renderProps = yield matchPromise;
        } catch (e) {
            let meta = yield api('meta', { lang: defaultLanguage });
            meta.error = String(e);
            store = configureStore({ meta }, api);

            let matchPromise = new Promise((resolve, reject) => {
                match({ routes, location: pathname }, (err, redirectLocation, renderProps) => {
                    if (redirectLocation && redirectLocation.pathname) {
                        context.redirect(redirectLocation.pathname);
                    }

                    resolve(renderProps);
                });
            });

            renderProps = yield matchPromise;
        } finally {
            if (store.getState().meta.error) {
                context.status = 404;
            }

            this.body = layout.replace('{{content}}', render(store, renderProps));
            this.body = this.body.replace('{{state}}', JSON.stringify(store.getState()));
        }
    }
});

app.use(router.middleware());

app.listen(port);

console.log(`Epos app listening on port ${port}!`);