import React from 'react';

export default class Loader extends React.PureComponent {
    getClass() {
        let loaderClassName = ['loading'];

        if (this.props.asyncLoading) {
            loaderClassName.push('_active');
        }

        return loaderClassName.join(' ');
    }

    render() {
        return (
            <div className={this.getClass()}>{/*this.props.location.pathname*/}</div>
        );
    }
}