import getPages from '../../../api-js/data/pages.js';
import getGalleries from './../../../api-js/data/gallery.js';
import getIndex from '../../../api-js/data/index.js';
import getMeta from '../../../api-js/data/meta.js';
import { getLanguages } from '../../../api-js/data/meta.js';
import getSpeakers from '../../../api-js/data/speakers.js';
import getContacts from '../../../api-js/data/contacts.js';

const endpoints = {
    'index': getIndex,
    'page': getPages,
    'gallery': getGalleries,
    'meta': getMeta,
    'speakers': getSpeakers,
    'contacts': getContacts,
};

export default function(endpoint, params, method) {
    return new Promise((resolve, reject) => {
        try {
            //if (arguments.length != 3) {
            //    throw 'API expects exactly three arguments';
            //}

            // check if endpoint exists
            if (typeof endpoints[endpoint] !== 'function') {
                console.log(endpoint);
                throw 'No action is mapped to this endpoint';
            }

            // check language
            if (!~getLanguages().indexOf(params.lang)) {
                throw 'Wrong language';
            }

            let result = endpoints[endpoint](params);
            result.lang = params.lang;
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}