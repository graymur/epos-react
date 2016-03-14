import { fetchGalleryAction } from '../../../../main/modules/gallery/actions.js';

import React from 'react/addons';
import {assert} from 'chai';

describe('fetchGalleryAction', () => {
    it('returns correct action', () => {
        let action = fetchGalleryAction('en');

        assert.equal(action.endpoint, 'gallery');
        assert.equal(action.lang, 'en');
    });
});