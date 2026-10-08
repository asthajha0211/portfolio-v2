export interface Project {
  slug: string;
  title: string;
  blurb: string;
  tag: string;
  image: string;
  imageAlt: string;
  heroImage?: string;
  heroImageAlt?: string;
  date: string;
  body: string;
  externalUrl?: string;
}
