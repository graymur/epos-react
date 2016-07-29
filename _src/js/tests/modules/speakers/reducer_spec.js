import * as constants from 'shared/modules/speakers/constants.js';
import reducer from 'shared/modules/speakers/reducer.js';

import {assert} from 'chai';

let initialState = {
    title: '',
    content: '',
    url: '',
    speakers: []
};

let action = {
    type: constants.SPEAKERS_SUCCESS,
    data: {
        title: 'speakers',
        content: 'content',
        url: 'http://google.com',
        speakers: [1, 2, 3, 4]
    }
};

describe('Galleries reduces', () => {
    it('returns correct state', () => {
        let state = reducer(initialState, action);

        assert.deepEqual(state, {
            title: 'speakers',
            content: 'content',
            url: 'http://google.com',
            speakers: [1, 2, 3, 4]
        });
    });

    it('does not modify original state', () => {
        let state = reducer(initialState, action);

        assert.deepEqual(initialState, {
            title: '',
            content: '',
            url: '',
            speakers: []
        });
    });
});

