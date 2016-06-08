import * as constants from 'shared/modules/page/constants.js';
import reducer from 'shared/modules/page/reducer.js';

import {assert} from 'chai';

let initialState = {
    title: '',
    content: '',
    url: ''
};

let action = {
    type: constants.PAGE_SUCCESS,
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

