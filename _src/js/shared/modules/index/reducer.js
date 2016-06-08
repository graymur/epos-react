import * as constants from './constants.js';

const initialState = [];

export default function page(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        case constants.INDEX_SUCCESS:
            retval = action.data;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}