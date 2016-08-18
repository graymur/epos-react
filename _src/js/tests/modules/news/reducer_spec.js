import * as constants from 'shared/modules/news/constants.js';
import reducer from 'shared/modules/news/reducer.js';
import { assert } from 'chai';

const initialState = {
    title: '',
    content: '',
    url: '',
    news: []
};

let action = {
    type: constants.NEWS_SUCCESS,
    data: {
        title: 'news',
        content: 'content',
        url: 'http://google.com',
        news: [1, 2, 3, 4]
    }
};

describe('News reducer', () => {
    it('returns correct state', () => {
        let state = reducer(initialState, action);

        assert.deepEqual(state, {
            title: 'news',
            content: 'content',
            url: 'http://google.com',
            news: [1, 2, 3, 4]
        });
    });

    it('does not modify original state', () => {
        let state = reducer(initialState, action);

        assert.deepEqual(initialState, {
            title: '',
            content: '',
            url: '',
            news: []
        });
    });
});

