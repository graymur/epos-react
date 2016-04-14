import { META_REQUEST, META_SUCCESS, META_FAILURE, ASYNC_ERROR } from './actions.js';
//const initialState = window && window.__INITIAL_STATE__ || {};
const initialState = {};

export default function meta(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        case META_SUCCESS:
            retval = Object.assign({}, state, action.data, { error: false });

            break;

        case ASYNC_ERROR:
            state.error = action.error;
            retval = Object.assign({}, state);

            break;

        default:
            retval = state;
            break;
    }

    return retval;
}