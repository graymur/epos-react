// TODO: move all this to some actual storage
import getPages from '../../../api-js/data/pages.js';
import getGalleries from './../../../api-js/data/gallery.js';
import getIndex from '../../../api-js/data/index.js';
import getMeta from '../../../api-js/data/meta.js';
import { getLanguages } from '../../../api-js/data/meta.js';
import getSpeakers from '../../../api-js/data/speakers.js';

const endpoints = {
    'index': getIndex,
    'page': getPages,
    'gallery': getGalleries,
    'meta': getMeta,
    'speakers': getSpeakers
};

export default function(endpoint, params) {
    if (arguments.length != 2) {
        throw new Error('API expects exactly two arguments');
    }

    // check if endpoint exists
    if (typeof endpoints[endpoint] !== 'function') {
        throw new Error('No action is mapped to this endpoint');
    }

    // check language
    if (!~getLanguages().indexOf(params.lang)) {
        throw new Error('Wrong language');
    }

    return Promise.resolve(endpoints[endpoint](params));
}