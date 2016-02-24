import React from 'react';

import { browserHistory } from 'react-router';
import { Router } from 'react-router';
import routes from './routes.jsx';

import { createLocation } from 'react-router';
//console.log(createLocation);

export default class Root extends React.Component {
    render() {
        return (
            <Router children={routes} history={browserHistory}></Router>
        );
    }
}