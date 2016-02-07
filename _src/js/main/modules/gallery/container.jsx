import React from 'react';
import { connect } from 'react-redux';
import { fetchGalleryAction } from './actions.js';

import Gallery from './components/Gallery.jsx';

class GalleryContainer extends React.Component {
    componentDidMount() {
        this.fetch(this.props, true);
    }

    componentWillReceiveProps(props) {
        this.fetch(props);
    }

    fetch(props, force = false) {
        if (props.location.pathname !== this.props.location.pathname || force) {
            this.props.dispatch(fetchGalleryAction(props.params.lang));
        }
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