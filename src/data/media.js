/**
 * Curated media manifest.
 *
 * Primary source is RUNI's own site (runiindustries.eu), exported into public/media:
 * category photography, warehouse and logistics shots, and the RUNI logo. That site carries
 * no video of any kind, so there is no RUNI footage to show; the homepage leads with RUNI's
 * own warehouse photograph instead.
 *
 * The Cloudinary account is used only for the unbranded certification marks and the process
 * plates. Everything showing the manufacturing partner's identity is deliberately absent:
 *   - About_us_2          logo on the warehouse wall and crane beam
 *   - Ring_Lock_Final_*   logo watermarked into the top right of every frame (3 copies)
 *   - hero-keaa-cinematic and the other partner-plant footage
 *   - the staff portraits shot against a logo backdrop, and the logo files themselves
 *   - three of the four certificate scans. The EN 1065 prop certificates are RUNI's own but
 *     name the partner as the production site, and the EUROCERT attestation is not RUNI's at
 *     all. Only the EN 74-1 coupler certificate is publishable: it names RUNI as the
 *     manufacturer and gives the production site only as "AF India".
 */

import { aluminiumImages } from './aluminium.js';

const CLOUD = 'https://res.cloudinary.com/keaa-assets';
const up = (id) => `${CLOUD}/image/upload/${id}`;

/* RUNI's own brand and building. */
export const brand = {
  logo: '/media/site/logo.jpg',
  logoStacked: '/media/site/logo1.png',
};

/* Homepage hero: RUNI's warehouse. No video exists on runiindustries.eu to use here. */
export const hero = {
  image: '/media/site/slide01.jpg',
  alt: 'Racked warehouse stock ready for dispatch',
};

/* Wide shots used behind headings and as section breaks. */
export const scene = {
  warehouse: '/media/site/slide01.jpg',
  port: '/media/site/slide02.jpg',
  warehouseAisle: '/media/site/000.jpg',
  stockHall: '/media/site/about-bg.jpg',
  fittings: '/media/site/45.png',
  cattleBarn: '/media/site/image-11.jpg',
  scaffoldTower: '/media/site/image-12.jpg',
  connectors: '/media/site/image-13.jpg',
  city: '/media/site/image-3.png',
  handshake: '/media/site/image-4.png',
  postInField: '/media/site/rectangle-61.jpg',
  welding: '/media/scene/achieve-bg.jpg',
};

/* One image per product range. */
export const rangeImage = {
"scaffolding-formworks": "/media/category/system-scaffolds-ringlockwg5ln06-53-02.jpg",
  "livestock-housing-solutions": "/media/category/livestock-housing-solutiongreyb10-51-21.jpg",
  "wood-connectors": "/media/category/wood-connectorswj0ex10-07-37.png",
  aluminium: aluminiumImages.range,
};

/* One image per subcategory, from RUNI's own category photography. */
export const subImage = {
  "system-scaffolds-ringlock": "/media/category/system-scaffolds-ringlockwg5ln06-53-02.jpg",
  "system-scaffolds-hk": "/media/category/system-scaffolds-hks8asx10-34-40.jpg",
  "system-scaffold-cuplock": "/media/category/system-scaffold-cuplockrchm010-44-38.jpg",
  "load-bearing-system-shoring-tower": "/media/category/load-bearing-system-shoring-tower1yrr710-46-38.jpg",
  "accessories-jacks-nuts": "/media/category/system-scaffolds-accessories-jacks-nutsplmu510-48-32.jpg",
  "access-scaffold-american-frame": "/media/category/access-scaffold-american-framevfsst10-51-48.jpg",
  "slab-formwork-system-props": "/media/category/slab-formwork-system-propszbrte10-54-06.jpg",
  "slab-formwork-system-fork-heads": "/media/category/slab-formwork-system-fork-headsa3wxt10-56-42.jpg",
  "system-slab-formwork-tripods": "/media/category/system-slab-formwork-tripodsyo0tw10-57-31.jpg",
  "formwork-accessories": "/media/category/formwork-accessoriesk3tjd10-59-16.jpg",
  "wall-formwork-systems-clamps-panels": "/media/category/wall-formwork-systems-clamps-panelszprai11-00-07.jpg",
  "scaffold-tube-fitting-european": "/media/category/scaffold-tube-fitting-european3kxsy11-01-33.jpg",
  "scaffold-tube-fitting-british-american": "/media/category/scaffold-tube-fitting-british-americanu3ltj11-12-41.jpg",
  "security-systems-guard-rails-railing-posts": "/media/category/security-systems-guard-rails-railing-postsjndam11-15-03.jpg",
  "trestles-barriers": "/media/category/trestles-barriers7trjo11-17-30.jpg",
  "access-scaffold-euro-frame": "/media/category/access-scaffold-euro-framegbxoc11-20-38.jpg",
  "cattle": "/media/category/cattlehjccn10-55-16.jpg",
  "sheep": "/media/category/sheepqhwiu10-56-16.jpg",
  "field-gates": "/media/category/field-gatesodyhy11-25-11.jpg",
  "calves": "/media/category/calvesyhugf10-59-04.jpg",
  "pigs": "/media/category/pigsp7kx811-00-05.jpg",
  "horse": "/media/category/horseom7rw11-03-16.jpg",
  "indoor-wood-connectors": "/media/category/indoor-wood-connectorscjgoe10-55-38.jpg",
  "post-supports": "/media/category/post-supportsaz6sm11-07-17.jpg",
  "pole-anchors-ground-plates": "/media/category/pole-anchors-ground-platesn8gl710-48-54.jpg",
  "post-caps": "/media/category/pole-ornamentszgupd10-37-01.jpg",
  "miscellaneous-products": "/media/category/garden-accessoriesbnmvv10-34-32.jpg",
  "adjustable-post-supports": "/media/category/adjustable-post-supportsfxu5u11-39-08.jpg",
  "rolling-towers": aluminiumImages['rolling-towers'],
  "rolling-tower-components": aluminiumImages['rolling-tower-components'],
};

/* Rendered process plates for the Quality page. */
export const process = [
  { key: 'laser-sheet', title: 'Sheet laser cutting', image: up('Sheet_laser_Cutting_oa7ib6') },
  { key: 'laser-tube', title: 'Tube laser cutting', image: up('Tube_Laser_Cutting_mx4lc9') },
  { key: 'press-brake', title: 'CNC press brake forming', image: up('CNC_Press_Brake_tcsl3k') },
  { key: 'welding', title: 'Robotic welding', image: up('Robotic_Welding_Stations_vnvqos') },
  { key: 'galvanising', title: 'Hot dip galvanising', image: up('Hot_Dip_Galvanizing_Plant_ze1vep') },
  { key: 'powder', title: 'Powder coating', image: up('Automatic_Powder_Coating_Plant_guv3pr') },
];

/* The one certificate scan that can be published. See the note at the top of this file. */
export const certificateScan = {
  'en74-couplers': up('9137-9_Certificate-of-Conformity_RA_SW-coupler_2026-07-31_zykes2'),
};

/* Scheme marks only: no company name appears on any of these. */
export const standards = [
  { key: 'iso', label: 'ISO 9001 / 14001 / 45001', image: up('ISO_9001_14001_45001_wrszlx') },
  { key: 'tuv', label: 'TÜV Rheinland ISO 9001:2015', image: up('ChatGPT_Image_23_Sept_2026_10_59_42_p9trct') },
  { key: 'ce', label: 'CE marked to ETA', image: up('CE_Certified_heisan') },
  { key: 'en1065', label: 'Props to EN 1065, couplers to EN 74-1', image: up('ChatGPT_Image_23_Sept_2026_10_48_14_x1gpjq') },
  { key: 'galv', label: 'Hot dip galvanising to EN ISO 1461', image: up('ChatGPT_Image_23_Sept_2026_10_48_56_ec1d2o') },
  { key: 'en1090', label: 'EN 1090-1 factory production control', image: up('DIN_EN_1090-1_fwxhqh') },
  { key: 'slv', label: 'SLV Mannheim welding qualification', image: up('EN_1090_Part_2_and_Part_3_dp5fl6') },
  { key: 'bsci', label: 'BSCI social compliance', image: up('BSCI_Compliant_epigki') },
  { key: 'ctpat', label: 'C-TPAT supply chain security', image: up('Ct-PAT_z5gdra') },
  { key: 'cto', label: 'Environmental compliance', image: up('CTO_CTE_xtttnf') },
];
