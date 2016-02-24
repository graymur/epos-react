import React from 'react';
const dv = console.log.bind(console);

import createLocation from 'history/lib/createLocation';
import routes from './_src/js/main/routes.jsx';
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './_src/js/main/redux/configureStore.js';

const location = createLocation('/en/gallery');

var __INITIAL_STATE__ = {
    meta: {
        "menu":[
            {"link":"about","title":"About us"},
            {"link":"services","title":"Services"},
            {"link":"contacts","title":"Contact us"},
            {"link":"speakers","title":"Guest Speakers"},
            {"link":"gallery","title":"Gallery"}
        ],
        "languages":[
            {"code":"en","title":"English"},
            {"code":"si","title":"Sloven\u010dina"}
        ],
        "currentLanguage":"en",
        //"speakers": {"title":"Guest Speakers","url":"speakers","menu_id":1,"content":"<p>From fall 2015 to summer 2016 we plan to bring many international guest speakers to Slovenia with workshops, guest lectures, seminars, and research projects.  <\/p>","speakers":[{"name":"Mr. Maynard \"Rink\" Wheeler","position":"Independent Consumer Goods Professional (Michigan, USA).  ","image":"\/files\/Wheeler.jpg","content":"\r\n            <p>Stanford MBA 1957; Former Vice President of Operations for the Food\u2019s Division of the Coca-Cola Company; Business consultant in CIS countries (Poland, Ukraine, Azerbaijan and Kyrgyzstan) with US State Department: 1998-2012.<\/p>\r\n            <p>Specialties: International operations, organizational structure, business and marketing strategies, budget and cost control, mentoring new start-up businesses.<\/p>\r\n            <p><a href=\"\/en\/gallery#rink\">21 October 2015: Lecture at ABC Accelerator \u201cBuilding Company vision and plan for growth: best practices from the USA\u201d<\/a><\/p>\r\n            "},{"name":"Dr. R. Boyd Johnson","position":"Chair of the Doctoral Program in Organizational Leadership at Indiana Wesleyan University (Indiana, USA).","image":"\/files\/boyd-johnson.jpg","content":"<p>PhD in International Studies (Oxford), MA degrees in Anthropology (California State) and Theology (Fuller Seminary) and a BA in Anthropology (UCLA). Focus on international business and social sciences.<\/p>\r\n            <p>Research project: \u201cCultural intelligence: case study of Slovenia.\u201d<\/p>\r\n            <p>20 January 2016: Dr Boyd Johnson presents at the conference \"<a href=\"http:\/\/psihologijadela.com\/program\/\" target=\"_blank\">Tujina, moja slu\u017ebena domovina<\/a>\" with a lecture \"<a href=\"\/en\/gallery\">Leadership and culture: perceptions of Western-based assessment models in other cultures<\/a>\". <\/p>\r\n            "},{"name":"Dr. Gaye Bammet","position":"Lead mediator at Dispute Resolution Center of Seattle \/ King County (Seattle, USA).","image":"\/files\/DrBammet.jpg","content":"<p>Assistant professor, University of Washington. Ph.D., Speech Communication, Southern Illinois University, (Carbondale, IL); M.A., Speech Communication California State University-Northridge.<\/p>\r\n            <p>Guest lecture: \u201cEffective communication and dispute resolution: case studies of US businesses.\u201d<\/p>"},{"name":"Mr. Prokofiev Sergey","position":"Business Development Director, CreativePeople (Moscow, Russian Federation)","image":"\/files\/Prokofiev.jpg","content":"<p>Guest lecture: \u201cTips for start up and management of successful Creative Agency: Case study of Russia.\u201d<\/p>"}]}
    }
};

const store = configureStore(__INITIAL_STATE__);

match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
        //console.error(err);
        //return res.status(500).end('Internal server error');
    }
//
//    const HTML = `
//<!DOCTYPE html>
//<html lang="en">
//<head>
//    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
//    <meta charset="UTF-8">
//    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
//    <title>Epos Slovenia</title>
//    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
//    <link rel="stylesheet" type="text/css" media="screen" href="/css/main.css?5221">
//</head>
//<body>
//<div class="container" id="root">!!!--------------!!!${content}!!!------------------!!!</div>
//<script>var __INITIAL_STATE__ = ${JSON.stringify(__INITIAL_STATE__)}</script>
//<script src="/js/main.js"></script>
//</body>
//</html>
//`;

    //dv(renderProps.components, renderProps.params);

    function getReduxPromise () {
        let { query, params } = renderProps;
        let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;

        return comp.fetch
            ? comp.fetch(store.dispatch)
            : Promise.resolve();
    }

    var p = getReduxPromise();

    p.then(() => {
        let reduxState = JSON.stringify(store.getState());

        dv(store.getState());

        const InitialComponent = (
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        const content = renderToString(InitialComponent);
        console.log(content);
    });

});


//import { renderToString } from 'react-dom/server';
//import { Provider } from 'react-redux';
//import configureStore from './_src/js/main/redux/configureStore.js';
//import Root from './_src/js/main/Root.jsx';
//
//let __INITIAL_STATE__ = {
//    meta: {"menu":[{"link":"about","title":"About us"},{"link":"services","title":"Services"},{"link":"contacts","title":"Contact us"},{"link":"speakers","title":"Guest Speakers"},{"link":"gallery","title":"Gallery"}],"languages":[{"code":"en","title":"English"},{"code":"si","title":"Sloven\u010dina"}],"currentLanguage":"en"}
//};
//
//const store = configureStore(__INITIAL_STATE__);
//
//console.log(store);

//let content = renderToString((
//    <Provider store={store}>
//        <Root/>
//    </Provider>
//));

//console.log(content);
