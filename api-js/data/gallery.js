import getPage from './pages.js';

const data = {
    'en': [
        {
            'title': 'Business lectures and consulting',
            'images': ['_B9A1055.JPG', '_B9A1064.JPG', '_B9A1101.JPG', '_B9A1034.jpg'],
            'content': `
            <p><i>21 October 2015: Lecture at ABC Accelerator “Building Company vision and plan for growth: best practices from the USA”</i></p>
            <p>Presentation of US business consultant about approaches to building company vision and implementing growth.</p>
            <p>US consultant shared barriers and drivers of success based on the case studies and field stories in the USA. He looked into basic principals of building and growing successful business.
            The focus is on the value of the vision and the importance of the strategic approach to company growth. The workshop is based on the American examples and international consulting case studies:
            58 years of experience in the real world; from corporate America to small businesses; 9 different countries (USA, Germany, Australia, Philippines, Mexico, Poland, Azerbaijan, Kyrgyzstan, Ukraine).</p>
            `
        },
        {
            'title': 'Conferences / Networking / Interviews',
            'images': ['C05150B9-09DA-45F1-8E0F-82BD2555E458.jpg', 'IMG_2930.JPG', 'zavod.jpg', 'fam.jpg'],
            'content': `
            <p>Field work with expert interviews, attending conferences and events of the professional associations with the goal to bring new opportunities, partnerships, ideas, projects and research to Slovenia.</p>
            <p>10 June 2015, International Conference “<a href="http://feel-leadership.si/" target="_blank">FEELS: Future - Ethical - Effective – Leadership.</a>” (Brdo, Slovenia)</p>
            <p>June-November 2015, FAM: <a href="http://www.drustvo-fam.si/" target="_blank">Association of Female Managers Events in Slovenia</a>. (Ljubljana, Slovenia) </p>
            <p>14-17 October 2015, International Leadership Association Conference “<a href="http://www.ila-net.org/Conferences/Past/index.htm" target="_blank">Leading across borders and generations.</a>” (Barcelona, Spain)</p>
            `
        },
        {
            'title': 'Сonference support',
            'images': ['Boyd_Johnson_bio.jpg', 'conference_.jpg', 'DSC_0286.jpg', 'partners.jpg'],
            'content': `
            <p>20 January 2016: Dr Boyd Johnson\'s presentation at the conference "<a href="http://psihologijadela.com/program/" target="_blank">Tujina, moja službena domovina</a>" with a lecture "Leadership and culture: perceptions of Western-based assessment models in other cultures".</p>
            <p>This presentation examined the cross-cultural transferability of two widely used leadership assessment tools: the Leadership Practice Inventory (LPI) and the Cultural Intelligence Scale (CQS) based on the case studies from Eastern and Southern Europe.</p>
            `
        },
        {
            'title': 'Academic research partnerships',
            'images': ['01_small.jpg', 'Conferece_Students_CQS_Slovenia.jpg'],
            'content': `
            <p>October 2015- January 2016: US-Slovenian research partnership with pilot research of Cultural Intelligence CQS (student testing) in Slovenia (527 students: University of Ljubljana, University of Maribor, University of Primorska, University of Nova Gorica) coordinated by a group of Slovenian <a href="https://www.linkedin.com/pulse/i-sent-overseas-basically-said-heres-your-ticket-good-ne%C5%BEa-prelog">junior researchers</a>.</p>
            `
        },
    ],
    'si': [
        {
            'title': 'SI Business lectures and consulting',
            'images': ['_B9A1055.JPG', '_B9A1064.JPG', '_B9A1101.JPG', '_B9A1034.jpg'],
            'content': `
            <p><i>21 October 2015: Lecture at ABC Accelerator “Building Company vision and plan for growth: best practices from the USA”</i></p>
            <p>Presentation of US business consultant about approaches to building company vision and implementing growth.</p>
            <p>US consultant shared barriers and drivers of success based on the case studies and field stories in the USA. He looked into basic principals of building and growing successful business.
            The focus is on the value of the vision and the importance of the strategic approach to company growth. The workshop is based on the American examples and international consulting case studies:
            58 years of experience in the real world; from corporate America to small businesses; 9 different countries (USA, Germany, Australia, Philippines, Mexico, Poland, Azerbaijan, Kyrgyzstan, Ukraine).</p>
            `
        },
        {
            'title': 'SI Conferences / Networking / Interviews',
            'images': ['C05150B9-09DA-45F1-8E0F-82BD2555E458.jpg', 'IMG_2930.JPG', 'zavod.jpg', 'fam.jpg'],
            'content': `
            <p>Field work with expert interviews, attending conferences and events of the professional associations with the goal to bring new opportunities, partnerships, ideas, projects and research to Slovenia.</p>
            <p>10 June 2015, International Conference “<a href="http://feel-leadership.si/" target="_blank">FEELS: Future - Ethical - Effective – Leadership.</a>” (Brdo, Slovenia)</p>
            <p>June-November 2015, FAM: <a href="http://www.drustvo-fam.si/" target="_blank">Association of Female Managers Events in Slovenia</a>. (Ljubljana, Slovenia) </p>
            <p>14-17 October 2015, International Leadership Association Conference “<a href="http://www.ila-net.org/Conferences/Past/index.htm" target="_blank">Leading across borders and generations.</a>” (Barcelona, Spain)</p>
            `
        },
        {
            'title': 'Academic research partnerships',
            'images': ['01_small.jpg', 'Conferece_Students_CQS_Slovenia.jpg'],
            'content': `
            <p>October 2015- January 2016: US-Slovenian research partnership with pilot research of Cultural Intelligence CQS (student testing) in Slovenia (527 students: University of Ljubljana, University of Maribor, University of Primorska, University of Nova Gorica) coordinated by a group of Slovenian <a href="https://www.linkedin.com/pulse/i-sent-overseas-basically-said-heres-your-ticket-good-ne%C5%BEa-prelog">junior researchers</a>.</p>
            `
        },
    ],
};

export default function getGalleries({ lang }) {
    let retval = getPage({ lang, pageName: 'gallery'});
    retval['galleries'] = data[lang];

    return retval;
}