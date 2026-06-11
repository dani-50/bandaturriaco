// Translations and site i18n data

export type Lang = 'it' | 'en' | 'de';

export const defaultLang: Lang = 'it';

export const languages = {
  it: 'Italiano',
  en: 'English',
  de: 'Deutsch',
};

export const ui = {
  it: {
    // Header top bar
    tagline: 'Associazione Musicale dal 1870',

    // Navigation
    nav: {
      novita: 'Novità',
      chisiamo: 'Chi Siamo',
      corsi: 'Corsi',
      eventi: 'Eventi',
      storia: 'Storia',
      galleria: 'Galleria',
      contatti: 'Contatti',
    },

    // Footer
    footer: {
      aboutTitle: 'Società Filarmonica di Turriaco',
      aboutText:
        'Fondata nel 1870, la Società Filarmonica di Turriaco è uno dei complessi bandistici più ricchi di tradizione del Friuli Venezia Giulia. Associata ANBIMA FVG.',
      navTitle: 'Navigazione',
      followTitle: 'Seguici',
      address: '34070 Turriaco (GO)<br>Friuli Venezia Giulia, Italia',
      copyright:
        '© 2026 Società Filarmonica di Turriaco — Tutti i diritti riservati',
      privacy: 'Privacy Policy',
      affil: 'Associata',
    },

    // Logo alt
    logoAlt: 'Logo Società Filarmonica di Turriaco',

    // Storia chapters
    storiaChapters: [
      { id: 'prefazione', label: 'Prefazione', title: 'Prefazione' },
      { id: 'capitolo-1', label: 'Capitolo 1', title: 'Il territorio e la popolazione' },
      { id: 'capitolo-2', label: 'Capitolo 2', title: 'Le radici asburgiche' },
      { id: 'capitolo-3', label: 'Capitolo 3', title: 'Dal Regno alla Repubblica' },
      { id: 'capitolo-4', label: 'Capitolo 4', title: 'I mitici anni Settanta (e Ottanta)' },
      { id: 'capitolo-5', label: 'Capitolo 5', title: 'Verso il millennio (con riflessioni)' },
      { id: 'capitolo-6', label: 'Capitolo 6', title: "Gli ultimi vent'anni" },
      { id: 'postfazione', label: 'Postfazione', title: 'Postfazione' },
    ],
    storiaTocLabel: 'Capitoli',
    storiaNavPrev: '← Capitolo',
    storiaNavNext: 'Capitolo →',
    storiaNavEnd: 'Fine della storia',
  },

  en: {
    tagline: 'Musical Association since 1870',

    nav: {
      novita: 'News',
      chisiamo: 'About Us',
      corsi: 'Courses',
      eventi: 'Events',
      storia: 'History',
      galleria: 'Gallery',
      contatti: 'Contact',
    },

    footer: {
      aboutTitle: 'Società Filarmonica di Turriaco',
      aboutText:
        'Founded in 1870, the Società Filarmonica di Turriaco is one of the most traditional wind bands in Friuli Venezia Giulia. Member of ANBIMA FVG.',
      navTitle: 'Navigation',
      followTitle: 'Follow us',
      address: '34070 Turriaco (GO)<br>Friuli Venezia Giulia, Italy',
      copyright:
        '© 2026 Società Filarmonica di Turriaco — All rights reserved',
      privacy: 'Privacy Policy',
      affil: 'Member of',
    },

    logoAlt: 'Società Filarmonica di Turriaco logo',

    storiaChapters: [
      { id: 'preface', label: 'Preface', title: 'Preface' },
      { id: 'chapter-1', label: 'Chapter 1', title: 'The Territory and its People' },
      { id: 'chapter-2', label: 'Chapter 2', title: 'The Habsburg Roots' },
      { id: 'chapter-3', label: 'Chapter 3', title: 'From Kingdom to Republic' },
      { id: 'chapter-4', label: 'Chapter 4', title: 'The Legendary Seventies (and Eighties)' },
      { id: 'chapter-5', label: 'Chapter 5', title: 'Toward the Millennium (with Reflections)' },
      { id: 'chapter-6', label: 'Chapter 6', title: 'The Last Twenty Years' },
      { id: 'afterword', label: 'Afterword', title: 'Afterword' },
    ],
    storiaTocLabel: 'Chapters',
    storiaNavPrev: '← Chapter',
    storiaNavNext: 'Chapter →',
    storiaNavEnd: 'End of history',
  },

  de: {
    tagline: 'Musikverein seit 1870',

    nav: {
      novita: 'Neuigkeiten',
      chisiamo: 'Über uns',
      corsi: 'Kurse',
      eventi: 'Veranstaltungen',
      storia: 'Geschichte',
      galleria: 'Galerie',
      contatti: 'Kontakt',
    },

    footer: {
      aboutTitle: 'Società Filarmonica di Turriaco',
      aboutText:
        'Gegründet 1870, ist die Società Filarmonica di Turriaco eines der traditionsreichsten Blasorchester in Friaul-Julisch Venetien. Mitglied der ANBIMA FVG.',
      navTitle: 'Navigation',
      followTitle: 'Folgen Sie uns',
      address: '34070 Turriaco (GO)<br>Friaul-Julisch Venetien, Italien',
      copyright:
        '© 2026 Società Filarmonica di Turriaco — Alle Rechte vorbehalten',
      privacy: 'Datenschutz',
      affil: 'Mitglied der',
    },

    logoAlt: 'Logo der Società Filarmonica di Turriaco',

    storiaChapters: [
      { id: 'vorwort', label: 'Vorwort', title: 'Vorwort' },
      { id: 'kapitel-1', label: 'Kapitel 1', title: 'Das Gebiet und seine Bevölkerung' },
      { id: 'kapitel-2', label: 'Kapitel 2', title: 'Die habsburgischen Wurzeln' },
      { id: 'kapitel-3', label: 'Kapitel 3', title: 'Vom Königreich zur Republik' },
      { id: 'kapitel-4', label: 'Kapitel 4', title: 'Die sagenhaften Siebzigerjahre (und Achtziger)' },
      { id: 'kapitel-5', label: 'Kapitel 5', title: 'Dem Jahrtausend entgegen (mit Reflexionen)' },
      { id: 'kapitel-6', label: 'Kapitel 6', title: 'Die letzten zwanzig Jahre' },
      { id: 'nachwort', label: 'Nachwort', title: 'Nachwort' },
    ],
    storiaTocLabel: 'Kapitel',
    storiaNavPrev: '← Kapitel',
    storiaNavNext: 'Kapitel →',
    storiaNavEnd: 'Ende der Geschichte',
  },
} as const;

export function getLangPath(lang: Lang, page: string): string {
  return `/${lang}/${page}`;
}
