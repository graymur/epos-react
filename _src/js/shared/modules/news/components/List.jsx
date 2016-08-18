import React from 'react';
import PageLayout from '../../../components/PageLayout.jsx';
import getDangerousHtml from '../../../util/get-dangerous-html.js';
import Item from './Item.jsx';

export default class List extends React.PureComponent {
    render() {
        const { news } = this.props;

        if (news.news.length === 0) return <span></span>;

        return (
            <PageLayout title={news.title}>
                <div dangerouslySetInnerHTML={getDangerousHtml(news.content)} />
                <div className="news">
                    {news.news.map((item, index) => <Item key={item.title + index} item={item} />)}
                </div>
            </PageLayout>
        );
    }
}