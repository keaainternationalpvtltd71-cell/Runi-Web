/**
 * RUNI Industries B.V. entity data. Replaces the shared company.js in the RUNI fork.
 * Every field marked [VERIFY] was not found on runiindustries.eu or in the source repo and must be
 * confirmed by RUNI before launch. Do not ship a [VERIFY] value.
 * Facts sourced from: runiindustries.eu (About and footer, read 25 Sept 2026) and the
 * salesOffice block of the source company.js (same address and mobile).
 */
export const company = {
  name: 'RUNI Industries B.V.',
  shortName: 'RUNI',
  legalForm: 'B.V.',
  tagline: 'Metal hardware, stocked and supplied from Eindhoven.',
  founded: 2019, // [VERIFY] old site says "over 6 years of experience" as of 2026
  kvk: null, // fill in before launch
  vat: null, // fill in before launch
  description:
    'RUNI Industries B.V. is an Eindhoven based importer, stockist and supplier of steel hardware for construction, agriculture and timber building. From a 600 square metre warehouse in the Netherlands, RUNI supplies scaffolding and formwork components, livestock housing equipment, garden and post hardware and indoor wood connectors to customers across Europe, and arranges custom manufactured items on request through its manufacturing partners in India and Asia.',

  headOffice: {
    label: 'Office and Warehouse',
    line1: 'Park Forum 1005',
    line2: '5657 HJ Eindhoven, The Netherlands',
    country: 'Netherlands',
    countryCode: 'NL',
    warehouseSqm: 600,
  },

  phones: ['+31 40 762 0144', '+31 40 762 0100', '+31 65 528 2244'], // 0100 from the old Contact Us page and the rolling tower catalogue
  whatsappNumber: '+31 65 528 2244', // [VERIFY] which line has WhatsApp
  emails: ['info@runiindustries.eu', 'bg@runiindustries.eu'], // bg@ from the rolling tower catalogue
  website: 'runiindustries.eu',
  openingHours: null, // e.g. 'Monday to Friday 08:30 to 17:00 CET'
  languagesSpoken: ['Dutch', 'English'],

  /* runiindustries.eu links only to the bare linkedin.com / instagram.com homepages, so no real
     profile exists to copy. Fill in a company page URL and the footer shows its icon. */
  social: {
    linkedin: null,
    instagram: null,
    whatsapp: 'https://wa.me/31655282244', // [VERIFY]
  },

  /* Only figures the old site states. Never pad this list. */
  stats: [
    { label: 'Years serving Europe', value: '6+' },
    { label: 'Products in the range', value: '500+' },
    { label: 'Warehouse in Eindhoven', value: '600 m²' },
  ],

  /* From the old site's Services section, reworded, no new claims. */
  services: [
    { title: 'Stock in the Netherlands', body: 'Core scaffolding, livestock and hardware lines held in Eindhoven for delivery across the Benelux and wider Europe.' },
    { title: 'Custom manufactured on request', body: 'Items outside the standard range produced to your drawing through our manufacturing partners in India and Asia.' },
    { title: 'End to end logistics', body: 'Air, sea and road freight arranged from origin to your yard, including full and part container loads.' },
    { title: 'Documentation handled', body: 'Import documentation, certificates of conformity and customs paperwork managed on your behalf.' },
    { title: 'Support after delivery', body: 'A Netherlands based team available by phone and email after the goods arrive.' },
  ],

  /* The manufacturing partner is never named on this site: no partner line, no hreflang, no cross
     canonical, no shared schema. scripts/check-brand.mjs fails the build if the name ships. */
};
