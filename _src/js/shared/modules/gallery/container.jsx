import React from 'react';
import { connect } from 'react-redux';
import { fetchGalleryAction } from './actions.js';

import Gallery from './components/Gallery.jsx';

class GalleryContainer extends React.Component {
    componentWillMount() {
        this.fetchIfNeeded(this.props);
    }

    componentWillReceiveProps(props) {
        this.fetchIfNeeded(props);
    }

    fetchIfNeeded(props, force = false) {
        if (!props.gallery.title || props.location.pathname !== this.props.location.pathname || this.props.gallery.lang !== props.params.lang || force) {
            this.constructor.fetch({ dispatch: props.dispatch, lang: props.params.lang });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.gallery.title !== this.props.gallery.title;
    }

    static fetch({ dispatch, lang }) {
        return dispatch(fetchGalleryAction(lang));
    }

    render() {
        return <Gallery gallery={this.props.gallery} />;
    }
}

const mapStateToProps = state => ({
    gallery: state.gallery
});

export default connect(mapStateToProps)(GalleryContainer);