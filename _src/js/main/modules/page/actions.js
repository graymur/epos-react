import api from '../../util/api.js';
import { errorAction } from '../error/actions.js';

export function fetchPageAction(lang, page) {
    return (dispatch, getState) => {
        dispatch(fetchingPageAction());

        api.fetchPage(lang, page).then(data => {
            dispatch(fetchedPageAction(data));
        }).catch((e) => {
            dispatch(errorAction(e.status, e.statusText));
        });
    };
}

export function fetchedPageAction(page) {
    return {
        type: 'PAGE_FETCHED',
        page
    };
}

export function fetchingPageAction() {
    return {
        type: 'PAGE_FETCHING'
    };
}