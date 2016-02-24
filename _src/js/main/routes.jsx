import React from 'react';

import { Route, Redirect } from 'react-router';

import App from './modules/app/container.jsx';
import Page from './modules/page/container.jsx';
import Speakers from './modules/speakers/container.jsx';
import Gallery from './modules/gallery/container.jsx';
import Index from './modules/index/container.jsx';

export default (
    <Route component={App}>
        <Route path=":lang/">
            <Route path="speakers" component={Speakers}/>
            <Route path="gallery" component={Gallery}/>
            <Route path="*" component={Page}/>
        </Route>
        <Route path="/:lang" component={Index}/>
        <Redirect from="*" to="en" />
    </Route>
);