import {assert} from 'chai';
import regexp from 'shared/util/validate/methods/regexp.js';

describe('Should validate regexp', () => {
    it('validates', () => {
        assert.equal(regexp('111', { data: /^\d+$/ }), true);
    });

    it('invalidates', () => {
        assert.equal(regexp('111', { data: /^[^\d]+$/ }), false);
    });
});