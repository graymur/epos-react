import Speakers from 'shared/modules/speakers/components/Speakers.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { assert } from 'chai';
import $ from 'jquery';

describe('Speakers', () => {
    it('renders speakers', () => {
        let state = {
            title: 'Speakers title',
            content: '',
            speakers: [{
                name: 'Name1',
                position: 'Position1',
                image: '1.jpg',
                content: 'Content1'
            },{
                name: 'Name2',
                position: 'Position2',
                image: '2.jpg',
                content: 'Content2'
            }]
        };

        let component = ReactTestUtils.renderIntoDocument(<div><Speakers speakers={state}/></div>);
        let el = $(ReactDOM.findDOMNode(component));

        assert.equal(el.find('h2').text(), state.title);
        assert.equal(el.find('.speakers__list__item').length, state.speakers.length);

        state.speakers.forEach((speaker, index) => {
            let element = el.find('.speakers__list__item').eq(index);

            assert.equal(element.find('.speakers__list__item__image IMG').attr('src'), speaker.image);
            assert.equal(element.find('.speakers__list__item__title').text(), speaker.name);
            assert.equal(element.find('.speakers__list__item__position').text(), speaker.position);
            assert.equal(element.find('.speakers__list__item__text').text(), speaker.content);
        });
    });
});
