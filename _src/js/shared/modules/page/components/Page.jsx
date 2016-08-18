import React from 'react';
import PageLayout from '../../../components/PageLayout.jsx';
import getDangerousHtml from '../../../util/get-dangerous-html.js';

export default class Page extends React.PureComponent {
    render() {
        const { page } = this.props;

        if (page.content.length === 0) return <span></span>;

        return (
            <PageLayout title={page.title}>
                <div dangerouslySetInnerHTML={getDangerousHtml(page.content)} />
            </PageLayout>
        );
    }
}