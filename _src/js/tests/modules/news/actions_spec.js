import { fetchNewsAction } from 'shared/modules/news/actions.js';

import { assert } from 'chai';

describe('fetchGalleryAction', () => {
    it('returns correct action', () => {
        let action = fetchNewsAction('en');

        assert.equal(action.endpoint, 'news');
        assert.equal(action.lang, 'en');
    });
});