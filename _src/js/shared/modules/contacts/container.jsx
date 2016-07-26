import React from 'react';
import { connect } from 'react-redux';
import { fetchContactsAction, submitForm } from './actions.js';

import Contacts from './components/Contacts.jsx';

class ContactsContainer extends React.Component {
    componentWillMount() {
        this.fetchIfNeeded(this.props);
    }

    componentWillReceiveProps(props) {
        this.fetchIfNeeded(props);
    }

    fetchIfNeeded(props, force = false) {
        if (!props.contacts.title || props.location.pathname !== this.props.location.pathname || this.props.contacts.lang !== props.params.lang || force) {
            this.constructor.fetch({ dispatch: props.dispatch, lang: props.params.lang });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.contacts.title !== this.props.contacts.title;
    }

    static fetch({ dispatch, lang }) {
        return dispatch(fetchContactsAction(lang));
    }

    onFormSubmit(values) {
        return this.props.dispatch(submitForm(values));
    }

    getChildContext() {
        return {
            onFormSubmit: this.onFormSubmit.bind(this)
        };
    }

    render() {
        return <Contacts contacts={this.props.contacts} />;
    }
}

const mapStateToProps = (state) => ({
    contacts: state.contacts
});

ContactsContainer.childContextTypes = {
    onFormSubmit: React.PropTypes.func
};

export default connect(mapStateToProps)(ContactsContainer);