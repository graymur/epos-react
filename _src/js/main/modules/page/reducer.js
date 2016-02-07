const initialState = {
    title: '',
    content: '',
    url: '',
    isLoading: false
};

export default function page(state = initialState, action = {}) {
    let retval;

    switch(action.type) {

        case 'META_FETCHED':

            retval = Object.assign({}, initialState);

            break;
        //case 'PAGE_FETCHING':
        //    retval = Object.assign({}, initialState, { isLoading: true });
        //    break;

        case 'PAGE_FETCHED':
            retval =  action.page;
            break;

        default:
            retval =  state;
            break;
    }

    return retval;
}