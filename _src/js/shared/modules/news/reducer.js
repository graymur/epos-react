import * as constants from './constants.js';

const initialState = {
    title: '',
    content: '',
    url: '',
    lang: '',
    news: []
};

export default function news(state = initialState, action = {}) {
    let retval;

    switch (action.type) {
        case constants.NEWS_SUCCESS:
            retval = action.data;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}