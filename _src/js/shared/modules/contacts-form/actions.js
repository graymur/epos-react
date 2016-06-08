import { CALL_API } from '../../redux/middleware/create-api-middleware.js';
import * as constants from './constants.js';

export function submitForm(values) {
    return {
        type: CALL_API,
        types: {
            fetchingType: constants.CONTACTS_FORM_REQUEST,
            fetchedType: constants.CONTACTS_FORM_SUCCESS,
            errorType: constants.CONTACTS_FORM_FAILURE
        },
        endpoint: 'contacts-form',
        method: 'POST',
        payload: values
    };
}

export function resetForm() {
    return {
        type: constants.CONTACTS_FORM_RESET
    };
}