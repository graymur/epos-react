import { PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE } from 'shared/modules/page/actions.js';
import reducer from 'shared/modules/page/reducer.js';

import {assert} from 'chai';

let initialState = {
    title: '',
    content: '',
    url: ''
};

let action = {
    type: PAGE_SUCCESS,
    data: {
        test: 'test'
    }
};

describe('Index reduces', () => {
    it('returns correct state', () => {
        let state = reducer(initialState, action);

        assert.deepEqual(state, {
            test: "test"
        });
    });

    it('does not modify original state', () => {
        let state = reducer(initialState, action);

        assert.deepEqual(initialState, {
            title: '',
            content: '',
            url: ''
        });
    });
});

