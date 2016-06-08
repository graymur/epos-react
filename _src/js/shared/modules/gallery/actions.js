import { CALL_API } from '../../redux/middleware/create-api-middleware.js';
import * as constants from './constants.js';

//export const GALLERY_REQUEST = 'GALLERY_REQUEST';
//export const GALLERY_SUCCESS = 'GALLERY_SUCCESS';
//export const GALLERY_FAILURE = 'GALLERY_FAILURE';

export function fetchGalleryAction(lang) {
    return {
        type: CALL_API,
        types: {
            fetchingType: constants.GALLERY_REQUEST,
            fetchedType: constants.GALLERY_SUCCESS,
            errorType: constants.GALLERY_FAILURE
        },
        lang,
        endpoint: 'gallery'
    };
}