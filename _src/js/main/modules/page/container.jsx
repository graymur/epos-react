import React from 'react';
import { connect } from 'react-redux';
import { fetchPageAction } from './actions.js';

import Page from './components/Page.jsx';

class PageContainer extends React.Component {
    componentDidMount() {
        this.fetch(this.props);
    }

    componentWillReceiveProps(props) {
        if (this.props.params.splat !== props.params.splat) {
            this.fetch(props);
        }
    }

    fetch(props) {
        //console.log(this.props);
        this.props.dispatch(fetchPageAction(props.params.lang, props.params.splat));
    }

    render() {
        console.log(this.props);
        return <Page page={this.props.page}/>
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.page
    }
};

export default connect(mapStateToProps)(PageContainer);