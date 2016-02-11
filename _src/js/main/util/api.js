import $ from 'jquery';
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

const api = {
    fetchIndex: (lang) => {
        return fetchUrl('index', { lang });
    },
    fetchPage: (lang, pageName) => {
        return fetchUrl('page', { lang, pageName });
    },
    fetchSpeakers: (lang) => {
        return fetchUrl('speakers', { lang });
    },
    fetchGallery: (lang) => {
        return fetchUrl('gallery', { lang });
    },
    fetchMeta: (lang) => {
        return fetchUrl('meta', { lang });
    },
    fetchMain: (lang) => {
        return fetchUrl('main', { lang });
    }
};

export default Object.freeze(api);

