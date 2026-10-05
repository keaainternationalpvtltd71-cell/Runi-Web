import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Boxes, Layers, ShieldCheck } from 'lucide-react';
import Seo from '../lib/Seo.jsx';
import { titles, metas } from '../data/seoKeywords.js';
import { allCategories, allProducts, keywordFor, productsIn } from '../lib/catalog.js';
import { categoryPillars } from '../data/categoryPillars.js';
import { rangeImage, scene } from '../data/media.js';
import { img } from '../lib/media.js';
import PageHero from '../components/PageHero.jsx';
import { Reveal, Stagger, Item } from '../components/Reveal.jsx';
import { ProductCard } from '../components/cards/index.jsx';
import CtaBand from '../components/CtaBand.jsx';

const PAGE = 24;
const PER_CATEGORY = 12;   // how many cards each range shows under "From our catalogue"
const SUBS_SHOWN = 4;      // subcategory chips on a category card before "+n more"

const RANGE_INTRO = {
  'scaffolding-formworks': 'A complete range of modular scaffolding, formwork systems and fittings, stocked in Eindhoven for fast dispatch across Europe.',
  'livestock-housing-solutions': 'Cattle, sheep, pig and horse housing systems, field gates and feeders in heavy gauge galvanised steel, supplied per shed layout.',
  'wood-connectors': 'Structural timber connectors, post supports and ground anchors for decks, pergolas, fencing and joinery, in standard European sizes.',
  aluminium: 'RALUTECH aluminium rolling towers. A plug-in mobile scaffold that mounts without tools, up to 850 cm working height, with every frame, deck and stabiliser available separately.',
};

const HELP = [
  { icon: Layers, title: 'Custom manufactured', body: 'Items outside the standard range are produced to your drawing through our manufacturing partners.' },
  { icon: Boxes, title: 'Bulk orders', body: 'Full and part container loads arranged direct from the factory, with freight and import documentation handled.' },
  { icon: ShieldCheck, title: 'Standards and finish', body: 'Hot dip galvanised to EN ISO 1461; props to EN 1065 and couplers to EN 74-1 or BS 1139 where the range cites them.' },
];

/**
 * Range card: photo header with the name and counts over it, then the intro, the first
 * subcategories as chips, and the link into the range. `soon` renders a range that has no
 * catalogue data yet, so it can sit alongside the live ones.
 */
function RangeCard({ cat, soon = false }) {
  const subs = cat.subcategories || [];
  const intro = RANGE_INTRO[cat.slug] || categoryPillars[cat.slug]?.intro?.split('. ').slice(0, 1).join('. ');
  const image = rangeImage[cat.slug];
  const Wrapper = soon ? 'div' : Link;
  const wrapperProps = soon ? {} : { to: `/products/${cat.slug}` };
  return (
    <div className="card-border group flex flex-col overflow-hidden rounded-card bg-white">
      <Wrapper {...wrapperProps} className="relative block aspect-[16/9] overflow-hidden bg-steel-900">
        {image && (
          <img
            src={img(image, { w: 720, h: 405 })} alt="" width="720" height="405" loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-steel-900 via-steel-900/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-lg font-bold text-white sm:text-xl">{cat.name}</h3>
          <p className="mt-0.5 text-xs text-steel-200">
            {soon ? 'Range in preparation' : cat.countLabel || `${cat.count} products · ${subs.length} subcategories`}
          </p>
        </div>
      </Wrapper>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-steel-600">{intro}</p>
        {subs.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {subs.slice(0, SUBS_SHOWN).map((s) => (
              <li key={s.slug}>
                <Link to={`/products/${cat.slug}/${s.slug}`} className="inline-block rounded-full bg-steel-50 px-3 py-1 text-xs text-steel-800 hover:bg-brand-tint hover:text-brand">{keywordFor(s)}</Link>
              </li>
            ))}
            {subs.length > SUBS_SHOWN && <li className="px-1 py-1 text-xs text-steel-600">+{subs.length - SUBS_SHOWN} more</li>}
          </ul>
        )}
        {soon ? (
          <Link to="/contact?tab=rfq" className="mt-auto pt-5 text-sm font-semibold text-brand hover:underline">Ask about this range <ArrowRight className="inline h-4 w-4" /></Link>
        ) : (
          <Link to={`/products/${cat.slug}`} className="mt-auto pt-5 text-sm font-semibold text-brand hover:underline">View products <ArrowRight className="inline h-4 w-4" /></Link>
        )}
      </div>
    </div>
  );
}

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');
  const [cat, setCat] = useState(''); const [sub, setSub] = useState(''); const [sort, setSort] = useState('name'); const [n, setN] = useState(PAGE);
  useEffect(() => { setQ(params.get('q') || ''); setN(PAGE); }, [params]);

  const subs = allCategories.find((c) => c.slug === cat)?.subcategories || [];
  const filtering = Boolean(q || cat || sub);
  const list = useMemo(() => {
    let l = allProducts.filter((p) => (!cat || p.catSlug === cat) && (!sub || p.subSlug === sub));
    if (q) { const s = q.toLowerCase(); l = l.filter((p) => [p.name, p.itemCode, p.keyword, p.description].join(' ').toLowerCase().includes(s)); }
    return [...l].sort((a, b) => (sort === 'code' ? String(a.itemCode).localeCompare(String(b.itemCode)) : a.name.localeCompare(b.name)));
  }, [q, cat, sub, sort]);

  return (
    <>
      <Seo title={titles.products} description={metas.products} path="/products" breadcrumbs={[{ name: 'Home', to: '/' }, { name: 'Products', to: '/products' }]} />
      <PageHero
        eyebrow="Products"
        title="Engineered for strength. Built for performance."
        lead="Scaffolding and formwork, livestock housing, wood connectors and post hardware — stocked in Eindhoven and delivered across Europe."
        image={scene.warehouse}
      />

      {/* Search and filters. Also the landing point for the header search (/products?q=). */}
      <div className="border-b border-steel-200 bg-white">
        <div className="wrap py-6">
          <div className="grid gap-3 md:grid-cols-[1fr_200px_220px_160px]">
            <input
              aria-label="Search products" placeholder="Search by name or code" value={q}
              onChange={(e) => { const v = e.target.value; setQ(v); setN(PAGE); setParams(v ? { q: v } : {}, { replace: true }); }}
            />
            <select aria-label="Category" value={cat} onChange={(e) => { setCat(e.target.value); setSub(''); setN(PAGE); }}><option value="">All ranges</option>{allCategories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select>
            <select aria-label="Subcategory" value={sub} onChange={(e) => { setSub(e.target.value); setN(PAGE); }} disabled={!cat}><option value="">All subranges</option>{subs.map((s) => <option key={s.slug} value={s.slug}>{keywordFor(s)}</option>)}</select>
            <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}><option value="name">Sort by name</option><option value="code">Sort by code</option></select>
          </div>
        </div>
      </div>

      {filtering ? (
        /* Results view: shown once something is searched or filtered. */
        <div className="wrap section">
          <p className="text-sm text-steel-600">{list.length} products</p>
          {list.length === 0 ? (
            <div className="mt-10 rounded-card border border-dashed border-steel-300 p-10 text-center">
              <p className="font-semibold">No products match.</p>
              <p className="mt-1 text-sm text-steel-600">Try a shorter search, or send us what you need and we will source it.</p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{list.slice(0, n).map((p) => <ProductCard key={p.id} p={p} />)}</div>
          )}
          {n < list.length && <div className="mt-10 text-center"><button className="btn-ghost" onClick={() => setN(n + PAGE)}>Load more ({list.length - n} left)</button></div>}
        </div>
      ) : (
        <>
          <section className="section"><div className="wrap">
            <Reveal><p className="eyebrow">Our product range</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">Browse by category</h2></Reveal>
            <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {allCategories.map((c) => <Item key={c.slug}><RangeCard cat={c} /></Item>)}
            </Stagger>
          </div></section>

          <section className="bg-steel-50 section"><div className="wrap">
            <Reveal><p className="eyebrow">Featured products</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">From our catalogue</h2></Reveal>
            {allCategories.map((c) => {
              const items = productsIn(c.slug).filter((p) => p.image).slice(0, PER_CATEGORY);
              if (!items.length) return null;
              return (
                <div key={c.slug} className="mt-12">
                  <div className="flex items-end justify-between gap-6 border-b border-steel-200 pb-3">
                    <h3 className="text-xl font-bold text-steel-900">{c.name}</h3>
                    <Link to={`/products/${c.slug}`} className="shrink-0 text-sm font-semibold text-brand hover:underline">View all <ArrowRight className="inline h-4 w-4" /></Link>
                  </div>
                  <Stagger className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                    {items.map((p) => <Item key={p.id}><ProductCard p={p} /></Item>)}
                  </Stagger>
                </div>
              );
            })}
          </div></section>

          <section className="section"><div className="wrap">
            <Reveal><h2 className="text-3xl font-bold sm:text-4xl">Explore the full catalogue</h2><p className="mt-3 max-w-2xl text-steel-600">{allProducts.length} products across {allCategories.length} ranges and {allCategories.reduce((a, c) => a + c.subcategories.length, 0)} subcategories.</p></Reveal>
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {HELP.map(({ icon: Icon, title, body }) => (
                <Item key={title} className="rounded-card bg-steel-50 p-6">
                  <Icon className="h-6 w-6 text-brand" />
                  <h3 className="mt-3 font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-steel-600">{body}</p>
                </Item>
              ))}
            </Stagger>
          </div></section>
        </>
      )}

      <CtaBand heading="Need help choosing the right product?" body="Send the system, the sizes and the quantities. We confirm what is in stock in Eindhoven and quote the rest." />
    </>
  );
}
