import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class Menu extends React.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.items !== nextProps.items || this.props.activeLink !== nextProps.activeLink;
    }

    render() {
        return (
            <ul className="main-menu">
                {this.props.items.map(item => <MenuItem key={item.link} lang={this.props.currentLanguage} active={item.link === this.props.activeLink} {...item} />)}
            </ul>
        );
    }
}

const MenuItem = ({ lang, active, link, title }) =>
    active
        ? <li className="main-menu__item main-menu__item--active"><span>{title}</span></li>
        : <li className="main-menu__item"><Link to={'/' + lang + '/' + link}>{title}</Link></li>;
