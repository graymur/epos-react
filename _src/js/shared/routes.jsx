import React from 'react';

import { Route, Redirect } from 'react-router';

import App from './modules/app/container.jsx';
import Page from './modules/page/container.jsx';
import Speakers from './modules/speakers/container.jsx';
import Gallery from './modules/gallery/container.jsx';
import News from './modules/news/container.jsx';
import Contacts from './modules/contacts/container.jsx';
import Index from './modules/index/container.jsx';

export default (
    <Route component={App}>
        <Route path="/:lang(/)" component={Index} />
        <Route path=":lang/">
            <Route path="experts" component={Speakers} />
            <Route path="gallery" component={Gallery} />
            <Route path="contacts" component={Contacts} />
            <Route path="news" component={News} />
            <Route path="*" component={Page} />
        </Route>
        {/*<Route path="/:lang" component={Index}/>*/}
        <Redirect from="*" to="en" />
    </Route>
);