import {assert} from 'chai';
import required from '../../../../../shared/util/validate/methods/required.js';

describe('Should validate require', () => {
    it('validates', () => {
        assert.equal(required('some value'), true);
    });

    it('invalidates', () => {
        assert.equal(required(''), false);
    });
});