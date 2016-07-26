import React from 'react';
//import Form from 'shared/modules/contacts-form/container.jsx';
import Form from '../../contacts-form/container.jsx';
import PageLayout from '../../../../shared/components/PageLayout.jsx';
import getDangerousHtml from '../../../../shared/util/get-dangerous-html.js';

const Contacts = ({ contacts }) => {
    return (
        <PageLayout title={contacts.title}>
            <div dangerouslySetInnerHTML={getDangerousHtml(contacts.content)} />
            {contacts.title ? <Form /> : ''}
        </PageLayout>
    );
};

export default Contacts;