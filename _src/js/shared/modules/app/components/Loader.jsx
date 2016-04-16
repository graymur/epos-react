import React from 'react';

export default class Loader extends React.Component {
    getClass() {
        let loaderClassName = ['loading'];

        if (this.props.asyncLoading) {
            loaderClassName.push('_active');
        }

        return loaderClassName.join(' ');
    }

    render() {
        return (
            <div className={this.getClass()}></div>
        )
    }
}