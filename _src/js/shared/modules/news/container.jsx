import React from 'react';
import { connect } from 'react-redux';
import { fetchNewsAction } from './actions.js';

import List from './components/List.jsx';

class NewsContainer extends React.Component {
    componentWillMount() {
        this.fetchIfNeeded(this.props);
    }

    componentWillReceiveProps(props) {
        this.fetchIfNeeded(props);
    }

    fetchIfNeeded(props, force = false) {
        if (!props.news.title || props.location.pathname !== this.props.location.pathname || this.props.news.lang !== props.params.lang || force) {
            this.constructor.fetch({ dispatch: props.dispatch, lang: props.params.lang });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.news.title !== this.props.news.title;
    }

    static fetch({ dispatch, lang }) {
        return dispatch(fetchNewsAction(lang));
    }

    render() {
        return <List news={this.props.news} />;
    }
}

const mapStateToProps = state => ({
    news: state.news
});

export default connect(mapStateToProps)(NewsContainer);