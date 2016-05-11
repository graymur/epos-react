import { fetchIndexAction } from 'shared/modules/index/actions.js';

import {assert} from 'chai';

describe('fetchIndexAction', () => {
    it('returns correct action', () => {
        let action = fetchIndexAction('en');

        assert.equal(action.endpoint, 'index');
        assert.equal(action.lang, 'en');
    });
});