import api from '../../util/api.js';

export function fetchSpeakersAction(lang) {
    return (dispatch, getState) => {
        dispatch(fetchingSpeakersAction());

        api.fetchSpeakers(lang).then(data => {
            dispatch(fetchedSpeakersAction(data));
        });
    };
}

export function fetchedSpeakersAction(speakers) {
    return {
        type: 'SPEAKERS_FETCHED',
        speakers
    };
}

export function fetchingSpeakersAction() {
    return { type: 'SPEAKERS_FETCHING'  };
}