import React from 'react';
import { connect } from 'react-redux';
import { fetchIndexAction } from './actions.js';

import Index from './components/Index.jsx';

class IndexContainer extends React.Component {
    componentDidMount() {
        this.fetch(this.props);
    }

    componentWillReceiveProps(props) {
        if (props.location.pathname !== this.props.location.pathname) {
            this.fetch(props);
        }
    }

    fetch(props) {
        this.props.dispatch(fetchIndexAction(props.params.lang));
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