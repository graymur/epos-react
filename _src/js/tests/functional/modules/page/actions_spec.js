import { fetchPageAction } from 'shared/modules/page/actions.js';

import {assert} from 'chai';

describe('fetchPageAction', () => {
    it('returns correct action', () => {
        let action = fetchPageAction('en', 'test');

        assert.equal(action.endpoint, 'page');
        assert.equal(action.payload.pageName, 'test');
        assert.equal(action.lang, 'en');
    });
});