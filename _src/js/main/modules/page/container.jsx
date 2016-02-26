import React from 'react';
import { connect } from 'react-redux';
import { fetchPageAction } from './actions.js';

import Page from './components/Page.jsx';

class PageContainer extends React.Component {
    componentWillMount() {
        this.fetchIfNeeded(this.props);
    }

    componentWillReceiveProps(props) {
        if (this.props.params.splat !== props.params.splat) {
            this.fetchIfNeeded(props);
        }
    }

    fetchIfNeeded(props) {
        this.constructor.fetch({
            dispatch: props.dispatch,
            lang: props.params.lang,
            splat: props.params.splat
        });
    }

    static fetch({ dispatch, lang, splat }) {
        return dispatch(fetchPageAction(lang, splat));
    }

    render() {
        return <Page page={this.props.page}/>
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.page
    }
};

export default connect(mapStateToProps)(PageContainer);