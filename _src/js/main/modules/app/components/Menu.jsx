import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Menu = ({items, currentLanguage, activeLink}) => {
    return (
        <ul className="main-menu">
            {items.map(item => <MenuItem key={item.link} lang={currentLanguage} active={item.link === activeLink} {...item}/>)}
        </ul>
    );
};

const MenuItem = ({ lang, active, link, title }) =>
    active ?
        <li className="main-menu__item main-menu__item--active"><span>{title}</span></li> :
        <li className="main-menu__item"><Link to={'/' + lang + '/' + link }>{title}</Link></li>;

export default Menu;