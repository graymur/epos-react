import React from 'react';
import getDangerousHtml from '../../../util/get-dangerous-html.js';

const Item = ({ speaker }) => {
    return (
        <li className="speakers__list__item">
            <div className="speakers__list__item__image">
                <img src={speaker.image} alt={speaker.name}/>
            </div>
            <div className="speakers__list__item__content">
                <h3 className="speakers__list__item__title">{speaker.name}</h3>
                <h5 className="speakers__list__item__position">{speaker.position}</h5>
                <article className="speakers__list__item__text">
                    <div className="page__content" dangerouslySetInnerHTML={ getDangerousHtml(speaker.content) }></div>
                </article>
            </div>
        </li>
    );
};

export default Item;