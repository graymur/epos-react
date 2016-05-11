import Index from 'shared/modules/index/components/Index.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { assert } from 'chai';
import $ from 'jquery';

const state = {
    'items': [{
        title: 'Item1',
        link: 'link1'
    }, {
        title: 'Item2',
        link: 'link2'
    }, {
        title: 'Item3',
        link: 'link3'
    }]
};

describe('Index', () => {
    it ('Renders items', () => {
        let component = ReactTestUtils.renderIntoDocument(<div><Index index={state}/></div>);
        let el = $(ReactDOM.findDOMNode(component));

        assert.equal(el.find('.main-page__list__item').length, 3);

        [0,1,2].forEach(index => {
            assert.equal(el.find('.main-page__list__item').eq(index).find('A').text(), state.items[index].title);
        });
    });
});
