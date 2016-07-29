import { fetchContactsAction } from 'shared/modules/contacts/actions.js';

import {assert} from 'chai';

describe('fetchContactsAction', () => {
    it('returns correct action', () => {
        let action = fetchContactsAction('en');

        assert.equal(action.endpoint, 'contacts');
        assert.equal(action.lang, 'en');
    });
});