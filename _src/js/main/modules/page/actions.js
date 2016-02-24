import { CALL_API } from '../../redux/middleware/api.js';

export const PAGE_REQUEST = 'PAGE_REQUEST';
export const PAGE_SUCCESS = 'PAGE_SUCCESS';
export const PAGE_FAILURE = 'PAGE_FAILURE';

export function fetchPageAction(lang, pageName) {
    return (dispatch, getState) => {
        return dispatch({
            type: CALL_API,
            types: {
                fetchingType: PAGE_REQUEST,
                fetchedType: PAGE_SUCCESS,
                errorType: PAGE_FAILURE
            },
            lang,
            payload: {
                pageName
            },
            endpoint: 'page'
        });
    };
}