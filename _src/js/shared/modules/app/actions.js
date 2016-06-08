import { CALL_API } from '../../redux/middleware/create-api-middleware.js';
import * as constants from './constants.js';

export function fetchMetaAction(lang) {
    return {
        type: CALL_API,
        types: {
            fetchingType: constants.META_REQUEST,
            fetchedType: constants.META_SUCCESS,
            errorType: constants.META_FAILURE
        },
        lang,
        endpoint: 'meta'
    };
}

export function errorAction(error) {
    return {
        type: constants.ASYNC_ERROR,
        error
    };
}

export function clearErrorAction() {
    return {
        type: constants.CLEAR_ERROR,
    };
}