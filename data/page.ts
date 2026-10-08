export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface DoodleItem {
  src: string;
  left: string;
  top: string;
  width: number;
  rotation: number;
  opacity: number;
  // Optional mobile-only position override — used to pull a handful of items
  // out of the desktop top/bottom bands and into the left/right side columns
  // on narrow portrait viewports, where those bands are otherwise empty.
  mobileLeft?: string;
  mobileTop?: string;
}

export interface PageData {
  siteTitle: string;
  landingText: string;
  navLabels: string[];
  tagOrder: string[];
  work: { heading: string };
  about: {
    heading: string;
    paragraphs: string[];
    illustrationSrc: string;
    illustrationAlt: string;
  };
  contact: {
    heading: string;
    intro: string;
    socialLinks: SocialLink[];
    illustrationSrc: string;
    illustrationAlt: string;
  };
  resumeUrl: string;
  doodles: DoodleItem[];
}

export const pageData: PageData = {
  siteTitle: 'astha jha',
  landingText: 'astha\'s portfolio',
  navLabels: ['home', 'work', 'about', 'contact'],
  tagOrder: ['tech', 'product', 'blogs', 'misc'],

  work: {
    heading: 'my projects',
  },

  about: {
    heading: 'welcome to my little corner of the world!',
    paragraphs: [
      "hi, i'm astha jha! a 2024 engineering graduate with a major in information technology. i completed my undergrad from vit, vellore, india. i made my first website at 10, a (rather lousy) replica of my school's website, and decided i was going to change the world. when i entered university, i joined a tech chapter but somehow ended up handling marketing, content, and communication. i like to believe that's where my allegiance shifted from product development to product planning.",
      'making an impact has always been my thing. it started with debates and muns in school (because i wanted people to hear me out) and evolved into building products that actually make a difference.',
      "lately, i've been trying to learn how to code from scratch again. in my free time, i love dancing and reading books, and it's a goal of mine to write and publish a book someday (hopefully fiction).",
      "i know a designer would absolutely lose their head for the lack of a consistent design language across this website, i'm really sorry if that's you! since this is my corner of the internet, i wanted it to reflect the different sides that make me, me! feel free to say hi to me [here](/contact), would love to talk you!",
    ],
    illustrationSrc: '/assets/about/illustration.png',
    illustrationAlt: 'illustration of me sitting on a ledge',
  },

  contact: {
    heading: 'say hello!',
    intro: "I'd love to hear from you and always welcome any feedback. Feel free to say hello!",
    socialLinks: [
      { label: 'email', url: 'mailto:asthajha05@gmail.com', icon: '/assets/contact/email.svg' },
      { label: 'twitter', url: 'https://x.com/assthajha', icon: '/assets/contact/twitter.svg' },
      { label: 'linkedin', url: 'https://www.linkedin.com/in/asthajha05', icon: '/assets/contact/linkedin.svg' },
      { label: 'substack', url: 'https://substack.com/@astha0211', icon: '/assets/contact/substack.svg' },
      { label: 'medium', url: 'https://medium.com/@asthajha05', icon: '/assets/contact/medium.svg' },
      { label: 'github', url: 'https://github.com/asthajha0211', icon: '/assets/contact/github.svg' },
    ],
    illustrationSrc: '/assets/contact/illustration.png',
    illustrationAlt: 'illustration of a girl reading on the floor with a cat',
  },

  resumeUrl: 'https://drive.google.com/file/d/1DiFYRskhVdgH-BE7KLFveyS2aNniB69a/view?usp=drive_link',

  // Desktop positions are the original design. `mobileLeft`/`mobileTop` were
  // hand-placed by dragging every doodle into position at a phone viewport
  // (via Landing.tsx's `?arrange=1` debug mode) and are used as-is below sm.
  doodles: [
    { src: '/assets/landing/star-1.svg', left: '13.09%', top: '4.87%', width: 34, rotation: 0, opacity: 0.9, mobileLeft: '13.09%', mobileTop: '4.87%' },
    { src: '/assets/landing/coffee-cup.svg', left: '92%', top: '16.18%', width: 88, rotation: -7, opacity: 0.93, mobileLeft: '92%', mobileTop: '16.18%' },
    { src: '/assets/landing/plant.svg', left: '54.14%', top: '82.67%', width: 120, rotation: -4, opacity: 0.92, mobileLeft: '5.64%', mobileTop: '87.14%' },
    { src: '/assets/landing/cat-ears.svg', left: '18.36%', top: '88.84%', width: 92, rotation: -8, opacity: 0.88, mobileLeft: '84.03%', mobileTop: '29.4%' },
    { src: '/assets/landing/cloud-1.svg', left: '55.15%', top: '9.42%', width: 82, rotation: 0, opacity: 0.9, mobileLeft: '55.15%', mobileTop: '9.42%' },
    { src: '/assets/landing/water-bottle.svg', left: '33.1%', top: '87.13%', width: 54, rotation: 7, opacity: 0.9, mobileLeft: '33.1%', mobileTop: '87.13%' },
    { src: '/assets/landing/sun-face.svg', left: '91.44%', top: '1.02%', width: 94, rotation: 0, opacity: 0.92, mobileLeft: '87.11%', mobileTop: '-0.42%' },
    { src: '/assets/landing/star-2.svg', left: '3%', top: '15.67%', width: 40, rotation: 0, opacity: 0.9, mobileLeft: '3%', mobileTop: '15.67%' },
    { src: '/assets/landing/book-shelf.svg', left: '-1.09%', top: '75.05%', width: 108, rotation: 13, opacity: 0.92, mobileLeft: '-0.38%', mobileTop: '58.86%' },
    { src: '/assets/landing/cat-face.svg', left: '48.53%', top: '91.75%', width: 96, rotation: 0, opacity: 0.88, mobileLeft: '48.53%', mobileTop: '91.75%' },
    { src: '/assets/landing/notebook.svg', left: '0.16%', top: '46.18%', width: 104, rotation: 4, opacity: 0.92, mobileLeft: '0.83%', mobileTop: '34.91%' },
    { src: '/assets/landing/bookshelf-2.svg', left: '1.69%', top: '16.49%', width: 94, rotation: -4, opacity: 0.92, mobileLeft: '1.69%', mobileTop: '16.49%' },
    { src: '/assets/landing/flower-yellow.svg', left: '93.03%', top: '86.45%', width: 80, rotation: 12, opacity: 0.9, mobileLeft: '88.75%', mobileTop: '32.49%' },
    { src: '/assets/landing/guitar.svg', left: '85.13%', top: '83.18%', width: 78, rotation: -13, opacity: 0.92, mobileLeft: '83.48%', mobileTop: '73.67%' },
    { src: '/assets/landing/star-3.svg', left: '95%', top: '74.45%', width: 42, rotation: 0, opacity: 0.85, mobileLeft: '95%', mobileTop: '74.45%' },
    { src: '/assets/landing/boat.svg', left: '62.03%', top: '81.75%', width: 110, rotation: 0, opacity: 0.9, mobileLeft: '82.43%', mobileTop: '48.05%' },
    { src: '/assets/landing/cherry.svg', left: '52.39%', top: '-4.67%', width: 54, rotation: 4, opacity: 0.9, mobileLeft: '63.21%', mobileTop: '-0.14%' },
    { src: '/assets/landing/flower-pink.svg', left: '7.1%', top: '83.09%', width: 70, rotation: -9, opacity: 0.85, mobileLeft: '7.1%', mobileTop: '83.09%' },
    { src: '/assets/landing/flower-white.svg', left: '70.94%', top: '78.11%', width: 66, rotation: 8, opacity: 0.88, mobileLeft: '70.94%', mobileTop: '78.11%' },
    { src: '/assets/landing/boat-waves-sun.svg', left: '74.22%', top: '83.74%', width: 130, rotation: 0, opacity: 0.9, mobileLeft: '76.41%', mobileTop: '90.04%' },
    { src: '/assets/landing/star-4.svg', left: '34.21%', top: '-2.42%', width: 42, rotation: 0, opacity: 0.85, mobileLeft: '34.21%', mobileTop: '-2.42%' },
    { src: '/assets/landing/umbrella.svg', left: '38.25%', top: '82.22%', width: 96, rotation: 3, opacity: 0.88, mobileLeft: '75.76%', mobileTop: '89.13%' },
    { src: '/assets/landing/star-5.svg', left: '43.25%', top: '8.2%', width: 38, rotation: 0, opacity: 0.32, mobileLeft: '43.25%', mobileTop: '8.2%' },
    { src: '/assets/landing/whale.svg', left: '85.38%', top: '68.58%', width: 118, rotation: -4, opacity: 0.3, mobileLeft: '85.38%', mobileTop: '68.58%' },
    { src: '/assets/landing/ice-cream.svg', left: '11.02%', top: '76.88%', width: 48, rotation: -6, opacity: 0.28, mobileLeft: '11.02%', mobileTop: '76.88%' },
    { src: '/assets/landing/camera.svg', left: '84.4%', top: '12.93%', width: 96, rotation: 4, opacity: 0.2, mobileLeft: '86.08%', mobileTop: '21.23%' },
    { src: '/assets/landing/cloud-2.svg', left: '8.42%', top: '11%', width: 80, rotation: 0, opacity: 0.26, mobileLeft: '10.53%', mobileTop: '10.47%' },
    { src: '/assets/landing/cloud-3.svg', left: '83.32%', top: '-1.16%', width: 78, rotation: 0, opacity: 0.5, mobileLeft: '83.32%', mobileTop: '-1.16%' },
    { src: '/assets/landing/star-6.svg', left: '74.95%', top: '-1.62%', width: 40, rotation: 0, opacity: 0.3, mobileLeft: '74.95%', mobileTop: '-1.62%' },
    { src: '/assets/landing/planet-saturn.svg', left: '25.89%', top: '-2.6%', width: 94, rotation: 0, opacity: 0.92, mobileLeft: '25.89%', mobileTop: '-2.6%' },
    { src: '/assets/landing/planet-jupiter.svg', left: '65.08%', top: '-0.59%', width: 70, rotation: -6, opacity: 0.9, mobileLeft: '74.08%', mobileTop: '3.42%' },
    { src: '/assets/landing/planet-earth.svg', left: '78.25%', top: '5.85%', width: 62, rotation: 0, opacity: 0.9, mobileLeft: '89.16%', mobileTop: '10.47%' },
    { src: '/assets/landing/planet-uranus.svg', left: '6.09%', top: '2.08%', width: 58, rotation: 0, opacity: 0.5, mobileLeft: '6.09%', mobileTop: '2.08%' },
    { src: '/assets/landing/planet-neptune.svg', left: '39.95%', top: '-1.17%', width: 56, rotation: 0, opacity: 0.46, mobileLeft: '16.44%', mobileTop: '6.91%' },
    { src: '/assets/landing/planet-pluto.svg', left: '16.58%', top: '-2.24%', width: 56, rotation: 0, opacity: 0.3, mobileLeft: '16.58%', mobileTop: '-2.24%' },
    { src: '/assets/landing/planet-mars.svg', left: '46.69%', top: '1.47%', width: 58, rotation: 0, opacity: 0.3, mobileLeft: '46.69%', mobileTop: '1.47%' },
    { src: '/assets/landing/planet-venus.svg', left: '20.22%', top: '3.18%', width: 58, rotation: 0, opacity: 0.5, mobileLeft: '70.77%', mobileTop: '9.8%' },
    { src: '/assets/landing/planet-mercury.svg', left: '70.09%', top: '4.39%', width: 56, rotation: 0, opacity: 0.34, mobileLeft: '70.09%', mobileTop: '4.39%' },

    { src: '/assets/landing/moon.svg', left: '0.33%', top: '1.88%', width: 52, rotation: 0, opacity: 0.9, mobileLeft: '1.26%', mobileTop: '-5.81%' },
    { src: '/assets/landing/buildings.svg', left: '13.98%', top: '90.18%', width: 76, rotation: 0, opacity: 0.9, mobileLeft: '13.98%', mobileTop: '90.18%' },
    { src: '/assets/landing/pie.svg', left: '2.53%', top: '92.47%', width: 86, rotation: 0, opacity: 0.9, mobileLeft: '2.53%', mobileTop: '92.47%' },
    { src: '/assets/landing/people.svg', left: '23.52%', top: '91.59%', width: 128, rotation: 0, opacity: 0.92, mobileLeft: '15.79%', mobileTop: '93.82%' },
  ],
};
