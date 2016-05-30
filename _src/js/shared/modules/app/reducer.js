import { META_REQUEST, META_SUCCESS, META_FAILURE, CLEAR_ERROR } from './actions.js';
import { ASYNC_PENDING, ASYNC_SUCCESS, ASYNC_ERROR } from '../../redux/middleware/create-api-middleware.js';

const initialState = {
    error: false,
    asyncLoading: false
};

export default function meta(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        case META_SUCCESS:
            retval = Object.assign({}, state, action.data, { error: false });

            break;

        case ASYNC_PENDING:
            retval = Object.assign({}, state, {
                error: false,
                asyncLoading: true
            });

            break;

        case ASYNC_SUCCESS:
            retval = Object.assign({}, state, {
                error: false,
                asyncLoading: false
            });

            break;

        case ASYNC_ERROR:
            retval = Object.assign({}, state, {
                error: action.error
            });

            break;

        case CLEAR_ERROR:
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