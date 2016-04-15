import { CALL_API } from '../../redux/middleware/create-api-middleware.js';

export const CONTACTS_REQUEST = 'CONTACTS_REQUEST';
export const CONTACTS_SUCCESS = 'CONTACTS_SUCCESS';
export const CONTACTS_FAILURE = 'CONTACTS_FAILURE';

export function fetchContactsAction(lang) {
    return {
        type: CALL_API,
        types: {
            fetchingType: CONTACTS_REQUEST,
            fetchedType: CONTACTS_SUCCESS,
            errorType: CONTACTS_FAILURE
        },
        lang,
        endpoint: 'contacts'
    };
}