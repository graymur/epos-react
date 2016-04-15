import { CONTACTS_REQUEST, CONTACTS_SUCCESS, CONTACTS_FAILURE } from './actions.js';

const initialState = {
    title: '',
    content: '',
    url: '',
    lang: '',
    galleries: []
};

export default function contacts(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        case CONTACTS_SUCCESS:
            retval = action.data;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}