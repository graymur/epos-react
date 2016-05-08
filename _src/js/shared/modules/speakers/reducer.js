import { SPEAKERS_REQUEST, SPEAKERS_SUCCESS, SPEAKERS_FAILURE } from './actions.js';

const initialState = {
    title: '',
    content: '',
    url: '',
    speakers: []
};

export default function speakers(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        case SPEAKERS_SUCCESS:
            retval = action.data;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}