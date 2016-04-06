import React from 'react';
import { connect } from 'react-redux';
import { fetchContactsAction } from './actions.js';

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

    static fetch({ dispatch, lang }) {
        return dispatch(fetchContactsAction(lang));
    }

    render() {
        return <Contacts contacts={this.props.contacts}/>;
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts
    }
};

export default connect(mapStateToProps)(ContactsContainer);