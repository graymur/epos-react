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

var path = require('path');
var mime = require('mime');
var Cropper = require('cropper');

function parseOptions(optionsString, allowedParams) {
    return optionsString.split('-').reduce((carry, item) => {
        var key = item[0];

        // check if key is good
        if (allowedParams && allowedParams.indexOf(key) === -1) {
            throw new Error('Unexpected param');
        }

        if (!carry[key]) {
            carry[key] = [];
        }

        carry[key].push(item.slice(1));
        return carry;
    }, {});
}

router.get('/resize/*', function *() {
    var allowedParams = ['w', 'h', 't', 'm', 's', 'f'];

    let sourceDir = __dirname + '/public/files';
    let targetDir = __dirname + '/public/resize';
    let ImageMagickPath = /^win/.test(process.platform) ? 'D:/www/util/ImageMagick/convert.exe' : 'convert';
    let quality = 80;
    let _, optionsString, sourceName, options, width, height, mimeType;

    [_, optionsString, sourceName] = this.request.url.replace(/^\/+|\/+$/g, '').split('/');
    let sourcePath = path.normalize(sourceDir + '/' + sourceName);

    let targetFullDir = path.normalize(targetDir + '/' + optionsString);
    let targetPath = path.normalize(targetFullDir + '/' + sourceName);

    // check if file was previously created
    if (fs.existsSync(targetPath)) {
        this.body = fs.createReadStream(targetPath);
        return true;
        //return config.onSuccess.call(null, targetPath, response, mime.lookup(targetPath));
    }

    console.log('noe');

    if (!fs.existsSync(sourcePath)) {
        return config.on404.call(null, response, next);
    }

    try {
        options = parseOptions(optionsString, allowedParams);
    } catch (e) {
        console.log(e);
        //return config.on404.call(null, request, response, next, e);
    }

    mimeType = mime.lookup(sourcePath);

    if (mimeType.indexOf('image') === -1) {
        return config.on404.call(null, request, response, next, new Error('Wrong source mime type'));
    }

    if (!fs.existsSync(targetFullDir)) {
        fs.mkdirSync(targetFullDir);
    }

    width = options.w && options.w[0] ? options.w[0] : 0;
    height = options.h && options.h[0] ? options.h[0] : 0;

    // either width or height has to be defined
    if (!width && !height) {
        return config.on404.call(null, request, response, next);
    }

    var cropper = (new Cropper())
        .setIMPath(ImageMagickPath)
        .setSource(sourcePath)
        .setTarget(targetPath)
        .setQuality(quality)
    ;

    // apply resize
    switch (options.t && options.t[0])
    {
        case 'square':
            cropper.square(width || height);
            break;

        case 'square_put':
            cropper.putIntoSquare(width);
            break;

        case 'put':
            cropper.putIntoSize(width, height);
            break;

        case 'put_out':
            cropper.cutIntoSize(width, height);
            break;

        default:
            var mode = cropper.RESIZE_PROPORTIONAL, w, h;

            if (!width) {
                mode = cropper.RESIZE_HEIGHT;
            } else if (!height) {
                mode = cropper.RESIZE_WIDTH;
            } else {
                mode = !options.m ? cropper.RESIZE_PROPORTIONAL : options.m
            }

            cropper.resize(width || height, height || width, mode);

            break;
    }

    // apply filters
    (options.f || []).forEach(function (filter) {
        switch (filter) {
            case 'gs':
                cropper.grayscale();
                break;
        }
    });

    let filePath = yield cropper.commit();

    this.type = mimeType;

    this.body = fs.createReadStream(filePath);
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