import { CALL_API } from '../../redux/middleware/create-api-middleware.js';
import * as constants from './constants.js';

export const submitForm = (values) => ({
    type: CALL_API,
    types: {
        fetchingType: constants.CONTACTS_FORM_REQUEST,
        fetchedType: constants.CONTACTS_FORM_SUCCESS,
        errorType: constants.CONTACTS_FORM_FAILURE
    },
    endpoint: 'contacts-form',
    method: 'POST',
    payload: values
});

export const resetForm = () => ({
    type: constants.CONTACTS_FORM_RESET
});