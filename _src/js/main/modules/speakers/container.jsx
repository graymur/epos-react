import React from 'react';
import { connect } from 'react-redux';
import { fetchSpeakersAction } from './actions.js';

import Speakers from './components/Speakers.jsx';

class SpeakersContainer extends React.Component {
    componentDidMount() {
        this.fetch(this.props, true);
    }

    componentWillReceiveProps(props) {
        this.fetch(props);
    }

    fetch(props, force = false) {
        if (props.location.pathname !== this.props.location.pathname || force) {
            this.props.dispatch(fetchSpeakersAction(props.params.lang));
        }
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