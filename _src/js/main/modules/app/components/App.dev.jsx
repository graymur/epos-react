import React from 'react';
import Menu from './Menu.jsx';
import Languages from './Languages.jsx';
import DevTools from '../../../containers/DevTools.jsx';

import Error from '../../error/container.jsx';

const App = (props) => {
    let content = props.error.status > 0 ? <Error/> : props.children;
    return (
        <div className="page-container">
            <header className="header">
                <h1 className="header__title">Epos</h1>
                <Languages items={props.meta.languages} currentLanguage={props.meta.currentLanguage}/>
                <Menu items={props.meta.menu} currentLanguage={props.meta.currentLanguage} activeLink={props.activeLink}/>
            </header>
            {props.children}
            <DevTools />
        </div>
    );
};

export default App;