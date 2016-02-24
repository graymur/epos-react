import $ from 'jquery';
import { batchActions } from 'redux-batched-actions';
import { errorAction } from '../../modules/app/actions.js';

export const CALL_API = 'CALL_API';
export const ASYNC_ERROR = 'ASYNC_ERROR';

export default store => next => action => {
    if (action.type !== CALL_API) {
        return next(batchActions([action, errorAction(false)]));
    }

    next({ type: action.types.fetchingType });

    let request = Object.assign(
        {},
        action.payload || {},
        { lang: action.lang || store.getState().meta.currentLanguage }
    );
    //
    //console.log(action);

    //return next(batchActions([{
    //    type: action.types.fetchedType,
    //    data: {"title":"Guest Speakers","url":"speakers","menu_id":1,"content":"<p>From fall 2015 to summer 2016 we plan to bring many international guest speakers to Slovenia with workshops, guest lectures, seminars, and research projects.  <\/p>","speakers":[{"name":"Mr. Maynard \"Rink\" Wheeler","position":"Independent Consumer Goods Professional (Michigan, USA).  ","image":"\/files\/Wheeler.jpg","content":"\r\n            <p>Stanford MBA 1957; Former Vice President of Operations for the Food\u2019s Division of the Coca-Cola Company; Business consultant in CIS countries (Poland, Ukraine, Azerbaijan and Kyrgyzstan) with US State Department: 1998-2012.<\/p>\r\n            <p>Specialties: International operations, organizational structure, business and marketing strategies, budget and cost control, mentoring new start-up businesses.<\/p>\r\n            <p><a href=\"\/en\/gallery#rink\">21 October 2015: Lecture at ABC Accelerator \u201cBuilding Company vision and plan for growth: best practices from the USA\u201d<\/a><\/p>\r\n            "},{"name":"Dr. R. Boyd Johnson","position":"Chair of the Doctoral Program in Organizational Leadership at Indiana Wesleyan University (Indiana, USA).","image":"\/files\/boyd-johnson.jpg","content":"<p>PhD in International Studies (Oxford), MA degrees in Anthropology (California State) and Theology (Fuller Seminary) and a BA in Anthropology (UCLA). Focus on international business and social sciences.<\/p>\r\n            <p>Research project: \u201cCultural intelligence: case study of Slovenia.\u201d<\/p>\r\n            <p>20 January 2016: Dr Boyd Johnson presents at the conference \"<a href=\"http:\/\/psihologijadela.com\/program\/\" target=\"_blank\">Tujina, moja slu\u017ebena domovina<\/a>\" with a lecture \"<a href=\"\/en\/gallery\">Leadership and culture: perceptions of Western-based assessment models in other cultures<\/a>\". <\/p>\r\n            "},{"name":"Dr. Gaye Bammet","position":"Lead mediator at Dispute Resolution Center of Seattle \/ King County (Seattle, USA).","image":"\/files\/DrBammet.jpg","content":"<p>Assistant professor, University of Washington. Ph.D., Speech Communication, Southern Illinois University, (Carbondale, IL); M.A., Speech Communication California State University-Northridge.<\/p>\r\n            <p>Guest lecture: \u201cEffective communication and dispute resolution: case studies of US businesses.\u201d<\/p>"},{"name":"Mr. Prokofiev Sergey","position":"Business Development Director, CreativePeople (Moscow, Russian Federation)","image":"\/files\/Prokofiev.jpg","content":"<p>Guest lecture: \u201cTips for start up and management of successful Creative Agency: Case study of Russia.\u201d<\/p>"}]}
    //}, errorAction(false)]));


    return fetchUrl(action.endpoint, request || {})
        .then(data => {
            return next(batchActions([{
                type: action.types.fetchedType,
                data
            }, errorAction(false)]));
        })
        .catch(error => {
            next(errorAction(error))
        });
}

let cache = {};

function fetchUrl(endpoint, data = {}) {
    let cacheKey = JSON.stringify(Object.assign({}, data, { __e__: endpoint}));

    let retval;

    if (cache[cacheKey]) {
        retval = Promise.resolve(cache[cacheKey]);
    } else {
        // нужно переделать на iso-fetch
        retval = (new Promise(function (resolve, reject) {
            $.ajax({url: 'http://epos-react/api/1/' + endpoint, data}).then(resolve, reject);
        })).then(data => {
            cache[cacheKey] = data;
            return data;
        });
    }

    return retval;
}


