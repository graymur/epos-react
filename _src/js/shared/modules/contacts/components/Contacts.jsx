import React from 'react';
import Form from '../../contacts-form/container.jsx';
import PageLayout from '../../../components/PageLayout.jsx';
import getDangerousHtml from '../../../util/get-dangerous-html.js';

//console.log(Form.render);

const Contacts = ({ contacts }) => {
    return (
        <PageLayout title={contacts.title}>
            <div dangerouslySetInnerHTML={ getDangerousHtml(contacts.content) } />
            {contacts.title ? <Form/> : ''}
        </PageLayout>
    );
};

export default Contacts;