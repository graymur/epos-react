import getPage from './pages.js';

const data = {
    'en': [
        {
            'name': 'Mr. Maynard "Rink" Wheeler',
            'position': 'Independent Consumer Goods Professional (Michigan, USA).  ',
            'image': '/files/Wheeler.jpg',
            'content': `
            <p>Stanford MBA 1957; Former Vice President of Operations for the Food’s Division of the Coca-Cola Company; Business consultant in CIS countries (Poland, Ukraine, Azerbaijan and Kyrgyzstan) with US State Department: 1998-2012.</p>
            <p>Specialties: International operations, organizational structure, business and marketing strategies, budget and cost control, mentoring new start-up businesses.</p>
            <p><a href="/en/gallery#rink">21 October 2015: Lecture at ABC Accelerator “Building Company vision and plan for growth: best practices from the USA”</a></p>
            `
        },
        {
            'name': 'Dr. R. Boyd Johnson',
            'position': 'Chair of the Doctoral Program in Organizational Leadership at Indiana Wesleyan University (Indiana, USA).',
            'image': '/files/boyd-johnson.jpg',
            'content': `<p>PhD in International Studies (Oxford), MA degrees in Anthropology (California State) and Theology (Fuller Seminary) and a BA in Anthropology (UCLA). Focus on international business and social sciences.</p>
            <p>Research project: “Cultural intelligence: case study of Slovenia.”</p>
            <p>20 January 2016: Dr Boyd Johnson presents at the conference "<a href="http://psihologijadela.com/program/" target="_blank">Tujina, moja službena domovina</a>" with a lecture "<a href="/en/gallery">Leadership and culture: perceptions of Western-based assessment models in other cultures</a>". </p>
            <p>9 June 2016: Dr. Boyd Johnson’s presentation "Drivers and barriers of effective Leadership in the multigenerational workplaces" at the FEELs conference “<a href="http://feel-leadership.si/">Poslovna etika in konflikti vlog</a>“.</p>
            `
        },
        {
            'name': 'Dr. Gaye Bammet',
            'position': 'Lead mediator at Dispute Resolution Center of Seattle / King County (Seattle, USA).',
            'image': '/files/DrBammet.jpg',
            'content': `<p>Assistant professor, University of Washington. Ph.D., Speech Communication, Southern Illinois University, (Carbondale, IL); M.A., Speech Communication California State University-Northridge.</p>
            <p>Guest lecture: “Effective communication and dispute resolution: case studies of US businesses.”</p>`
        },
        {
            'name': 'Mr. Prokofiev Sergey',
            'position': 'Business Development Director, CreativePeople (Moscow, Russian Federation)',
            'image': '/files/Prokofiev.jpg',
            'content': `<p>Guest lecture: “Tips for start up and management of successful Creative Agency: Case study of Russia.”</p>`
        },
    ],
    'si': [
        {
            'name': 'Mr. Maynard "Rink" Wheeler',
            'position': 'strokovnjak s področja potrošniškega blaga (Michigan, ZDA).  ',
            'image': '/files/Wheeler.jpg',
            'content': `
            <p>Stanford MBA 1957; Bivši Podpredsednik Oddelka za živilske zaloge pri Podjetju Coca-Cola; Poslovni svetovalec po državam SND (Polska, Ukrajina, Azerbajdžan and Kirgizija) pri Zunanjem ministrstvu ZDA: 1998-2012 leta.</p>
            <p>Mednarodno poslovanje, organizacijske structure.</p>
            <p><a href="/si/gallery#rink">21 October 2015: Lecture at ABC Accelerator “Building Company vision and plan for growth: best practices from the USA”</a></p>
            `
        },
        {
            'name': 'Dr. R. Boyd Johnson',
            'position': 'Predsednik doktorskega programa v organizacijskem vodenju pri Univerzi Indiana Wesleyan (Indiana, ZDA).',
            'image': '/files/boyd-johnson.jpg',
            'content': `<p>PhD in Mednarodne Študije (Oxford), magister antropologije (ZDA, Kalifornija) in Teologije (Fuller Seminary) ter diplomant antropologije (UCLA). Osredotoča se na mednarodnih poslovnih in družbenih vedah.</p>
            <p>Raziskovalni projekt: "Kulturna inteligenca v Sloveniji.”</p>
            <p>20 January 2016: Dr Boyd Johnson presents at the conference "<a href="http://psihologijadela.com/program/" target="_blank">Tujina, moja službena domovina</a>" with a lecture "<a href="/si/gallery">Leadership and culture: perceptions of Western-based assessment models in other cultures</a>". </p>
            `
        },
        {
            'name': 'Dr. Gaye Bammet',
            'position': 'Vodilni posrednik pri Centru za reševanje sporov pri Seattle / King County (Seattle, ZDA).',
            'image': '/files/DrBammet.jpg',
            'content': `<p>Asistent profesorja, University of Washington. Ph.D., Metode in možnosti komuniciranja, Southern Illinois University, (Carbondale, IL); M.A., Metode in možnosti komuniciranja California State University-Northridge.</p>
            <p>"Učinkovita komunikacija in reševanje sporov. obravnava študijskih primerov podjetij v ZDA". </p>`
        },
        {
            'name': 'Mr. Prokofiev Sergey',
            'position': 'Direktor za razvoj poslovanja, CreativePeople (Moskva, Ruska Federacija)',
            'image': '/files/Prokofiev.jpg',
            'content': `<p>"Nasveti za startup in vodenje uspešne kreativne agencije: Študijski primeri v Rusiji."</p>`
        },
    ]
};

export default function getSpeakers({ lang }) {
    let retval = getPage({ lang, pageName: 'speakers'});
    retval['speakers'] = data[lang];

    return retval;
}
