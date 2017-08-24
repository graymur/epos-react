import React from 'react';
import Menu from './Menu.jsx';
// import Languages from './Languages.jsx';
import ErrorComponent from './ErrorComponent.jsx';
import Loader from './Loader.jsx';

const App = (props) => {
    let content = props.meta.error ? <ErrorComponent {...props.meta.error} /> : props.children;

    return (
        <div className="page-container">
            <Loader asyncLoading={props.asyncLoading} key="loader" />

            <header className="header">
                <h1 className="header__title"><img src="/img/logo.png" className="header__logo" /> Epos</h1>
                {/*<Languages items={props.meta.languages} currentLanguage={props.meta.currentLanguage} />*/}
                <Menu items={props.meta.menu} currentLanguage={props.meta.currentLanguage} activeLink={props.activeLink} />
            </header>

            {content}
        </div>
    );
};

export default App;