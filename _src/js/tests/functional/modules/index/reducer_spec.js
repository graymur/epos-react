import { INDEX_REQUEST, INDEX_SUCCESS, INDEX_FAILURE } from 'shared/modules/index/actions.js';
import reducer from 'shared/modules/index/reducer.js';

import {assert} from 'chai';

let initialState = {
    title: '',
    content: '',
    url: ''
};

let action = {
    type: INDEX_SUCCESS,
    data: {
        test: "test"
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

