import $ from 'jquery';
import { batchActions } from 'redux-batched-actions';
import { errorAction } from '../../modules/app/actions.js';

export const CALL_API = 'CALL_API';
export const ASYNC_ERROR = 'ASYNC_ERROR';

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

    return fetchUrl(action.endpoint, request || {})
        .then(data => {
            return next(batchActions([{
                type: action.types.fetchedType,
                data
            }, errorAction(false)]));
        })
        .catch(error => next(errorAction(error)));
}

let cache = {};

function fetchUrl(endpoint, data = {}) {
    let cacheKey = JSON.stringify(Object.assign({}, data, { __e__: endpoint}));

    let retval;

    if (cache[cacheKey]) {
        retval = Promise.resolve(cache[cacheKey]);
    } else {
        retval = (new Promise(function (resolve, reject) {
            $.ajax({url: '/api/1/' + endpoint, data}).then(resolve, reject);
        })).then(data => {
            cache[cacheKey] = data;
            return data;
        });
    }

    return retval;
}


