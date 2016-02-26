import fs from 'fs';

const data = {
    'en' : {
        'about': {
            'title': 'About us',
            'url': 'about',
            'menu_id': 1,
            'content': `file_get_contents(__DIR__ . '/../html/en/about.html')`
        },
        'services': {
            'title': 'Services',
            'url': 'services',
            'menu_id': 1,
            'content': `<h3>Research</h3>' .
                    file_get_contents(__DIR__ . '/../html/en/services-research.html') .
                    '<h3>Academic partnerships</h3>' .
                    file_get_contents(__DIR__ . '/../html/en/services-partnerships.html') .
                    '<h3>Business seminars</h3>' .
                    file_get_contents(__DIR__ . '/../html/en/services-seminars.html')`
        },
        'partnerships': {
            'title': 'Partnerships',
            'url': 'partnerships',
            'menu_id': 1,
            'content': `file_get_contents(__DIR__ . '/../html/en/partnerships.html')`
        },
        'contacts': {
            'title': 'Contacts',
            'url': 'contacts',
            'menu_id': 1,
            'content': `file_get_contents(__DIR__ . '/../html/en/contacts.html')`
        },
        'services/research': {
            'title': 'Research',
            'url': 'services/research',
            'content': `file_get_contents(__DIR__ . '/../html/en/services-research.html')`
        },
        'services/partnerships': {
            'title': 'Academic partnerships',
            'url': 'services/partnerships',
            'content': `file_get_contents(__DIR__ . '/../html/en/services-partnerships.html')`
        },
        'services/seminars': {
            'title': 'Business seminars',
            'url': 'services/seminars',
            'content': `file_get_contents(__DIR__ . '/../html/en/services-seminars.html')`
        },
        'speakers': {
            'title': 'Guest Speakers',
            'url': 'speakers',
            'menu_id': 1,
            'content': `file_get_contents(__DIR__ . '/../html/en/speakers.html')`
        },
        'gallery': {
            'title': 'Gallery',
            'url': 'gallery',
            'menu_id': 1,
            'content': `file_get_contents(__DIR__ . '/../html/en/gallery.html')`
        },
    },
    'si' : {
        'about' : {
            'title' : 'Kdo smo',
            'url' : 'about',
            'menu_id' : 1,
            'content' : `file_get_contents(__DIR__ . '/../html/si/about.html')`
        },
        'services' : {
            'title' : 'Storitve',
            'url' : 'services',
            'menu_id' : 1,
            'content' : `file_get_contents(__DIR__ . '/../html/si/services.html')`
        },
        'partnerships' : {
            'title' : 'Partnerstvo',
            'url' : 'partnerships',
            'menu_id' : 1,
            'content' : `file_get_contents(__DIR__ . '/../html/si/partnerships.html')`
        },
        'contacts' : {
            'title' : 'Kontakt',
            'url' : 'contacts',
            'menu_id' : 1,
            'content' : `file_get_contents(__DIR__ . '/../html/si/contacts.html')`
        },
        'services/research' : {
            'title' : 'Raziskovanje',
            'url' : 'services/research',
            'content' : `file_get_contents(__DIR__ . '/../html/si/services-research.html')`
        },
        'services/consulting' : {
            'title' : 'Poslovno Svetovanje',
            'url' : 'services/consulting',
            'content' : `file_get_contents(__DIR__ . '/../html/si/services-consulting.html')`
        },
        'services/trainings' : {
            'title' : 'Akademska partnerstva',
            'url' : 'about',
            'content' : `file_get_contents(__DIR__ . '/../html/si/services-trainings.html')`
        },
        'speakers' : {
            'title' : 'Tuji gostujoči predavatelji',
            'url' : 'speakers',
            'menu_id' : 1,
            'content' : `file_get_contents(__DIR__ . '/../html/si/speakers.html')`
        },
        'gallery' : {
            'title' : 'Galerija',
            'url' : 'gallery',
            'menu_id' : 1,
            'content' : `file_get_contents(__DIR__ . '/../html/si/gallery.html')`
        },
    }
};

export default function getPage({ lang, pageName }) {
    return data[lang][pageName];
}