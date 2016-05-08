import {assert} from 'chai';
import email from 'shared/util/validate/methods/email.js';

describe('Should validate email', () => {
    it('validates', () => {
        assert.equal(email('graymur@mail.ru'), true);
    });

    it('invalidates', () => {
        assert.equal(email('111'), false);
    });
});