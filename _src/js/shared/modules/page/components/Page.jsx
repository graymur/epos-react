import React from 'react';
import PageLayout from '../../../components/PageLayout.jsx';
import getDangerousHtml from '../../../util/get-dangerous-html.js';

const Page = ({ page }) => {
    if (page.content.length === 0) return <span></span>;

    return (
        <PageLayout title={page.title}>
            <div dangerouslySetInnerHTML={getDangerousHtml(page.content)} />
        </PageLayout>
    );
};

export default Page;