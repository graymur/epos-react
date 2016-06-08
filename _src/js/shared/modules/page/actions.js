import { CALL_API } from '../../redux/middleware/create-api-middleware.js';
import * as constants from './constants.js';

export function fetchPageAction(lang, pageName) {
    return {
        type: CALL_API,
        types: {
            fetchingType: constants.PAGE_REQUEST,
            fetchedType: constants.PAGE_SUCCESS,
            errorType: constants.PAGE_FAILURE
        },
        lang,
        payload: {
            pageName
        },
        endpoint: 'page'
    };
}