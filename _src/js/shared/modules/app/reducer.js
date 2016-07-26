import * as constants from './constants.js';
import * as apiConstants from '../../redux/middleware/create-api-middleware.js';

const initialState = {
    error: false,
    asyncLoading: false
};

export default function meta(state = initialState, action = {}) {
    let retval;

    switch (action.type) {
        case constants.META_SUCCESS:
            retval = Object.assign({}, state, action.data, { error: false });

            break;

        case apiConstants.ASYNC_PENDING:
            retval = Object.assign({}, state, {
                error: false,
                asyncLoading: true
            });

            break;

        case apiConstants.ASYNC_SUCCESS:
            retval = Object.assign({}, state, {
                error: false,
                asyncLoading: false
            });

            break;

        case apiConstants.ASYNC_ERROR:
            retval = Object.assign({}, state, {
                error: action.error
            });

            break;

        case constants.CLEAR_ERROR:
            retval = Object.assign({}, state, {
                error: false
            });

            break;

        default:
            retval = state;
            break;
    }

    return retval;
}