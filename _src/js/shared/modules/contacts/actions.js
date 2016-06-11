import { CALL_API } from '../../redux/middleware/create-api-middleware.js';
import * as constants from './constants.js';

export const fetchContactsAction = (lang) => ({
    type: CALL_API,
    types: {
        fetchingType: constants.CONTACTS_REQUEST,
        fetchedType: constants.CONTACTS_SUCCESS,
        errorType: constants.CONTACTS_FAILURE
    },
    lang,
    endpoint: 'contacts'
});