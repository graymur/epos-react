import React from 'react';
import Item from './Item.jsx';
import PageLayout from '../../../components/PageLayout.jsx';
import getDangerousHtml from '../../../util/get-dangerous-html.js';

const Gallery = ({ gallery }) => {
    if (gallery.galleries.length === 0) return <span></span>;

    return (
        <PageLayout title={gallery.title}>
            <div dangerouslySetInnerHTML={getDangerousHtml(gallery.content)} />
            <div className="gallery">
                {gallery.galleries.map(gallery => <Item key={gallery.title} gallery={gallery} />)}
            </div>
        </PageLayout>
    );
};

export default Gallery;