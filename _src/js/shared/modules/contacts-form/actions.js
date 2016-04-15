import { CALL_API } from '../../redux/middleware/create-api-middleware.js';

export const CONTACTS_FORM_REQUEST = 'CONTACTS_FORM_REQUEST';
export const CONTACTS_FORM_SUCCESS = 'CONTACTS_FORM_SUCCESS';
export const CONTACTS_FORM_FAILURE = 'CONTACTS_FORM_FAILURE';
export const CONTACTS_FORM_RESET = 'CONTACTS_FORM_RESET';

export function submitForm(values) {
    return {
        type: CALL_API,
        types: {
            fetchingType: CONTACTS_FORM_REQUEST,
            fetchedType: CONTACTS_FORM_SUCCESS,
            errorType: CONTACTS_FORM_FAILURE
        },
        endpoint: 'contacts-form',
        method: 'POST',
        payload: values
    };
}

export function resetForm() {
    return {
        type: CONTACTS_FORM_RESET
    };
}