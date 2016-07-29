import { fetchSpeakersAction } from 'shared/modules/speakers/actions.js';

import {assert} from 'chai';

describe('fetchSpeakersAction', () => {
    it('returns correct action', () => {
        let action = fetchSpeakersAction('en');

        assert.equal(action.endpoint, 'speakers');
        assert.equal(action.lang, 'en');
    });
});