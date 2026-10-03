/**
 * RUNI homepage content. Consumed by the new RUNI Home.jsx (built by Claude Code per the
 * brief). Different section order from KEAA: no manufacturing band, no certification marquee
 * of KEAA badges, no "42+ countries" counters.
 */
export const hero = {
  eyebrow: 'Eindhoven, The Netherlands',
  h1: 'Connecting Quality',
  /* Rotated one at a time under the h1 lead. Order runs light to heavy, ending on custom. */
  h1Phrases: [
    'Garden Hardware Solutions',
    'Indoor Hardware Solutions',
    'Scaffolding & Formwork Solutions',
    'Aluminium Solutions',
    'Livestock Housing Solutions',
    'Custom Hardware Solutions',
  ],
  /* Small caption under the headline. */
  strapline: 'Stocked in Eindhoven, delivered across Europe',
  // Video and poster keys are R2 asset keys once uploaded; until then use the poster only.
  media: { poster: null, video: null }, // set to RUNI R2 keys when photography arrives
};

export const proofStrip = [
  { label: 'Years serving Europe', value: '6+' },
  { label: 'Products in the range', value: '500+' },
  { label: 'Warehouse in Eindhoven', value: '600 m²' },
  { label: 'Quote turnaround', value: '1 working day' },
];

export const categoryTiles = [
  { n: '01', title: 'Scaffolding & Formwork', to: '/products/scaffolding-formworks', blurb: 'Ringlock, Cuplock, frames, props, couplers. Stocked for fast dispatch.' },
  { n: '02', title: 'Livestock Housing', to: '/products/livestock-housing-solutions', blurb: 'Cubicles, headlocks, feed barriers, gates. Supplied per shed layout.' },
  { n: '03', title: 'Wood Connectors & Garden Hardware', to: '/products/wood-connectors', blurb: 'Joist hangers, angle brackets, post supports, ground anchors, post caps.' },
  { n: '04', title: 'Aluminium Solutions', to: '/products/aluminium', blurb: 'RALUTECH rolling towers up to 850 cm working height, and every part separately.' },
];

export const whyRuni = {
  heading: 'What a European stockist changes',
  items: [
    { title: 'Stock, not lead times', body: 'Common lines sit in Eindhoven, so a short order ships in days rather than weeks.' },
    { title: 'One euro invoice', body: 'Dutch VAT, EU delivery, no import paperwork on your side.' },
    { title: 'Small and bulk', body: 'A mixed pallet for a site, or a container arranged direct from the factory for a distributor.' },
    { title: 'Custom on request', body: 'Special lengths, finishes or drawings manufactured through our partners in India and Asia, managed end to end.' },
  ],
};

export const solutions = [
  { title: 'Scaffolding contractors', to: '/solutions/scaffolding-contractors', body: 'Parts that fit the stock you already run.' },
  { title: 'Dairy and livestock farms', to: '/solutions/livestock-farms', body: 'Complete shed sets from cubicle to gate.' },
  { title: 'Timber and fencing trade', to: '/solutions/timber-and-fencing', body: 'Seasonal stock for merchants and installers.' },
  { title: 'Custom manufacturing', to: '/solutions/custom-manufacturing', body: 'Your drawing, our factory network.' },
];

export const ctaBand = {
  heading: 'Send us the list, we send back a price',
  body: 'Item codes, quantities and a delivery address are enough. Quotes for stock items within one working day.',
  primary: { label: 'Request a quote', to: '/contact?tab=rfq' },
  secondary: { label: 'Call +31 40 762 0144', href: 'tel:+31407620144' },
};
