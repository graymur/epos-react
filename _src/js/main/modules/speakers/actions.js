import { CALL_API } from '../../redux/middleware/api.js';

export const SPEAKERS_REQUEST = 'SPEAKERS_REQUEST';
export const SPEAKERS_SUCCESS = 'SPEAKERS_SUCCESS';
export const SPEAKERS_FAILURE = 'SPEAKERS_FAILURE';

export function fetchSpeakersAction(lang) {
    return (dispatch, getState) => {
        return dispatch({
            type: CALL_API,
            types: {
                fetchingType: SPEAKERS_REQUEST,
                fetchedType: SPEAKERS_SUCCESS,
                errorType: SPEAKERS_FAILURE
            },
            lang,
            endpoint: 'speakers'
        });
    };
}