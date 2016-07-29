import * as constants from 'shared/modules/contacts/constants.js';
import reducer from 'shared/modules/contacts/reducer.js';

import {assert} from 'chai';

let initialState = {
    title: '',
    content: '',
    url: ''
};

let action = {
    type: constants.CONTACTS_SUCCESS,
    data: {
        test: "test"
    }
};

describe('Contacts reduces', () => {
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

