import React from 'react';
import { connect } from 'react-redux';
import { fetchMetaAction, clearErrorAction } from './actions.js';

import App from './components/App.jsx';

class AppContainer extends React.Component {
    componentWillReceiveProps(props) {
        if (props.params.lang !== this.props.params.lang) {
            this.props.dispatch(fetchMetaAction(props.params.lang));
        }

        if (this.props.meta.error && props.location.pathname !== this.props.location.pathname) {
            this.props.dispatch(clearErrorAction());
        }
    }

    getChildContext() {
        return {
            asyncLoading: this.props.meta.asyncLoading && !this.props.meta.error,
            activeLink: this.props.location.pathname.split('/')[2]
        };
    }

    render() {
        return <App {...this.props} asyncLoading={this.getChildContext().asyncLoading} activeLink={this.getChildContext().activeLink}/>;
    }
}

AppContainer.childContextTypes = {
    asyncLoading: React.PropTypes.bool,
    activeLink: React.PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        meta: state.meta
    }
};

export default connect(mapStateToProps, null)(AppContainer);