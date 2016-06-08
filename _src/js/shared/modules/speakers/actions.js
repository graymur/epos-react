import { CALL_API } from '../../redux/middleware/create-api-middleware.js';
import * as constants from './constants.js';

export function fetchSpeakersAction(lang) {
    return {
        type: CALL_API,
        types: {
            fetchingType: constants.SPEAKERS_REQUEST,
            fetchedType: constants.SPEAKERS_SUCCESS,
            errorType: constants.SPEAKERS_FAILURE
        },
        lang,
        endpoint: 'speakers'
    };
}