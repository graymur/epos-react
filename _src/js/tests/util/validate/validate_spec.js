import {assert} from 'chai';
import { createValidator, normalizeRules, normalizeRule } from 'shared/util/validate/validate.js';

describe('Create validate function', () => {
    it('normalizes rules', () => {
        let normalized;

        normalized = normalizeRules('required');
        assert.deepEqual(normalized, {
            required: {
                data: true,
                message: 'Wrong value'
            }
        });

        normalized = normalizeRules({ required: 'This field is required' });
        assert.deepEqual(normalized, { required: { message: 'This field is required' }});

        normalized = normalizeRules({ email: 'Wrong email' });
        assert.deepEqual(normalized, { email: { message: 'Wrong email' }});

        normalized = normalizeRules({ email: { message: 'Wrong email' }});
        assert.deepEqual(normalized, { email: { message: 'Wrong email' }});

        normalized = normalizeRules({ regexp: { data: /^\d{5,}$/ }});
        assert.deepEqual(normalized, {
            regexp: {
                data: /^\d{5,}$/,
                message: 'Wrong value'
            }
        });
    });

    it('validates', () => {
        let result;

        const rules = {
            name: "required",
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                regexp: {
                    "data": /^\d{5,}$/
                }
            },
            message: "required"
        };

        const validator = createValidator(rules);

        result = validator({
            name: 'John Doe'
        });

        assert.deepEqual(result, {
            email: 'Wrong value',
            phone: 'Wrong value',
            message: 'Wrong value'
        });

        //////////////////////////////

        result = validator({
            name: 'John Doe',
            email: '1234'
        });

        assert.deepEqual(result, {
            email: 'Wrong value',
            phone: 'Wrong value',
            message: 'Wrong value'
        });

        //////////////////////////////

        result = validator({
            name: 'John Doe',
            email: 'graymur@mail.ru'
        });

        assert.deepEqual(result, {
            phone: 'Wrong value',
            message: 'Wrong value'
        });

        //////////////////////////////

        result = validator({
            name: 'John Doe',
            email: 'graymur@mail.ru',
            phone: 'abc'
        });

        assert.deepEqual(result, {
            phone: 'Wrong value',
            message: 'Wrong value'
        });

        //////////////////////////////

        result = validator({
            name: 'John Doe',
            email: 'graymur@mail.ru',
            phone: '5555555'
        });

        assert.deepEqual(result, {
            message: 'Wrong value'
        });

        //////////////////////////////

        result = validator({
            name: 'John Doe',
            email: 'graymur@mail.ru',
            phone: '5555555',
            message: 'message'
        });

        assert.deepEqual(result, {});
    });
});

