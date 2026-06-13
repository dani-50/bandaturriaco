export type MediaItem = {
  type: 'image' | 'video';
  src: string;
  caption?: string;
};

export type GalleryEvent = {
  slug: string;
  dateLabel: string;
  coverImg: string;
  it: { title: string; place: string };
  en: { title: string; place: string };
  de: { title: string; place: string };
  media: MediaItem[];
};

export const galleryEvents: GalleryEvent[] = [
  {
    slug: 'seconda_serata',
    dateLabel: '27/05/2026',
    coverImg: '/asset/gallery/seconda_serata/seconda_serata1.jpg',
    it: { title: 'Saggio: Seconda serata', place: 'Turriaco' },
    en: { title: 'Recital: Second Evening', place: 'Turriaco' },
    de: { title: 'Aufführung: Zweiter Abend', place: 'Turriaco' },
    media: [
      { type: 'image', src: '/asset/gallery/seconda_serata/seconda_serata1.jpg' },
      { type: 'image', src: '/asset/gallery/seconda_serata/seconda_serata2.jpg' },
      { type: 'image', src: '/asset/gallery/seconda_serata/seconda_serata3.jpg' },
      { type: 'image', src: '/asset/gallery/seconda_serata/seconda_serata4.jpg' },
      { type: 'image', src: '/asset/gallery/seconda_serata/seconda_serata5.jpg' },
      { type: 'image', src: '/asset/gallery/seconda_serata/seconda_serata6.jpg' },
      { type: 'image', src: '/asset/gallery/seconda_serata/seconda_serata7.jpg' },
      { type: 'image', src: '/asset/gallery/seconda_serata/seconda_serata8.jpg' },
      { type: 'image', src: '/asset/gallery/seconda_serata/seconda_serata9.jpg' },
      { type: 'image', src: '/asset/gallery/seconda_serata/seconda_serata10.jpg' },
      { type: 'image', src: '/asset/gallery/seconda_serata/seconda_serata11.jpg' },
    ],
  },
  {
    slug: 'prima_serata',
    dateLabel: '21/05/2026',
    coverImg: '/asset/gallery/prima_serata/prima_serata1.jpg',
    it: { title: 'Saggio: Prima serata', place: 'Turriaco' },
    en: { title: 'Recital: First Evening', place: 'Turriaco' },
    de: { title: 'Aufführung: Erster Abend', place: 'Turriaco' },
    media: [
      { type: 'image', src: '/asset/gallery/prima_serata/prima_serata1.jpg' },
      { type: 'image', src: '/asset/gallery/prima_serata/prima_serata2.jpg' },
      { type: 'image', src: '/asset/gallery/prima_serata/prima_serata3.jpg' },
      { type: 'image', src: '/asset/gallery/prima_serata/prima_serata4.jpg' },
      { type: 'image', src: '/asset/gallery/prima_serata/prima_serata5.jpg' },
    ],
  },
  {
    slug: 'liberazione',
    dateLabel: '25/04/2026',
    coverImg: '/asset/gallery/liberazione/liberazione1.jpg',
    it: { title: 'Festa della Liberazione', place: 'Turriaco' },
    en: { title: 'Liberation Day', place: 'Turriaco' },
    de: { title: 'Tag der Befreiung', place: 'Turriaco' },
    media: [
      { type: 'image', src: '/asset/gallery/liberazione/liberazione1.jpg' },
      { type: 'image', src: '/asset/gallery/liberazione/liberazione2.jpg' },
      { type: 'image', src: '/asset/gallery/liberazione/liberazione3.jpg' },
      { type: 'image', src: '/asset/gallery/liberazione/liberazione4.jpg' },
      { type: 'image', src: '/asset/gallery/liberazione/liberazione5.jpg' },
      { type: 'image', src: '/asset/gallery/liberazione/liberazione6.jpg' },
    ],
  },
  {
    slug: 'pasqua',
    dateLabel: '05/04/2026',
    coverImg: '/asset/gallery/pasqua/pasqua1.jpg',
    it: { title: 'Sfilata per gli auguri di Pasqua', place: 'Turriaco' },
    en: { title: 'Easter Parade', place: 'Turriaco' },
    de: { title: 'Osterumzug', place: 'Turriaco' },
    media: [
      { type: 'image', src: '/asset/gallery/pasqua/pasqua1.jpg' },
      { type: 'image', src: '/asset/gallery/pasqua/pasqua2.jpg' },
      { type: 'image', src: '/asset/gallery/pasqua/pasqua3.jpg' },
      { type: 'image', src: '/asset/gallery/pasqua/pasqua4.jpg' },
      { type: 'image', src: '/asset/gallery/pasqua/pasqua5.jpg' },
      { type: 'image', src: '/asset/gallery/pasqua/pasqua6.jpg' },
      { type: 'image', src: '/asset/gallery/pasqua/pasqua7.jpg' },
      { type: 'image', src: '/asset/gallery/pasqua/pasqua8.jpg' },
      { type: 'image', src: '/asset/gallery/pasqua/pasqua9.jpg' },
    ],
  },
  {
    slug: 'carnevale',
    dateLabel: '08/02/2026',
    coverImg: '/asset/gallery/carnevale/carnevale1.mp4',
    it: { title: 'Sfilata di Carnevale', place: 'Gorizia' },
    en: { title: 'Carnival Parade', place: 'Gorizia' },
    de: { title: 'Karnevalsumzug', place: 'Gorizia' },
    media: [
      { type: 'video', src: '/asset/gallery/carnevale/carnevale1.mp4', caption: 'Sfilata di Carnevale' },
    ],
  },
  {
    slug: 'epifania',
    dateLabel: '06/01/2026',
    coverImg: '/asset/gallery/epifania/epifania1.jpg',
    it: { title: "Concerto dell'Epifania", place: 'Fiumicello' },
    en: { title: 'Epiphany Concert', place: 'Fiumicello' },
    de: { title: 'Dreikönigkonzert', place: 'Fiumicello' },
    media: [
      { type: 'image', src: '/asset/gallery/epifania/epifania1.jpg' },
      { type: 'image', src: '/asset/gallery/epifania/epifania2.jpg' },
      { type: 'video', src: '/asset/gallery/epifania/video concerto epifania.mp4', caption: 'Video del concerto' },
    ],
  },
];
