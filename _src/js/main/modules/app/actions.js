import api from '../../util/api.js';

export function fetchMetaAction(lang) {
    return (dispatch, getState) => {
        dispatch(fetchingMetaAction());

        api.fetchMeta(lang).then(data => {
            dispatch(fetchedMetaAction(data));
        });
    };
}

export function fetchedMetaAction(meta) {
    return {
        type: 'META_FETCHED',
        meta
    };
}

export function fetchingMetaAction() {
    return { type: 'META_FETCHING'  };
}