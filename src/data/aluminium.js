/**
 * RALUTECH aluminium rolling towers, published as a regular catalogue category.
 *
 * Every figure is taken from the RUNI Rolling Tower Catalogue. Where the catalogue does not
 * state a specification it is left out rather than inferred. Photography lives in the shared
 * R2 bucket under 2.runi-assets/runi-web/ (migrated 2026-10-07 from RUNI's own Cloudinary
 * cloud; map in keaa-website docs/media-migration/manifest-runi.csv).
 */

const ri = (key) => `https://media.keaainternational.com/${key}`;

const CATEGORY = 'Aluminium Solutions';
const TOWERS = 'Rolling Towers';
const COMPONENTS = 'Rolling Tower Components';

const photo = {
  warehouse: ri('2.runi-assets/runi-web/qrlrj63uh603v3fifn7f.jpg'),
  ceiling: ri('2.runi-assets/runi-web/k8nh8e04ydbcqpsfnmrf.jpg'),
  site: ri('2.runi-assets/runi-web/ymuochprymentqvletrf.jpg'),
  house75: ri('2.runi-assets/runi-web/ol0wruhwiugycxcml0ie.jpg'),
  house150: ri('2.runi-assets/runi-web/dqmamqxwo9iqpk9cmx8f.jpg'),
};

export const aluminiumImages = {
  range: photo.warehouse,
  'rolling-towers': photo.house150,
  'rolling-tower-components': photo.ceiling,
};

export const aluminiumIntro =
  'RALUTECH is a lightweight aluminium mobile scaffolding tower. It is a plug-in system that mounts without tools, built forward-running so it can be erected by one person up to a working height of 6 metres. Platforms with a hatch give a closed working surface, the decks are lightweight plywood, and the castors lock.';

const FEATURES = 'Plug-in system, mountable without tools. Forward-running construction, installed by one person up to 6 m working height. Platforms with hatch for a closed work surface. Lightweight plywood deck and lockable castor wheels.';

/* Bill of components per configuration, from the catalogue's configuration pages. */
const bill = {
  'R-311002': [['Castors', 4], ['Base frames 75 cm', 2], ['Ladder frames 75 × 100', 2], ['Ladder frames 75 × 200', 2], ['Horizontal braces', 4], ['Diagonal braces', 2], ['Triangular stabilisers, small', 4], ['Standard decks', 1], ['Decks with hatch', 1], ['Hook-in ladders', 1], ['Clips', 4], ['Toe boards', 1]],
  'R-311004': [['Castors', 4], ['Base frames 75 cm', 2], ['Ladder frames 75 × 100', 2], ['Ladder frames 75 × 200', 4], ['Horizontal braces', 8], ['Diagonal braces', 3], ['Triangular stabilisers, large', 4], ['Standard decks', 1], ['Decks with hatch', 2], ['Hook-in ladders', 2], ['Clips', 8], ['Toe boards', 1]],
  'R-311006': [['Castors', 4], ['Base frames 75 cm', 2], ['Ladder frames 75 × 100', 2], ['Ladder frames 75 × 200', 6], ['Horizontal braces', 12], ['Diagonal braces', 4], ['Triangular stabilisers, large', 4], ['Standard decks', 1], ['Decks with hatch', 3], ['Hook-in ladders', 3], ['Clips', 12], ['Toe boards', 1]],
  'R-312002': [['Castors', 4], ['Base frames 150 cm', 2], ['Ladder frames 150 × 100', 2], ['Ladder frames 150 × 200', 2], ['Horizontal braces', 6], ['Diagonal braces', 2], ['Triangular stabilisers, small', 4], ['Standard decks', 2], ['Decks with hatch', 1], ['Hook-in ladders', 1], ['Clips', 4], ['Toe boards', 1]],
  'R-312004': [['Castors', 4], ['Base frames 150 cm', 2], ['Ladder frames 150 × 100', 2], ['Ladder frames 150 × 200', 4], ['Horizontal braces', 10], ['Diagonal braces', 4], ['Triangular stabilisers, large', 4], ['Standard decks', 3], ['Decks with hatch', 2], ['Hook-in ladders', 2], ['Clips', 8], ['Toe boards', 1]],
  'R-312006': [['Castors', 4], ['Base frames 150 cm', 2], ['Ladder frames 150 × 100', 2], ['Ladder frames 150 × 200', 6], ['Horizontal braces', 14], ['Diagonal braces', 6], ['Triangular stabilisers, large', 4], ['Standard decks', 4], ['Decks with hatch', 3], ['Hook-in ladders', 3], ['Clips', 12], ['Toe boards', 1]],
};

const towers = [
  { code: 'R-311002', size: '75 × 250 cm', elevation: '250 cm', working: '450 cm', note: 'Base configuration, supplied with anti-fall protection.', images: [ri('2.runi-assets/runi-web/crgyb119cygvsb7hcvcj.jpg'), photo.house75] },
  { code: 'R-311004', size: '75 × 250 cm', elevation: '250 cm', working: '450 cm', note: 'Higher configuration with large triangular stabilisers.', images: [ri('2.runi-assets/runi-web/ljwmcyy3qvgxugidfegk.jpg'), photo.house75] },
  { code: 'R-311006', size: '75 × 250 cm', elevation: '650 cm', working: '850 cm', note: 'Tallest 75 cm wide configuration.', images: [ri('2.runi-assets/runi-web/ujefe2956msng5chpurn.jpg'), photo.house75] },
  { code: 'R-312002', size: '150 × 250 cm', elevation: '250 cm', working: '450 cm', note: 'Base configuration, supplied with anti-fall protection.', images: [ri('2.runi-assets/runi-web/qwmj2wjy6mupav4dn2tq.jpg'), photo.house150] },
  { code: 'R-312004', size: '150 × 250 cm', elevation: '250 cm', working: '450 cm', note: 'Higher configuration with large triangular stabilisers.', images: [ri('2.runi-assets/runi-web/m2kpgpzv2bjt09wpfklg.jpg'), photo.house150] },
  { code: 'R-312006', size: '150 × 250 cm', elevation: '650 cm', working: '850 cm', note: 'Tallest 150 cm wide configuration.', images: [ri('2.runi-assets/runi-web/m2kpgpzv2bjt09wpfklg.jpg'), photo.house150] },
];

/* Named in the catalogue with photography but no specification. */
const otherSystems = [
  { slug: 'ralutech-pro-profi', name: 'RALUTECH Pro / Profi', images: [ri('2.runi-assets/runi-web/xgcb7jtb3xsznfolz0n1.jpg'), ri('2.runi-assets/runi-web/ep9aizjsmhsrcn1c4ect.jpg')] },
  { slug: 'ralutech-r-telescopic', name: 'RALUTECH R Telescopic', images: [ri('2.runi-assets/runi-web/axeid8jucjzzpq12f61p.jpg'), ri('2.runi-assets/runi-web/vts2ghurpuc2sc5zcux4.jpg')] },
];

/* Components and accessories. `specs` are [label, value] pairs as printed in the catalogue. */
const components = [
  { slug: 'ralutech-base-frame', name: 'RALUTECH Base Frame', type: 'Frames', codes: ['RALU-323075', 'RALU-333150'], specs: [['RALU-323075', '75 cm wide, 40 cm high, 1.7 kg'], ['RALU-333150', '150 cm wide, 40 cm high, 2.3 kg'], ['Material', 'Aluminium']], body: 'High-quality aluminium in an extremely stable execution.', image: ri('2.runi-assets/runi-web/l8ru6okb2icxts7vgzjb.jpg') },
  { slug: 'ralutech-ladder-frame', name: 'RALUTECH Ladder Frame', type: 'Frames', codes: ['RALU-324100', 'RALU-324200', 'RALU-334100', 'RALU-334200'], specs: [['RALU-324100', '75 × 100 cm, 3.4 kg'], ['RALU-324200', '75 × 200 cm, 6.2 kg'], ['RALU-334100', '150 × 100 cm, 4.6 kg'], ['RALU-334200', '150 × 200 cm, 8.6 kg'], ['Material', 'Aluminium, non-slip rungs']], body: 'High-quality aluminium in an extremely stable execution, with non-slip rungs.', image: ri('2.runi-assets/runi-web/zkmhponcaxffi2fnvlic.jpg') },
  { slug: 'ralutech-horizontal-brace', name: 'RALUTECH Horizontal Brace', type: 'Braces', codes: ['RALU-150250', 'RALU-153250'], specs: [['Length', '250 cm'], ['Weight', '2.5 kg'], ['Material', 'Aluminium']], body: 'Extremely sturdy suspension hooks, with length designation and colour marking.', image: ri('2.runi-assets/runi-web/kchz1qyhxwadydxsswix.jpg') },
  { slug: 'ralutech-diagonal-brace', name: 'RALUTECH Diagonal Brace', type: 'Braces', codes: ['RALU-355250'], specs: [['Diagonal', '100 × 250 cm'], ['Length', '270 cm'], ['Weight', '2.8 kg'], ['Material', 'Aluminium']], body: 'Extremely sturdy suspension hooks, with length designation and colour marking.', image: ri('2.runi-assets/runi-web/uuypdvo3er8hnfqpufis.jpg') },
  { slug: 'ralutech-castor-with-spindle-and-brake', name: 'RALUTECH Castor with Spindle and Brake', type: 'Castors', codes: ['RALU-525020'], specs: [['Wheel diameter', '20 cm'], ['Height', '80 cm'], ['Weight', '8.1 kg'], ['Load capacity', '700 kg stationary / 1190 kg']], body: 'Extremely robust, height adjustable castor with brake.', images: [ri('2.runi-assets/runi-web/koglaomvajaiwrawtigw.jpg'), ri('2.runi-assets/runi-web/g96smfkfwucrazvdy4xn.jpg')] },
  { slug: 'ralutech-aluminium-plywood-deck', name: 'RALUTECH Aluminium-Plywood Deck', type: 'Decks', codes: ['RALU-320250'], specs: [['Length', '250 cm'], ['Width', '68 cm'], ['Weight', '15.9 kg'], ['Load capacity', '200 kg/m²']], body: 'Extremely robust and non-slip, with wind protection.', image: ri('2.runi-assets/runi-web/ck0tmtkcnfwoamlrrl8v.jpg') },
  { slug: 'ralutech-aluminium-plywood-deck-with-hatch', name: 'RALUTECH Aluminium-Plywood Deck with Hatch', type: 'Decks', codes: ['RALU-321250'], specs: [['Length', '250 cm'], ['Width', '68 cm'], ['Weight', '14.1 kg'], ['Load capacity', '200 kg/m²']], body: 'Hatch deck for a closed working surface. Extremely robust and non-slip, with wind protection.', image: ri('2.runi-assets/runi-web/nj32q7ter5ecln1ytosx.jpg') },
  { slug: 'ralutech-hook-in-ladder', name: 'RALUTECH Hook-in Ladder', type: 'Ladders & Toe Boards', codes: ['RALU-318201'], specs: [['Type', '200'], ['Length', '213 cm'], ['Width', '33 cm'], ['Weight', '9.3 kg'], ['Material', 'Steel, lightweight construction']], body: 'Steel hook-in ladder in a lightweight construction.', image: ri('2.runi-assets/runi-web/hjsegtlvmw4mjtdsgffe.jpg') },
  { slug: 'ralutech-toe-board', name: 'RALUTECH Toe Board', type: 'Ladders & Toe Boards', codes: ['RALU-350250', 'RALU-351250'], specs: [['RALU-350250', '250 × 75 cm, 4.5 kg'], ['RALU-351250', '250 × 150 cm, 5.3 kg'], ['Material', 'Plywood, foldable']], body: 'Foldable plywood toe board.', images: [ri('2.runi-assets/runi-web/ouq3rsja5wx0itnbemtm.jpg'), ri('2.runi-assets/runi-web/vt6z86pcgy2avllqsyqz.jpg')] },
  { slug: 'ralutech-triangular-stabiliser-small', name: 'RALUTECH Triangular Stabiliser, Small', type: 'Stabilisers & Clips', codes: ['RALU-368210'], specs: [['Length', '230 cm'], ['Weight', '4.5 kg']], body: 'Short and adjustable, ensures a high level of safety.', image: ri('2.runi-assets/runi-web/efyohixmsixavhp92xiq.jpg') },
  { slug: 'ralutech-triangular-stabiliser-large', name: 'RALUTECH Triangular Stabiliser, Large', type: 'Stabilisers & Clips', codes: ['RALU-368310'], specs: [['Length', '315 cm'], ['Weight', '6.0 kg']], body: 'Large and adjustable, ensures a high level of safety.', image: ri('2.runi-assets/runi-web/ryjxzz2vggclxklb6ond.jpg') },
  { slug: 'ralutech-clip', name: 'RALUTECH Clip', type: 'Stabilisers & Clips', codes: ['RALU-169012'], specs: [['Weight', '0.04 kg'], ['Material', 'Steel']], body: 'Short steel clip that connects the frames.', image: ri('2.runi-assets/runi-web/ohzllpk9hf3syygitpa1.jpg') },
];

const spec = (label, value) => ({ label, value: String(value) });

/* Ids sit well above the shared catalogue's range so they never collide. */
let nextId = 9001;

const towerProducts = towers.map((t) => ({
  category: CATEGORY, subcategory: TOWERS, type: 'Rolling Towers',
  slug: `ralutech-rolling-tower-${t.code.toLowerCase()}`, id: nextId++,
  name: `RALUTECH Rolling Tower ${t.size}, ${t.code}`, itemCode: t.code,
  description: `RALUTECH aluminium rolling tower, ${t.size}, platform height ${t.elevation}, working height ${t.working}. ${t.note} ${FEATURES}`,
  specs: [
    spec('Article no.', t.code), spec('Size', t.size), spec('Platform height', t.elevation), spec('Working height', t.working),
    spec('Material', 'Aluminium'), ...bill[t.code].map(([part, qty]) => spec(part, `${qty} pcs`)),
  ],
  cloudinaryImages: t.images,
}));

const systemProducts = otherSystems.map((s) => ({
  category: CATEGORY, subcategory: TOWERS, type: 'Rolling Towers',
  slug: s.slug, id: nextId++, name: s.name, itemCode: '',
  description: `${s.name} rolling tower system from the RALUTECH range. Full specifications on request.`,
  specs: [], cloudinaryImages: s.images,
}));

const componentProducts = components.map((c) => ({
  category: CATEGORY, subcategory: COMPONENTS, type: c.type,
  slug: c.slug, id: nextId++, name: c.name, itemCode: c.codes.join(', '),
  description: `${c.name}. ${c.body}`,
  specs: [spec('Article no.', c.codes.join(', ')), ...c.specs.map(([l, v]) => spec(l, v))],
  cloudinaryImages: c.images || [c.image],
}));

export const aluminiumProducts = [...towerProducts, ...systemProducts, ...componentProducts];

export const aluminiumCategory = {
  name: CATEGORY,
  slug: 'aluminium',
  count: aluminiumProducts.length,
  subcategories: [
    { name: TOWERS, slug: 'rolling-towers', count: towerProducts.length + systemProducts.length },
    { name: COMPONENTS, slug: 'rolling-tower-components', count: componentProducts.length },
  ],
};
