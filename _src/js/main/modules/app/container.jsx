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

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.location.pathname !== this.props.location.pathname;
    }

    render() {
        return <App {...this.props} activeLink={this.props.location.pathname.split('/')[2]}/>;
    }
}

const mapStateToProps = (state) => {
    return {
        meta: state.meta
    }
};

export default connect(mapStateToProps, null)(AppContainer);