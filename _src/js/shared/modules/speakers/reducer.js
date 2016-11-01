import * as constants from './constants.js';

const initialState = {
    title: '',
    content: '',
    url: '',
    speakers: []
};

export default function speakers(state = initialState, action = {}) {
    let retval;

    switch (action.type) {
        case constants.SPEAKERS_SUCCESS:
            retval = action.data;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}