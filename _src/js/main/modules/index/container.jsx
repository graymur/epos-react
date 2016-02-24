import React from 'react';
import { connect } from 'react-redux';
import { fetchIndexAction } from './actions.js';
import Index from './components/Index.jsx';

class IndexContainer extends React.Component {
    componentWillMount() {
        this.fetchIfNeeded(this.props);
    }

    componentWillReceiveProps(props) {
        if (props.location.pathname !== this.props.location.pathname) {
            this.fetchIfNeeded(props);
        }
    }

    fetchIfNeeded(props) {
        this.constructor.fetch(props.dispatch, props.params.lang)
    }

    static fetch(dispatch, lang) {
        return dispatch(fetchIndexAction(lang));
    }

    render() {
        return <Index index={this.props.index} lang={this.props.params.lang}/>
    }
}

const mapStateToProps = (state) => {
    return {
        index: state.index
    }
};

export default connect(mapStateToProps)(IndexContainer);