import { SPEAKERS_REQUEST, SPEAKERS_SUCCESS, SPEAKERS_FAILURE } from './actions.js';
//import { ASYNC_PENDING } from '../../redux/middleware/create-api-middleware.js';

const initialState = {
    title: '',
    content: '',
    url: '',
    speakers: []
};

export default function speakers(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        //case ASYNC_PENDING:
        //    retval = Object.assign({}, state, { title: '' });
        //    break;

        case SPEAKERS_SUCCESS:
            retval = action.data;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}