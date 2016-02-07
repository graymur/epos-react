const initialState = [];

export default function page(state = initialState, action = {}) {
    let retval;

    switch(action.type) {
        //case 'INDEX_FETCHING':

            //retval = initialState;

            //break;

        case 'INDEX_FETCHED':

            retval = action.index;

            break;

        default:
            retval = state;
            break;
    }

    return retval;
}