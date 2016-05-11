import Contacts from 'shared/modules/contacts/components/Contacts.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { assert } from 'chai';
import $ from 'jquery';

const state = {
    title: '',
    content: '<div id="test">Test content</div>'
};

describe('Contacts', () => {
    it ('Renders text', () => {
        let component = ReactTestUtils.renderIntoDocument(<div><Contacts contacts={state}/></div>);
        let el = $(ReactDOM.findDOMNode(component));

        assert.equal(el.find('#test').text(), 'Test content');
    });
});
