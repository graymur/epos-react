import React from 'react';
import Menu from './Menu.jsx';
import Languages from './Languages.jsx';
import Error from './Error.jsx';

import DevTools from '../../../containers/DevTools.jsx';

const App = (props) => {
    let content = props.meta.error ? <Error {...props.meta.error}/> : props.children;
    return (
        <div className="page-container">
            <header className="header">
                <h1 className="header__title">Epos</h1>
                <Languages items={props.meta.languages} currentLanguage={props.meta.currentLanguage}/>
                <Menu items={props.meta.menu} currentLanguage={props.meta.currentLanguage} activeLink={props.activeLink}/>
            </header>
            {content}
            <DevTools />
        </div>
    );
};

export default App;