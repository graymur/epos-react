import React from 'react';
import { Link } from 'react-router';

const PageLayout = props => {
    return (
        <div className="page">
            <section className="centering">
                <span className="page__close"><Link to="/" /></span>
                {props.title ? <h2 className="page-title">{props.title}</h2> : null}
                {props.children}
            </section>
        </div>
    );
};

export default PageLayout;