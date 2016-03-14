import { GALLERY_REQUEST, GALLERY_SUCCESS, GALLERY_FAILURE } from '../../../../main/modules/gallery/actions.js';
import reducer from '../../../../main/modules/gallery/reducer.js';

import React from 'react/addons';
import {assert} from 'chai';

let initialState = {
    title: '',
    content: '',
    url: '',
    galleries: []
};

let action = {
    type: GALLERY_SUCCESS,
    data: {
        title: 'gallery',
        content: 'content',
        url: 'http://google.com',
        galleries: [1, 2, 3, 4]
    }
};

describe('Galleries reduces', () => {
    it('returns correct state', () => {
        let state = reducer(initialState, action);

        assert.deepEqual(state, {
            title: 'gallery',
            content: 'content',
            url: 'http://google.com',
            galleries: [1, 2, 3, 4]
        });
    });

    it('does not modify original state', () => {
        let state = reducer(initialState, action);

        assert.deepEqual(initialState, {
            title: '',
            content: '',
            url: '',
            galleries: []
        });
    });
});

