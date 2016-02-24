import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import meta from '../modules/app/reducer.js';
import page from '../modules/page/reducer.js';
import speakers from '../modules/speakers/reducer.js';
import gallery from '../modules/gallery/reducer.js';
import index from '../modules/index/reducer.js';
import error from '../modules/error/reducer.js';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const reducer = combineReducers({
    meta,
    page,
    speakers,
    gallery,
    index,
    //error,
    routing: routeReducer
});

export default reducer;