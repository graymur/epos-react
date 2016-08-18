import React from 'react';
import Item from './Item.jsx';
import PageLayout from '../../../components/PageLayout.jsx';
import getDangerousHtml from '../../../util/get-dangerous-html.js';

export default class Gallery extends React.PureComponent {
    render() {
        const { gallery: { title, content, galleries } } = this.props;

        if (galleries.length === 0) return <span></span>;

        return (
            <PageLayout title={title}>
                <div dangerouslySetInnerHTML={getDangerousHtml(content)} />
                <div className="gallery">
                    {galleries.map(gallery => <Item key={gallery.title} gallery={gallery} />)}
                </div>
            </PageLayout>
        );
    }
}