import { CALL_API } from '../../redux/middleware/create-api-middleware.js';

export const SPEAKERS_REQUEST = 'SPEAKERS_REQUEST';
export const SPEAKERS_SUCCESS = 'SPEAKERS_SUCCESS';
export const SPEAKERS_FAILURE = 'SPEAKERS_FAILURE';

export function fetchSpeakersAction(lang) {
    return {
        type: CALL_API,
        types: {
            fetchingType: SPEAKERS_REQUEST,
            fetchedType: SPEAKERS_SUCCESS,
            errorType: SPEAKERS_FAILURE
        },
        lang,
        endpoint: 'speakers'
    };
}