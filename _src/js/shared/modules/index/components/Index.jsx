import React from 'react';
import { Link } from 'react-router';

export default class Index extends React.PureComponent {
    render() {
        const { items, lang } = this.props;

        if (!items || !items.length) return <span></span>;
        return (
            <div className="page page--main-page">
                <nav className="main-page__list">
                    {items.map((item, index) => <IndexItem key={index} {...item} lang={lang} />)}
                </nav>
            </div>
        );
    }
}

class IndexItem extends React.PureComponent {
    render() {
        const { title, link, lang } = this.props;

        return <span className="main-page__list__item"><Link to={'/' + lang + '/' + link}>{title}</Link></span>;
    }
}