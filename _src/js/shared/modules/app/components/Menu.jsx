import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class Menu extends React.Component {
    render() {
        return (
            <ul className="main-menu">
                {this.props.items.map(item => <MenuItem key={item.link} lang={this.props.currentLanguage} active={item.link === this.props.activeLink} {...item} />)}
            </ul>
        );
    }
}

class MenuItem extends React.PureComponent {
    render() {
        let { lang, active, link, title } = this.props;

        return (
            active
                ? <li className="main-menu__item main-menu__item--active"><span>{title}</span></li>
                : <li className="main-menu__item"><Link to={'/' + lang + '/' + link}>{title}</Link></li>
        );
    }
}
