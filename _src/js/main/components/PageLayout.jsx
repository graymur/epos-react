import React from 'react';
import { Link } from 'react-router';

export default class PageLayout extends React.Component {
    render() {
        return (
            <div className="page">
                <section className="centering">
                    <span className="page__close"><Link to="/"></Link></span>
                    {this.props.title ? <h2 className="page-title">{this.props.title}</h2> : null}
                    {this.props.children}
                </section>
            </div>
        );
    }
}