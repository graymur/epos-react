const initialState = {
    title: '',
    content: '',
    url: '',
    speakers: []
};

export default function page(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        case 'SPEAKERS_FETCHING':
            retval = initialState;
            break;

        case 'SPEAKERS_FETCHED':
            retval = action.speakers;
            break;

        default:
            retval = state;
            break;
    }

    return retval;
}