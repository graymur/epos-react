import { CALL_API } from '../../redux/middleware/create-api-middleware.js';
import * as constants from './constants.js';

export const fetchMetaAction = (lang) => ({
    type: CALL_API,
    types: {
        fetchingType: constants.META_REQUEST,
        fetchedType: constants.META_SUCCESS,
        errorType: constants.META_FAILURE
    },
    lang,
    endpoint: 'meta'
});

export const errorAction = (error) => ({
    type: constants.ASYNC_ERROR,
    error
});

export const clearErrorAction = () => ({
    type: constants.CLEAR_ERROR
});