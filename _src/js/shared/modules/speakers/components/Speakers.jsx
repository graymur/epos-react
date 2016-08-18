import React from 'react';
import Item from './Item.jsx';
import PageLayout from '../../../components/PageLayout.jsx';

export default class Speakers extends React.PureComponent {
    render() {
        const { speakers } = this.props;

        if (speakers.speakers.length === 0) return <span></span>;

        return (
            <PageLayout title={speakers.title}>
                <ul className="speakers__list">
                    {speakers.speakers.map(speaker => <Item key={speaker.name} speaker={speaker} />)}
                </ul>
            </PageLayout>
        );
    }
}