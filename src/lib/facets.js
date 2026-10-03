/**
 * Facets for the category listing sidebar: product type, finish and tube size.
 *
 * The product data is a scraped catalogue: `specs` labels are inconsistent ("Finish", "FINISH",
 * "Corrosion Protection") and values are long sentences ("Hot Dip Galvanized as per ISO 1461
 * with minimum coating thickness of 55 microns"). So finish and tube size are derived by
 * matching the raw spec text, and product type is derived from the product name, which is the
 * only field present on every product.
 */

/* Ordered: the first rule that matches a name wins, so specific terms sit above generic ones. */
const TYPE_RULES = [
  ['Gates & Panels', /\b(gate|panel|hurdle|barrier|fence|fencing|railing|partition|pen|divider|cubicle|stall)\b/i],
  ['Couplers & Clamps', /\b(coupler|clamp|clip|cuplock|swivel|wedge|tie|hook|bracket)\b/i],
  ['Feeders & Drinkers', /\b(feeder|feed|trough|drinker|bowl|bucket|pail|manger|hay|water)\b/i],
  ['Connectors & Fittings', /\b(connector|fitting|anchor|plate|strip|hanger|joist|purlin|angle|perforated|nail|screw|bolt)\b/i],
  ['Heads & Tripods', /\b(head|tripod|fork|prop|shore|shoring)\b/i],
  ['Supports & Anchors', /\b(support|anchor|base|post|standard|ledger|brace|girder|frame|tower|stand)\b/i],
  ['Jacks & Nuts', /\b(jack|nut|thread|spindle)\b/i],
  ['Platforms & Boards', /\b(plank|board|platform|deck|step|stair|ladder|toe)\b/i],
];

export function productType(p) {
  if (p.type) return p.type;
  const name = String(p.name || '');
  for (const [label, re] of TYPE_RULES) if (re.test(name)) return label;
  return 'Other';
}

/* Canonical finishes, most specific first ("hot dip galvanized" must beat plain "galvanized"). */
const FINISH_RULES = [
  ['Hot Dip Galvanized', /hot\s*dip\s*galvani[sz]ed/i],
  ['Stainless Steel', /stainless\s*steel/i],
  ['Powder Coated', /(powder|power)\s*coated/i],
  ['Painted', /\bpaint(ed)?\b|\bEZP\b/i],
  ['Galvanized', /galvani[sz]ed|\bzinc\b|\bZ\s?275\b/i],
];

const specText = (p) => (p.specs || []).map((s) => `${s.label} ${s.value}`).join(' · ');

export function finishes(p) {
  const text = specText(p);
  const out = [];
  for (const [label, re] of FINISH_RULES) if (re.test(text)) out.push(label);
  // "Hot Dip Galvanized" already implies galvanised; don't list both.
  return out.includes('Hot Dip Galvanized') ? out.filter((f) => f !== 'Galvanized') : out;
}

/* Tube / pipe outside diameters, read from any spec that talks about a tube, pipe or diameter. */
export function tubeSizes(p) {
  const out = new Set();
  for (const s of p.specs || []) {
    const label = String(s.label || ''), value = String(s.value || '');
    const about = /tube|pipe|diameter|Ø|dia\b|od\b/i.test(label) || /[Øø]/.test(value);
    if (!about) continue;
    for (const m of value.matchAll(/[Øø]?\s*(\d{2,3}(?:\.\d)?)\s*mm/gi)) {
      const d = parseFloat(m[1]);
      if (d >= 10 && d <= 300) out.add(`Ø${m[1]} mm`);   // above this it is a length, not a bore
    }
  }
  return [...out];
}

/* One pass over a product list -> the three facet groups with counts, biggest first. */
export function buildFacets(list) {
  const tally = (fn) => {
    const m = new Map();
    for (const p of list) for (const v of [].concat(fn(p))) if (v) m.set(v, (m.get(v) || 0) + 1);
    return [...m].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([value, count]) => ({ value, count }));
  };
  return {
    type: tally(productType),
    finish: tally(finishes),
    tube: tally(tubeSizes),
  };
}

/* Does a product satisfy every active facet group? (within a group the checks are OR'd) */
export function matchesFacets(p, active) {
  if (active.type?.length && !active.type.includes(productType(p))) return false;
  if (active.finish?.length && !finishes(p).some((f) => active.finish.includes(f))) return false;
  if (active.tube?.length && !tubeSizes(p).some((t) => active.tube.includes(t))) return false;
  return true;
}
