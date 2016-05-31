import fetch from 'isomorphic-fetch';

let cache = {};
const host = `${window.location.protocol}//${window.location.host}`;

export default function (endpoint, data = {}, method = 'GET') {
    let cacheKey = JSON.stringify(Object.assign({}, data, { __e__: endpoint}));

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


        return fetch(url, config).then(response => {
            return response.json();
        }).then(data => {
            cache[cacheKey] = data;
            return data;
        }).catch(error => {
            //console.log(error);
            throw error;
        });
    }
}