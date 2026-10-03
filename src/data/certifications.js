/**
 * Certifications shown on /certifications, in one grid.
 *
 * The first three are certificates of conformity in RUNI Industries B.V.'s own name, read off
 * the certificates themselves. Only 9 137 - 9 / Z may be published as a scan: it names RUNI as
 * the manufacturer and gives the production site only as "AF India". The two prop certificates
 * name the manufacturing partner as the production site, so they are sent on request.
 *
 * The rest are the management system and production schemes held at the manufacturing site.
 * They are shown with their scheme marks only and worded as the production site's, never as
 * RUNI's own certificates.
 */
import { certificateScan, standards } from './media.js';

const mark = Object.fromEntries(standards.map((s) => [s.key, s.image]));

export const certificates = [
  {
    key: 'en74-couplers',
    number: '9 137 - 9 / Z',
    title: 'Right angle and swivel couplers, EN 74-1',
    issuer: 'SIGMA KARLSRUHE GmbH',
    body: 'Right angle coupler to EN 74-1 class B/BB and swivel coupler to EN 74-1 class B, issued to RUNI Industries B.V. on the results of factory production control, against DIN EN 74-1:2022-09.',
    image: certificateScan['en74-couplers'],
    scan: true,
  },
  {
    key: 'en1065-bd',
    number: '9 152 - 2 / Z',
    title: 'Adjustable telescopic steel props, EN 1065',
    issuer: 'SIGMA KARLSRUHE GmbH',
    body: 'Adjustable telescopic steel props with calculated load-bearing capacity, types KI BD25, KI BD30, KI BD35 and KI BD40, issued to RUNI Industries B.V. on the results of factory production control.',
    image: mark.en1065,
  },
  {
    key: 'en1065-b30',
    number: '9 220 - 1 / Z',
    title: 'Adjustable telescopic steel prop, class B30',
    issuer: 'SIGMA KARLSRUHE GmbH',
    body: 'Adjustable telescopic steel prop with calculated load-bearing capacity, class B30, issued to RUNI Industries B.V. on the results of factory production control.',
    image: mark.en1065,
  },
];

const productionSite = [
  { key: 'iso-9001', title: 'ISO 9001:2015, Quality Management', issuer: 'TÜV Rheinland', body: 'Quality management system at the production site for sheet-metal and fabricated components: scaffolding, formwork, garden hardware and livestock products.', image: mark.tuv },
  { key: 'iso-14001-45001', title: 'ISO 14001 and ISO 45001', issuer: 'TÜV Rheinland', body: 'Environmental management and occupational health and safety management systems at the production site.', image: mark.iso },
  { key: 'ce', title: 'CE marking to ETA', issuer: 'European Technical Assessment', body: 'CE marking against a European Technical Assessment for the product families that carry it.', image: mark.ce },
  { key: 'en-iso-1461', title: 'Hot dip galvanising, EN ISO 1461', issuer: 'Third-party inspection', body: 'Hot dip galvanised coatings to EN ISO 1461, with third-party inspection reports where the item has been inspected.', image: mark.galv },
  { key: 'en1090-1', title: 'EN 1090-1 factory production control', issuer: 'Factory production control', body: 'Factory production control for structural steel components to EN 1090-1.', image: mark.en1090 },
  { key: 'en1090-2-3', title: 'EN 1090-2 and EN 1090-3 welding qualification', issuer: 'SLV Mannheim', body: 'Welding qualification for steel and aluminium structures under EN 1090 parts 2 and 3.', image: mark.slv },
  { key: 'bsci', title: 'BSCI social compliance', issuer: 'amfori BSCI', body: 'Social compliance audit of working conditions at the production site.', image: mark.bsci },
  { key: 'ctpat', title: 'C-TPAT supply chain security', issuer: 'U.S. Customs and Border Protection', body: 'Supply chain security programme covering export consignments from the production site.', image: mark.ctpat },
  { key: 'cte-cto', title: 'Consent to establish and operate', issuer: 'Environmental compliance', body: 'Environmental consents under which the production site is established and operated.', image: mark.cto },
];

export const certifications = [...certificates, ...productionSite];
