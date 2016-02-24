import { CALL_API } from '../../redux/middleware/api.js';

export const ASYNC_ERROR = 'ASYNC_ERROR';
export const META_REQUEST = 'META_REQUEST';
export const META_SUCCESS = 'META_SUCCESS';
export const META_FAILURE = 'META_FAILURE';

export function fetchMetaAction(lang) {
    return (dispatch, getState) => {
        return dispatch({
            type: CALL_API,
            types: {
                fetchingType: META_REQUEST,
                fetchedType: META_SUCCESS,
                errorType: META_FAILURE
            },
            lang,
            endpoint: 'meta'
        });
    };
}

export function errorAction(error) {
    return {
        type: ASYNC_ERROR,
        error
    };
}