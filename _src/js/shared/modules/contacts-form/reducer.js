import { CONTACTS_FORM_REQUEST, CONTACTS_FORM_SUCCESS, CONTACTS_FORM_FAILURE } from './actions.js';

const initialState = {
    submitted: false,
    success: null
};

export default function contactsForm(state = initialState, action = {}) {
    let retval;

    switch(action.type) {

        case CONTACTS_FORM_SUCCESS:
            retval = Object.assign({}, { submitted: true });
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}