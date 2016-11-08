import fetch from 'isomorphic-fetch';

let cache = {};
let promises = {};

const host = `${window.location.protocol}//${window.location.host}`;

export default function (endpoint, data = {}, method = 'GET') {
    let cacheKey = JSON.stringify(Object.assign({}, data, { __e__: endpoint }));

    if (promises[cacheKey]) return promises[cacheKey];

    if (cache[cacheKey] && method === 'GET') {
        return Promise.resolve(cache[cacheKey]);
    } else {
        let url, config;
        if (method === 'GET') {
            url = `${host}/api/1/${endpoint}?` + Object.keys(data).map(k => k + '=' + encodeURIComponent(data[k])).join('&');
            config = {};
        } else {
            url = `${host}/api/1/${endpoint}`;
            config = {
                method,
                body: JSON.stringify(data)
            };
        }

        let retval = fetch(url, config).then(response => {
            if (response.status >= 400) {
                return Promise.reject(new Error(`${response.statusText}: ${url}`));
            }

            return response.json();
        }).then(data => {
            cache[cacheKey] = data;
            return data;
        });

        promises[cacheKey] = retval;

        return retval;
    }
}