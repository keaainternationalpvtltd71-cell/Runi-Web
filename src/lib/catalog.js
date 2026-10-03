import sharedProducts from '../data/products.json';
import sharedCategories from '../data/categories.json';
import { aluminiumCategory, aluminiumProducts } from '../data/aluminium.js';
import { SUBCATEGORY_KEYWORDS } from '../data/seoKeywords.js';

const products = [...sharedProducts, ...aluminiumProducts];
const categories = [...sharedCategories, aluminiumCategory];

export const slugify = (s) => String(s).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const catBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
const catByName = Object.fromEntries(categories.map((c) => [c.name, c]));
const subBySlug = {};
for (const c of categories) for (const s of c.subcategories) subBySlug[s.slug] = { ...s, category: c };
const subByName = Object.fromEntries(Object.values(subBySlug).map((s) => [s.name, s]));

export const allCategories = categories;
export const getCategory = (slug) => catBySlug[slug];
export const getSubcategory = (slug) => subBySlug[slug];
export const keywordFor = (sub) => SUBCATEGORY_KEYWORDS[sub.name] || SUBCATEGORY_KEYWORDS[sub.name.replace(' - ', '-')] || sub.name;

export const allProducts = products.map((p) => {
  const cat = catByName[p.category];
  const sub = subByName[p.subcategory] || subByName[p.subcategory.replace(' - ', '-')];
  const catSlug = cat ? cat.slug : slugify(p.category);
  const subSlug = sub ? sub.slug : slugify(p.subcategory);
  const desc = /keaa/i.test(p.description || '') ? `${p.name}: ${sub ? keywordFor(sub) : p.subcategory} component in the ${p.category.replace(' & ', ' and ')} range, supplied by RUNI Industries from Eindhoven.` : (p.description || `${p.name}, supplied by RUNI Industries.`);
  return { ...p, description: desc, catSlug, subSlug, path: `/products/${catSlug}/${subSlug}/${p.slug}`, image: p.cloudinaryImages?.[0] || null, keyword: sub ? keywordFor(sub) : p.subcategory };
});
const prodByPath = Object.fromEntries(allProducts.map((p) => [p.path, p]));
export const getProduct = (catSlug, subSlug, slug) => prodByPath[`/products/${catSlug}/${subSlug}/${slug}`];
export const productsIn = (catSlug, subSlug) => allProducts.filter((p) => p.catSlug === catSlug && (!subSlug || p.subSlug === subSlug));
