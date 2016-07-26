import * as constants from './constants.js';

const initialState = {
    title: '',
    content: '',
    url: '',
    lang: '',
    galleries: []
};

export default function page(state = initialState, action = {}) {
    let retval;

    switch (action.type) {
        case constants.GALLERY_SUCCESS:
            retval = action.data;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}