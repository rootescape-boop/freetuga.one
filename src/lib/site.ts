import settings from '../data/site.json';
import { sections } from './sections';

export const site = settings;

export const nav = [
  { label: sections.materials.label, href: '/materials' },
  { label: sections.faq.label, href: '/faq' },
  { label: sections.releases.label, href: '/releases' },
  { label: sections.software.label, href: '/software' },
  { label: 'Теги', href: '/tags' },
  { label: 'О проекте', href: '/about' },
];
