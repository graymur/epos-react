import { CALL_API } from '../../redux/middleware/create-api-middleware.js';

export const INDEX_REQUEST = 'INDEX_REQUEST';
export const INDEX_SUCCESS = 'INDEX_SUCCESS';
export const INDEX_FAILURE = 'INDEX_FAILURE';

export function fetchIndexAction(lang) {
    return {
        type: CALL_API,
        types: {
            fetchingType: INDEX_REQUEST,
            fetchedType: INDEX_SUCCESS,
            errorType: INDEX_FAILURE
        },
        lang,
        endpoint: 'index'
    };
}