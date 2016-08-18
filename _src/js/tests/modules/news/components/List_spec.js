import List from 'shared/modules/news/components/List.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { assert } from 'chai';
import $ from 'jquery';

describe('List', () => {
    it('return empty SPAN if no news are provided', () => {
        let state = {
            news: []
        };

        let component = ReactTestUtils.renderIntoDocument(<div><List news={state}/></div>);
        let el = ReactDOM.findDOMNode(component).children[0];

        assert.equal(el.tagName, 'SPAN');
    });

    it('renders news', () => {
        let state = {
            title: 'News title',
            content: '',
            news: [{
                title: 'First news post',
                sectionTitle: 'First news post section',
                images: ['1.jpg','2.jpg','3.jpg'],
                content: 'First news post text'
            }, {
                title: 'Second news post',
                sectionTitle: 'Second news post section',
                images: ['4.jpg','5.jpg','6.jpg','7.jpg'],
                content: 'Second news post description'
            }]
        };

        let component = ReactTestUtils.renderIntoDocument(<div><List news={state}/></div>);
        let el = $(ReactDOM.findDOMNode(component));

        assert.equal(el.find('h2').text(), state.title);
        assert.equal(el.find('.news__item').length, 2);

        state.news.forEach((item, index) => {
            let element = el.find('.news__item').eq(index);

            assert.equal(element.find('.news__item__title').text(), item.title);
            assert.equal(element.find('.news__item__previews IMG').length, item.images.length);
        });
    });
});
