import React from 'react';
import Image from '../../../components/Image/Image.jsx';
import getDangerousHtml from '../../../util/get-dangerous-html.js';

export default class Item extends React.PureComponent {
    render() {
        const { item } = this.props;

        return (
            <section className="news__item">
                {item.title.length > 0
                    ? <h3 className="news__item__title">{item.title}</h3>
                    : null}
                <h4 className="news__item__section">{item.sectionTitle}</h4>
                {item.images.length > 0
                    ? (<div className="news__item__previews">
                    {item.images.map((image, index) => <Image key={image + index} source={image} />)}
                </div>)
                    : null}
                <div className="news__item__text" dangerouslySetInnerHTML={getDangerousHtml(item.content)}></div>
            </section>
        );
    }
}