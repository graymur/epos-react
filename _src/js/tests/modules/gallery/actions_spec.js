import { fetchGalleryAction } from 'shared/modules/gallery/actions.js';

import {assert} from 'chai';

describe('fetchGalleryAction', () => {
    it('returns correct action', () => {
        let action = fetchGalleryAction('en');

        assert.equal(action.endpoint, 'gallery');
        assert.equal(action.lang, 'en');
    });
});