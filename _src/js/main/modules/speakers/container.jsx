import React from 'react';
import { connect } from 'react-redux';
import { fetchSpeakersAction } from './actions.js';

import Speakers from './components/Speakers.jsx';

class SpeakersContainer extends React.Component {
    componentWillMount() {
        this.fetchIfNeeded(this.props, true);
    }

    componentWillReceiveProps(props) {
        this.fetchIfNeeded(props);
    }

    fetchIfNeeded(props, force) {
        if (force || props.location.pathname !== this.props.location.pathname) {
            this.constructor.fetch(props.dispatch, props.params.lang);
        }
    }

    static fetch(dispatch, lang) {
        return dispatch(fetchSpeakersAction(lang));
    }

    render() {
        return <Speakers speakers={this.props.speakers}/>
    }
}

const mapStateToProps = (state) => {
    return {
        speakers: state.speakers
    }
};

export default connect(mapStateToProps)(SpeakersContainer);
