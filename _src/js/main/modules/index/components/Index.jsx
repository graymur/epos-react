import React from 'react';
import { Link } from 'react-router';

const IndexItem = ({title, link, lang }) => {
    return <span className="main-page__list__item"><Link to={'/' + lang + '/' + link }>{title}</Link></span>;
};

const Index = ({ index, lang }) => {
    return (
        <div className="page page--main-page">
            <nav className="main-page__list">
                { index.map((item, index) => <IndexItem key={index} {...item} lang={lang} />) }
            </nav>
        </div>
    );
};

export default Index;