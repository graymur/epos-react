//import { PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE } from './actions.js';
import * as constants from './constants.js';

const initialState = {
    title: '',
    content: '',
    url: '',
    isLoading: false
};

export default function page(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        case constants.PAGE_SUCCESS:
            retval =  action.data || initialState;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}