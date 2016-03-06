import isServer from './isServer.js';
import fetch from 'isomorphic-fetch';

//if (!isServer()) {
if (true) {
    let cache = {};

    module.exports = function fetchUrl(endpoint, data = {}) {
        let cacheKey = JSON.stringify(Object.assign({}, data, { __e__: endpoint}));

        let retval;

        if (cache[cacheKey]) {
            retval = Promise.resolve(cache[cacheKey]);
        } else {
            let url = '/api/1/' + endpoint + '?' + Object.keys(data).map(k => k + '=' + encodeURIComponent(data[k])).join('&')

            return fetch(url).then(response => {
                return response.json();
            }).then(data => {
                return data;
            }).catch(error => {
                console.log(error);
                throw error;
            });
        }

        return retval;
    }
} else {
    const serverApi = require('../../server/api.js');

    module.exports = function fetchData(endpoint, data = {}) {
        return (new Promise((resolve, reject) => {
            resolve(serverApi.default(endpoint, data));
        }));
    }
}