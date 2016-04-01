import React from 'react';
import { connect } from 'react-redux';
import { fetchPageAction } from './actions.js';
import Page from './components/Page.jsx';

const dv = console.log.bind(console);

class PageContainer extends React.Component {
    componentWillMount() {
        this.fetchIfNeeded(this.props);
    }

    componentWillReceiveProps(props) {
        this.fetchIfNeeded(props);
    }

    fetchIfNeeded(props) {
        if (this.props.page.lang !== props.params.lang || props.page.title !== this.props.page.title || this.props.params.splat !== props.params.splat || !this.props.page.title) {
            this.constructor.fetch({
                dispatch: props.dispatch,
                lang: props.params.lang,
                splat: props.params.splat
            });
        }
    }

    static fetch({ dispatch, lang, splat }) {
        return dispatch(fetchPageAction(lang, splat));
    }

    render() {
        return this.props.page.title ? <Page page={this.props.page}/> : <span></span>;
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.page
    }
};

export default connect(mapStateToProps)(PageContainer);