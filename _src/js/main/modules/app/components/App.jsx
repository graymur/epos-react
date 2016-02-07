import React from 'react';
import Menu from './Menu.jsx';
import Languages from './Languages.jsx';

const App = (props) => {
    return (
        <div className="page-container">
            <header className="header">
                <h1 className="header__title">Epos</h1>
                <Languages items={props.meta.languages} currentLanguage={props.meta.currentLanguage}/>
                <Menu items={props.meta.menu} currentLanguage={props.meta.currentLanguage} activeLink={props.activeLink}/>
            </header>
            {props.children}
        </div>
    );
};

export default App;