const dv = console.log.bind(dv);

import $ from 'jquery';
import { batchActions } from 'redux-batched-actions';
import { errorAction } from '../../modules/app/actions.js';

let serverApi = { default: () => {}};

if (typeof window === 'undefined') {
    serverApi = require('../../../server/api.js');
}

export const CALL_API = 'CALL_API';
export const ASYNC_ERROR = 'ASYNC_ERROR';

let cache = {};

export default store => next => action => {
    if (action.type !== CALL_API) {
        return next(batchActions([action, errorAction(false)]));
    }

    next({ type: action.types.fetchingType });

    let request = Object.assign(
        {},
        action.payload || {},
        { lang: action.lang || store.getState().meta.currentLanguage }
    );

    let func = typeof window === 'undefined' ? fetchData : fetchUrl;

    return func(action.endpoint, request || {})
        .then(data => {
            return next(batchActions([{
                type: action.types.fetchedType,
                data
            }, errorAction(false)]));
        })
        .catch(error => {
            next(errorAction(error))
        });

}

function fetchUrl(endpoint, data = {}) {
    let cacheKey = JSON.stringify(Object.assign({}, data, { __e__: endpoint}));

    let retval;

    if (cache[cacheKey]) {
        retval = Promise.resolve(cache[cacheKey]);
    } else {
        // нужно переделать на iso-fetch
        retval = (new Promise(function (resolve, reject) {
            $.ajax({url: '/api/1/' + endpoint, data}).then(resolve, reject);
        })).then(data => {
            cache[cacheKey] = data;
            return data;
        });
    }

    return retval;
}

function fetchData(endpoint, data = {}) {
    return (new Promise((resolve, reject) => {
        resolve(serverApi.default(endpoint, data));
    }));
}


