import React from 'react';
import Menu from './Menu.jsx';
import Languages from './Languages.jsx';
import ErrorComponent from './ErrorComponent.jsx';
import Loader from './Loader.jsx';
import DevTools from '../../../containers/DevTools.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const App = (props) => {
    let content = props.meta.error ? <ErrorComponent {...props.meta.error}/> : props.children;

    return (
        <div className="page-container">
            <Loader asyncLoading={props.asyncLoading} key="loader"/>

            <header className="header">
                <h1 className="header__title">Epos</h1>
                <Languages items={props.meta.languages} currentLanguage={props.meta.currentLanguage}/>
                <Menu items={props.meta.menu} currentLanguage={props.meta.currentLanguage} activeLink={props.activeLink}/>
            </header>

            {/*<ReactCSSTransitionGroup
             component="div"
             transitionName="example"
             transitionEnterTimeout={500}
             transitionLeaveTimeout={500}
             >
             {React.cloneElement(content, {
             key: props.location.pathname
             })}
             </ReactCSSTransitionGroup>*/}
            {content}
            <DevTools />
        </div>
    );
};

export default App;