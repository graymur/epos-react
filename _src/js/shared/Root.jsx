import React from 'react';

import { Router, browserHistory } from 'react-router';
import routes from './routes.jsx';

import { createLocation } from 'react-router';

export default function Root() {
    return (
        <Router children={routes} history={browserHistory}></Router>
    );
}