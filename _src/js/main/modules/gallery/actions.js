import api from '../../util/api.js';

export function fetchGalleryAction(lang) {
    return (dispatch, getState) => {
        dispatch(fetchingGalleryAction());

        api.fetchGallery(lang).then(data => {
            dispatch(fetchedGalleryAction(data));
        });
    };
}

export function fetchedGalleryAction(speakers) {
    return {
        type: 'GALLERY_FETCHED',
        speakers
    };
}

export function fetchingGalleryAction() {
    return { type: 'GALLERY_FETCHING'  };
}