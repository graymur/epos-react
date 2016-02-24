import React from 'react';
import { connect } from 'react-redux';
import { fetchGalleryAction } from './actions.js';

import Gallery from './components/Gallery.jsx';

class GalleryContainer extends React.Component {
    componentWillMount() {
        this.fetchIfNeeded(this.props, true);
    }

    componentWillReceiveProps(props) {
        this.fetchIfNeeded(props);
    }

    fetchIfNeeded(props, force = false) {
        if (props.location.pathname !== this.props.location.pathname || force) {
            this.constructor.fetch(props.dispatch, props.params.lang);
        }
    }

    static fetch(dispatch, lang = 'en') {
        return dispatch(fetchGalleryAction(lang));
    }

    render() {
        return <Gallery gallery={this.props.gallery}/>;
    }
}

const mapStateToProps = (state) => {
    return {
        gallery: state.gallery
    }
};

export default connect(mapStateToProps)(GalleryContainer);