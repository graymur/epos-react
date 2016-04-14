import { GALLERY_REQUEST, GALLERY_SUCCESS, GALLERY_FAILURE } from './actions.js';
//import { ASYNC_PENDING } from '../../redux/middleware/create-api-middleware.js';

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
        //case ASYNC_PENDING:
        //    retval = Object.assign({}, state, { title: '' });
        //    break;

        case GALLERY_SUCCESS:
            retval = action.data;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}