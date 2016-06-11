import { CALL_API } from '../../redux/middleware/create-api-middleware.js';
import * as constants from './constants.js';

export const fetchGalleryAction = (lang) => ({
    type: CALL_API,
    types: {
        fetchingType: constants.GALLERY_REQUEST,
        fetchedType: constants.GALLERY_SUCCESS,
        errorType: constants.GALLERY_FAILURE
    },
    lang,
    endpoint: 'gallery'
});