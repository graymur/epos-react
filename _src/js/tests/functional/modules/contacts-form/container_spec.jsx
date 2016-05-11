import { validationClass, ContactsForm } from 'shared/modules/contacts-form/container.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { assert } from 'chai';
import $ from 'jquery';

let submitCalls = 0;

const defaultState = {
    fields: {
        name: {},
        email: {},
        phone: {},
        message: {}
    },
    contactsForm: {
        submitting: false
    },
    handleSubmit: fn => fn('submit'),
    onSubmit: () => {
        return () => submitCalls++;
    }
};

function render(state) {
    let component = ReactTestUtils.renderIntoDocument(
        <ContactsForm {...state}/>
    );

    return $(ReactDOM.findDOMNode(component));
}

describe('ContactsForm', () => {
    it('renders form', () => {
        let el = render(defaultState);
        assert.equal(el.find('.form__row').length, 5);
    });

    it('invalidates fields', () => {
        let state = Object.assign({}, defaultState, {
            fields: {
                name: { touched: true, valid: false }
            }
        });

        let el = render(state);

        assert.equal(el.find('._invalid').length, 1);
    });

    it('calls submit hander', () => {
        let el = render(defaultState);

        submitCalls = 0;

        ReactTestUtils.Simulate.submit(el.find('form').get(0));

        assert.equal(submitCalls, 1);
    });
});
