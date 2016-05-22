import { GALLERY_REQUEST, GALLERY_SUCCESS, GALLERY_FAILURE } from './actions.js';

const initialState = {
    title: '',
    content: '',
    url: '',
    lang: '',
    galleries: []
};

export default function page(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        case GALLERY_SUCCESS:
            retval = action.data;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}