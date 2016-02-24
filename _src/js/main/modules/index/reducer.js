import { INDEX_REQUEST, INDEX_SUCCESS, INDEX_FAILURE } from './actions.js';
const initialState = [];

export default function page(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        case INDEX_SUCCESS:
            retval = action.data;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}