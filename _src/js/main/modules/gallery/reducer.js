const initialState = {
    title: '',
    content: '',
    url: '',
    galleries: []
};

export default function page(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        case 'GALLERY_FETCHING':

            retval = initialState;

            break;

        case 'GALLERY_FETCHED':

            retval = action.speakers;

            break;

        default:
            retval = state;
            break;
    }

    return retval;
}