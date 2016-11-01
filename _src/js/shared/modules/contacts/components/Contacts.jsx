import React from 'react';
//import Form from '../../contacts-form/container.jsx';
import PageLayout from '../../../../shared/components/PageLayout.jsx';
import getDangerousHtml from '../../../../shared/util/get-dangerous-html.js';

export default class Contacts extends React.PureComponent {
    render() {
        let { contacts } = this.props;

        return (
            <PageLayout title={contacts.title}>
                <div dangerouslySetInnerHTML={getDangerousHtml(contacts.content)} />
                {/*contacts.title ? <Form /> : ''*/}
            </PageLayout>
        );
    }
}