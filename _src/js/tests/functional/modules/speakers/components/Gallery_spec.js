import Gallery from 'shared/modules/gallery/components/Gallery.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { assert } from 'chai';
import $ from 'jquery';

describe('Gallery', () => {
    it('return empty SPAN if no galleries are provided', () => {
        let state = {
            galleries: []
        };

        let component = ReactTestUtils.renderIntoDocument(<div><Gallery gallery={state}/></div>);
        let el = ReactDOM.findDOMNode(component).children[0];

        assert.equal(el.tagName, 'SPAN');
    });

    it('renders galleries', () => {
        let state = {
            title: 'Galleries title',
            content: '',
            galleries: [{
                title: 'First gallery',
                images: ['1.jpg','2.jpg','3.jpg'],
                content: 'First gallery description'
            }, {
                title: 'Second gallery',
                images: ['4.jpg','5.jpg','6.jpg','7.jpg'],
                content: 'Second gallery description'
            }]
        };

        let component = ReactTestUtils.renderIntoDocument(<div><Gallery gallery={state}/></div>);
        let el = $(ReactDOM.findDOMNode(component));

        assert.equal(el.find('h2').text(), state.title);
        assert.equal(el.find('.gallery__section').length, 2);

        [0, 1].forEach((index) => {
            assert.equal(el.find('.gallery__section').eq(index).find('.gallery__section__title').text(), state.galleries[index].title);
            assert.equal(el.find('.gallery__section').eq(index).find('.gallery__section__previews IMG').length, state.galleries[index].images.length);
        });
    });
});
