import React from 'react';
import { Router, browserHistory, createLocation } from 'react-router';

import routes from './routes.jsx';

export default function Root() {
    return (
        <Router children={routes} history={browserHistory} />
    );
}