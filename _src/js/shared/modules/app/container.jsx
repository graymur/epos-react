import React from 'react';
import { connect } from 'react-redux';
import { fetchMetaAction } from './actions.js';

import App from './components/App.jsx';

class AppContainer extends React.Component {
    componentWillReceiveProps(props) {
        if (props.params.lang !== this.props.params.lang) {
            this.props.dispatch(fetchMetaAction(props.params.lang));
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
    asyncLoading: React.PropTypes.bool.isRequired,
    activeLink: React.PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return {
        meta: state.meta
    }
};

export default connect(mapStateToProps, null)(AppContainer);