import { validationClass, ContactsForm } from 'shared/modules/contacts-form/container.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';
import $ from 'jquery';

chai.use(spies);

const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;
const submitHandler = () => {};
const submitHandlerSpy = chai.spy(submitHandler);

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
    onSubmit: submitHandlerSpy
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

        ReactTestUtils.Simulate.submit(el.find('form').get(0));

        submitHandlerSpy.should.have.been.called();
    });
});
