import React from 'react';
import { connect } from 'react-redux';
import { fetchSpeakersAction } from './actions.js';
import Speakers from './components/Speakers.jsx';

class SpeakersContainer extends React.Component {
    componentWillMount() {
        this.fetchIfNeeded(this.props);
    }

    componentWillReceiveProps(props) {
        this.fetchIfNeeded(props);
    }

    fetchIfNeeded(props, force) {
        if (!props.speakers.title || props.location.pathname !== this.props.location.pathname || this.props.speakers.lang !== props.params.lang || force) {
            this.constructor.fetch({ dispatch: props.dispatch, lang: props.params.lang });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.speakers.title !== this.props.speakers.title;
    }

    static fetch({ dispatch, lang }) {
        return dispatch(fetchSpeakersAction(lang));
    }

    render() {
        return <Speakers speakers={this.props.speakers} />;
    }
}

const mapStateToProps = state => ({
    speakers: state.speakers
});

export default connect(mapStateToProps)(SpeakersContainer);
