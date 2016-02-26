const data = {
    'en': {
        'menu': [
            {'link': 'about', 'title': 'About us'},
            {'link': 'services', 'title': 'Services'},
            {'link': 'contacts', 'title': 'Contact us'},
            {'link': 'speakers', 'title': 'Guest Speakers'},
            {'link': 'gallery', 'title': 'Gallery'},
        ],
        'languages': [
            {'code': 'en', 'title': 'English'},
            {'code': 'si', 'title': 'Slovenčina'},
        ],
        'currentLanguage': 'en'
    },
    'si': {
        'menu': [
            {'link': 'about', 'title': 'Kdo smo'},
            {'link': 'services', 'title': 'Storitve'},
            {'link': 'contacts', 'title': 'Kontakt'},
            {'link': 'speakers', 'title': 'Tuji gostujoči predavatelji'},
            {'link': 'gallery', 'title': 'Galerija'},
        ],
        'languages': [
            {'code': 'en', 'title': 'English'},
            {'code': 'si', 'title': 'Slovenčina'},
        ],
        'currentLanguage': 'si'
    },
};

export default function getMeta({ lang }) {
    return data[lang];
}

export function getLanguages() {
    return Object.keys(data);
}
