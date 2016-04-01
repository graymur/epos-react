import React from 'react';
import { connect } from 'react-redux';
import { fetchPageAction } from './actions.js';
import Page from './components/Page.jsx';

class PageContainer extends React.Component {
    componentWillMount() {
        //console.log('componentWillMount');
        this.fetchIfNeeded(this.props);
    }

    componentWillReceiveProps(props) {
        //console.log('componentWillReceiveProps');
        this.fetchIfNeeded(props);
    }

    componentWillUnmount() {
        //this.props.params.splat = '';
        //console.log('unmount');
    }

    //componentWillUpdate(props) {
    //    //console.log('componentWillReceiveProps');
    //    this.fetchIfNeeded(props);
    //}

    fetchIfNeeded(props) {
        //console.log(this.props.params.splat, props.params.splat);
        //console.log(this.props.page.title, props.page.title);
        //console.log('--------------------');
        //if (this.props.params.splat !== props.params.splat || !this.props.page.title) {
        if (true) {
            this.constructor.fetch({
                dispatch: props.dispatch,
                lang: props.params.lang,
                splat: props.params.splat
            });
        }
    }

    static fetch({ dispatch, lang, splat }) {
        return dispatch(fetchPageAction(lang, splat));
    }

    render() {
        //console.log(this.props);
        return <Page page={this.props.page}/>
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.page
    }
};

export default connect(mapStateToProps)(PageContainer);