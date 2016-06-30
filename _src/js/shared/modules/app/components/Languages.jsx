import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class Languages extends React.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.currentLanguage !== nextProps.currentLanguage;
    }

    render() {
        console.log('render');
        return (
            <ul className="lang-menu">
                {this.props.items.map(item => <LanguageItem key={item.code} active={item.code === this.props.currentLanguage} {...item}/>)}
            </ul>
        );
    }
}

const LanguageItem = ({ active, code, title }) =>
    active ?
        <li className="lang-menu__item lang-menu__item--active"><span>{code}</span></li> :
        <li className="lang-menu__item"><Link to={'/' + code }>{code}</Link></li>;
