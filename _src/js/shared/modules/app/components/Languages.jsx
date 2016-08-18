import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class Languages extends React.PureComponent {
    //shouldComponentUpdate(nextProps) {
    //    return this.props.currentLanguage !== nextProps.currentLanguage;
    //}

    render() {
        return (
            <ul className="lang-menu">
                {this.props.items.map(item => <LanguageItem key={item.code} active={item.code === this.props.currentLanguage} {...item} />)}
            </ul>
        );
    }
}

class LanguageItem extends React.PureComponent {
    render() {
        let { active, code, title } = this.props;

        return (
            active
                ? <li className="lang-menu__item lang-menu__item--active"><span>{code}</span></li>
                : <li className="lang-menu__item"><Link to={'/' + code}>{code}</Link></li>
        );
    }
}
