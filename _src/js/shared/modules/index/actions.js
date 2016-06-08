import { CALL_API } from '../../redux/middleware/create-api-middleware.js';
import * as constants from './constants.js';

export function fetchIndexAction(lang) {
    return {
        type: CALL_API,
        types: {
            fetchingType: constants.INDEX_REQUEST,
            fetchedType: constants.INDEX_SUCCESS,
            errorType: constants.INDEX_FAILURE
        },
        lang,
        endpoint: 'index'
    };
}