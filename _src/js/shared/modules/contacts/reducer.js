import * as constants from './constants.js';

const initialState = {
    title: '',
    content: '',
    url: '',
    lang: '',
    galleries: []
};

export default function contacts(state = initialState, action = {}) {
    let retval;

    switch (action.type) {
        case constants.CONTACTS_SUCCESS:
            retval = action.data;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}