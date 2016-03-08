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
            let host = 'http://epos-react:3000';

            if (typeof window !== 'undefined' && window.location) {
                host = `${window.location.protocol}//${window.location.host}`;
            }

            //let url = '/api/1/' + endpoint + '?' + Object.keys(data).map(k => k + '=' + encodeURIComponent(data[k])).join('&');
            let url = `${host}/api/1/${endpoint}?` + Object.keys(data).map(k => k + '=' + encodeURIComponent(data[k])).join('&');

            return fetch(url).then(response => {
                return response.json();
            }).then(data => {
                cache[cacheKey] = data;
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