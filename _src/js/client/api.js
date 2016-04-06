import fetch from 'isomorphic-fetch';

let cache = {};
const host = `${window.location.protocol}//${window.location.host}`;

export default function (endpoint, data = {}) {
    let cacheKey = JSON.stringify(Object.assign({}, data, { __e__: endpoint}));

    let retval;

    //console.log(`${host}/api/1/${endpoint}?` + Object.keys(data).map(k => k + '=' + encodeURIComponent(data[k])).join('&'));

    if (cache[cacheKey]) {
        retval = Promise.resolve(cache[cacheKey]);
    } else {
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