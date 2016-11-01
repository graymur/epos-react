import * as constants from './constants.js';
//import { CALL_API } from '../../redux/middleware/create-api-middleware.js';

const initialState = {
    submitting: false,
    submitted: false,
    success: null
};

export default function contactsForm(state = initialState, action = {}) {
    let retval;

    switch (action.type) {
        case constants.CONTACTS_FORM_REQUEST:
            retval = Object.assign({}, { submitting: true });

            break;

        case constants.CONTACTS_FORM_SUCCESS:
            retval = Object.assign({}, {
                submitted: true,
                submitting: false
            });

            break;

        case constants.CONTACTS_FORM_RESET:
            retval = Object.assign({}, initialState);
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}