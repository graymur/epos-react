import { CALL_API } from '../../redux/middleware/api.js';

export const GALLERY_REQUEST = 'GALLERY_REQUEST';
export const GALLERY_SUCCESS = 'GALLERY_SUCCESS';
export const GALLERY_FAILURE = 'GALLERY_FAILURE';

export function fetchGalleryAction(lang) {
    return (dispatch, getState) => {
        return dispatch({
            type: CALL_API,
            types: {
                fetchingType: GALLERY_REQUEST,
                fetchedType: GALLERY_SUCCESS,
                errorType: GALLERY_FAILURE
            },
            lang,
            endpoint: 'gallery'
        });
    };
}