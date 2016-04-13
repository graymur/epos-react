import React from 'react';
import Form from './Form.jsx';
import PageLayout from '../../../components/PageLayout.jsx';
import getDangerousHtml from '../../../util/get-dangerous-html.js';

const Contacts = ({ contacts }) => {
    return (
        <PageLayout title={contacts.title}>
            <div dangerouslySetInnerHTML={ getDangerousHtml(contacts.content) } />
            {/*contacts.title ? <Form/> : ''*/}
        </PageLayout>
    );
};

export default Contacts;