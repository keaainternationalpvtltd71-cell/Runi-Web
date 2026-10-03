/**
 * RUNI search phrases and head tag builders. Same export names as KEAA's seoKeywords.js so
 * useSEO.js and ProductDetail.jsx keep working. Intent is SUPPLIER / STOCKIST / EU DELIVERY,
 * never manufacturer / exporter / India, so the two sites never compete for a phrase.
 * Keys are the exact `subcategory` strings in products.json.
 */
export const SITE = { name: 'RUNI Industries', url: 'https://runiindustries.eu', brand: 'RUNI' };

export const SUBCATEGORY_KEYWORDS = {
  /* Scaffolding & Formworks */
  'System Scaffolds-Ringlock': 'Ringlock Scaffolding',
  'System Scaffold-Cuplock': 'Cuplock Scaffolding',
  'System Scaffolds-HK': 'HK Scaffolding System',
  'Load Bearing System-Shoring Tower': 'Shoring Towers',
  'Accessories Jacks & Nuts': 'Scaffold Base Jacks and U Heads',
  'Access Scaffold-American Frame': 'H Frame Scaffolding',
  'Access Scaffold-Euro Frame': 'Euro Frame Scaffolding',
  'Slab Formwork System-Props': 'Adjustable Steel Props',
  'Slab Formwork System-Fork Heads': 'Fork Heads',
  'System Slab Formwork-Tripods': 'Prop Tripods',
  'Formwork-Accessories': 'Formwork Accessories',
  'Wall Formwork Systems-Clamps & Panels': 'Formwork Clamps and Panels',
  'Scaffold Tube Fitting-European': 'Scaffold Couplers EN 74',
  'Scaffold Tube Fitting-British & American': 'BS 1139 Scaffold Fittings',
  'Security Systems-Guard Rails & Railing Posts': 'Scaffold Guard Rails',
  'Trestles & Barriers': 'Builders Trestles and Barriers',
  /* Livestock */
  Cattle: 'Cattle Housing Equipment',
  Calves: 'Calf Pens',
  Sheep: 'Sheep Hurdles and Panels',
  Pigs: 'Pig Penning',
  Horse: 'Stable Equipment',
  'Field Gates': 'Galvanised Field Gates',
  /* Garden and wood */
  'Post Supports': 'Post Supports',
  'Adjustable Post Supports': 'Adjustable Post Supports',
  'Pole Anchors & Ground Plates': 'Ground Anchors and Ground Plates',
  'Post Caps': 'Post Caps',
  'Miscellaneous Products': 'Garden Hardware',
  'Indoor Wood Connectors': 'Joist Hangers and Timber Connectors',
};

/* Page titles, max 60 chars. Market word is "Netherlands" or "Europe", never "India". */
export const titles = {
  home: 'Scaffolding, Livestock & Post Hardware Supplier NL | RUNI',
  products: 'Steel Hardware Catalogue, Stocked in the Netherlands | RUNI',
  category: (kw) => `${kw} Supplier Netherlands | RUNI Industries`,
  subcategory: (kw) => `${kw} in Stock, Netherlands | RUNI`,
  product: (name, kw) => `${name} | ${kw} Supplier | RUNI`,
  about: 'About RUNI Industries, Eindhoven | Steel Hardware Supplier',
  quality: 'Quality and Standards | RUNI Industries',
  contact: 'Contact RUNI Industries, Eindhoven | Request a Quote',
  careers: 'Careers at RUNI Industries, Eindhoven',
};

/* Meta descriptions, max 160 chars. */
export const metas = {
  home: 'Scaffolding, formwork, livestock housing and post hardware supplied from stock in Eindhoven. Delivery across the Benelux and Europe. Request a quote.',
  products: '500+ steel hardware products for construction, farming and timber building, held in our Eindhoven warehouse. Filter by range and request a quote.',
  category: (kw) => `${kw} supplied from stock in the Netherlands with delivery across Europe. Small and bulk quantities, custom items on request. Quote within one working day.`,
  subcategory: (kw) => `${kw} in stock at RUNI Industries, Eindhoven. Galvanised steel, EU delivery, small quantities welcome. Request a quotation.`,
  product: (name, code) => `${name}${code ? ` (${code})` : ''} from RUNI Industries, Eindhoven. Supplied from stock or to order with delivery across Europe. Request a quote.`,
  about: 'RUNI Industries B.V. is an Eindhoven based importer and stockist of steel hardware with 6+ years serving European customers and a 600 m² warehouse.',
  contact: 'Call +31 40 762 0144, email info@runiindustries.eu or send an enquiry. Office and warehouse at Park Forum 1005, Eindhoven, Netherlands.',
};

export const SUBCATEGORY_KEY_RULE = 'One phrase per subcategory; used in its title, its products titles and its intro. Change all three together.';
