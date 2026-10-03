/**
 * RUNI main navigation. Same shape as KEAA's mainNav (key, label, to, desc, children) so
 * Header.jsx and NavPanel.jsx render it unchanged. Labels are the English fallback; nl/de/fr
 * come from the locale files.
 */
import { certificates } from './certifications.js';

const certificateLinks = certificates.map((c) => ({
  label: c.title,
  to: `/certifications#${c.key}`,
  desc: `No. ${c.number} · ${c.issuer}`,
  image: c.image,
}));

export const mainNav = [
  { key: 'nav.home', label: 'Home', to: '/' },
  {
    key: 'nav.products', label: 'Products', to: '/products',
    children: [
      { label: 'Scaffolding & Formwork', to: '/products/scaffolding-formworks', desc: 'System scaffolds, frames, props, couplers, stocked in Eindhoven' },
      { label: 'Livestock Housing', to: '/products/livestock-housing-solutions', desc: 'Cattle, sheep, pig and horse equipment, field gates, feeders' },
      { label: 'Wood Connectors', to: '/products/wood-connectors', desc: 'Joist hangers, angle brackets, perforated plates' },
      { label: 'Aluminium Solutions', to: '/products/aluminium', desc: 'RALUTECH rolling towers, frames, decks and stabilisers' },
    ],
  },
  {
    key: 'nav.about', label: 'About', to: '/about',
    children: [
      { label: 'Certifications', to: '/certifications', desc: 'Certificates of conformity and the standards we work to' },
      ...certificateLinks,
    ],
  },
  { key: 'nav.quality', label: 'Quality', to: '/quality' },
  { key: 'nav.contact', label: 'Contact', to: '/contact' },
];

export const footerNav = {
  company: [
    { label: 'About RUNI', to: '/about' },
    { label: 'Quality and standards', to: '/quality' },
    { label: 'Certifications', to: '/certifications' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
  ],
  legal: [
    { label: 'Privacy policy', to: '/privacy-policy' },
    { label: 'Cookie policy', to: '/cookie-policy' },
    { label: 'Terms and conditions', to: '/terms' },
  ],
};
