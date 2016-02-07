const initialState = window.__INITIAL_STATE__ || {};

export default function meta(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        case 'META_FETCHED':
            retval = action.meta;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}