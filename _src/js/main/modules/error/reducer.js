const initialState = {
    error: {
        status: null,
        message: null
    }
};

export default function error(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        case 'ERROR':
            retval = { status: action.status, message: action.message };
            break;

        default:
            retval = initialState;
            break;
    }

    return retval;
}