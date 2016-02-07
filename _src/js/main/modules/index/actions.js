import api from '../../util/api.js';

export function fetchIndexAction(lang) {
    return (dispatch, getState) => {
        dispatch(fetchingIndexAction());

        api.fetchIndex(lang).then(data => {
            dispatch(fetchedIndexAction(data));
        });
    };
}

export function fetchedIndexAction(index) {
    return {
        type: 'INDEX_FETCHED',
        index
    };
}

export function fetchingIndexAction() {
    return {
        type: 'INDEX_FETCHING'
    };
}