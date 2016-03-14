import PageLayout from '../../../main/components/PageLayout.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { assert } from 'chai';
//const Simulate = ReactTestUtils.Simulate;
import $ from 'jquery';

describe('PageLayout', () => {
    it('renders', () => {
        let component = ReactTestUtils.renderIntoDocument(<div><PageLayout title="Some title"/></div>);
        let el = $(ReactDOM.findDOMNode(component));

        assert.equal(el.find('h2').text(), 'Some title');
    });
});
