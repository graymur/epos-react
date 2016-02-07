import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Languages = ({ items, currentLanguage }) => {
    return (
        <ul className="lang-menu">
            {items.map(item => <LanguageItem key={item.code} active={item.code === currentLanguage} {...item}/>)}
        </ul>
    );
};

const LanguageItem = ({ active, code, title }) =>
    active ?
        <li className="lang-menu__item lang-menu__item--active"><span>{code}</span></li> :
        <li className="lang-menu__item"><Link to={'/' + code }>{code}</Link></li>;

export default Languages;