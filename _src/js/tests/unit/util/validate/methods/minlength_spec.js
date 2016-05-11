import {assert} from 'chai';
import minlength from 'shared/util/validate/methods/minlength.js';

describe('Should validate minlength', () => {
    it('validates', () => {
        assert.equal(minlength('graymur@mail.ru', { data: 10 }), true);
    });

    it('invalidates', () => {
        assert.equal(minlength('1234567890', { data: 50 }), false);
    });
});