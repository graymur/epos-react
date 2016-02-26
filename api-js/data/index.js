const data = {
    'en': [
        {
            'title': 'Research',
            'link': 'services/research',
        },
        {
            'title': 'Academic partnerships',
            'link': 'services/partnerships',
        },
        {
            'title': 'Business seminars',
            'link': 'services/seminars',
        },
    ],
    'si': [
        {
            'title': 'Raziskovanje',
            'link': 'services/research',
        },
        {
            'title': 'Poslovno Svetovanje',
            'link': 'services/consulting',
        },
        {
            'title': 'Akademska partnerstva',
            'link': 'services/trainings',
        },
    ],
};

export default function getIndex({ lang }) {
    return data[lang];
}