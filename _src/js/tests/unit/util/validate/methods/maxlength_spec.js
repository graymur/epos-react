import {assert} from 'chai';
import maxlength from 'shared/util/validate/methods/maxlength.js';

describe('Should validate maxlength', () => {
    it('validates', () => {
        assert.equal(maxlength('graymur@mail.ru', { data: 20 }), true);
    });

    it('invalidates', () => {
        assert.equal(maxlength('1234567890', { data: 5 }), false);
    });
});