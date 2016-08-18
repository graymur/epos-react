import { CALL_API } from '../../redux/middleware/create-api-middleware.js';
import * as constants from './constants.js';

export const fetchNewsAction = (lang) => ({
    type: CALL_API,
    types: {
        fetchingType: constants.NEWS_REQUEST,
        fetchedType: constants.NEWS_SUCCESS,
        errorType: constants.NEWS_FAILURE
    },
    lang,
    endpoint: 'news'
});