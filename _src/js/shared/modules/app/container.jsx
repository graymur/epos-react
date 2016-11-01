import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions.js';

import App from './components/App.jsx';

class AppContainer extends React.Component {
    componentWillMount() {
        const { menu } = this.props.meta;
        if (!menu) {
            this.props.dispatch(actions.fetchMetaAction(this.props.params.lang));
        }
    }

    componentWillReceiveProps(props) {
        if (props.params.lang !== this.props.params.lang) {
            this.props.dispatch(actions.fetchMetaAction(props.params.lang));
        }

        if (this.props.meta.error && props.location.pathname !== this.props.location.pathname) {
            this.props.dispatch(actions.clearErrorAction());
        }
    }

    getChildContext() {
        return {
            asyncLoading: this.props.meta.asyncLoading && !this.props.meta.error,
            activeLink: this.props.location.pathname.split('/')[2]
        };
    }

    render() {
        const { menu } = this.props.meta;
        return menu ? <App {...this.props} asyncLoading={this.getChildContext().asyncLoading} activeLink={this.getChildContext().activeLink} /> : null;
    }
}

AppContainer.childContextTypes = {
    asyncLoading: React.PropTypes.bool,
    activeLink: React.PropTypes.string
};

const mapStateToProps = (state) => ({
    meta: state.meta
});

export default connect(mapStateToProps, null)(AppContainer);