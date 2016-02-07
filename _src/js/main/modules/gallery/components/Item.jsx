import React from 'react';
import Image from './Image.jsx';
import getDangerousHtml from '../../../util/get-dangerous-html.js';

const Item = ({ gallery }) => {
    return (
        <section className="gallery__section">
            <h3 className="gallery__section__title">{gallery.title}</h3>
            <div className="gallery__section__previews">
                {gallery.images.map(image => <Image key={image} source={image}/>)}
            </div>
            <div className="gallery__section__text" dangerouslySetInnerHTML={ getDangerousHtml(gallery.content) }></div>
        </section>
    );
};

export default Item;