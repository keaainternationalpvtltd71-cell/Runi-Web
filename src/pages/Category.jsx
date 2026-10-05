import { useMemo, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import Seo from '../lib/Seo.jsx';
import { titles, metas } from '../data/seoKeywords.js';
import { categoryPillars } from '../data/categoryPillars.js';
import { subcategoryCopy } from '../lib/subcategoryCopy.js';
import { getCategory, getSubcategory, productsIn, keywordFor } from '../lib/catalog.js';
import { buildFacets, matchesFacets } from '../lib/facets.js';
import { rangeImage, subImage } from '../data/media.js';
import { categoryGuides } from '../data/guides.js';
import PageHero from '../components/PageHero.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import FacetSidebar from '../components/FacetSidebar.jsx';
import { Reveal, Stagger, Item } from '../components/Reveal.jsx';
import { ProductCard, CtaCard } from '../components/cards/index.jsx';
import CtaBand from '../components/CtaBand.jsx';

const EMPTY = { type: [], finish: [], tube: [] };

/* Long form category copy, kept below the listing so the products stay above the fold. */
function Pillar({ pillar }) {
  if (!pillar) return null;
  return (
    <section className="wrap section grid gap-12 lg:grid-cols-[2fr_1fr]">
      <div className="prose-block">
        <Reveal><p>{pillar.intro}</p></Reveal>
        {pillar.sections.map((s) => <Reveal key={s.heading}><h2 className="mb-3 mt-8 text-2xl font-bold">{s.heading}</h2><p>{s.body}</p></Reveal>)}
        {pillar.faqs?.length > 0 && <Reveal><h2 className="mb-3 mt-8 text-2xl font-bold">Questions we get asked</h2>{pillar.faqs.map((f) => <details key={f.q} className="group border-b border-steel-200 py-3"><summary className="cursor-pointer list-none font-semibold">{f.q}</summary><p className="mt-2 text-sm text-steel-600">{f.a}</p></details>)}</Reveal>}
      </div>
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start"><CtaCard heading="Send us the list" body="Item codes and quantities are enough for a same day quote on stock items." to="/contact?tab=rfq" label="Request a quote" /></aside>
    </section>
  );
}

/**
 * Shared listing shell for both a whole category and a single subcategory: sidebar of
 * subcategories and facets on the left, the product grid on the right.
 */
function Listing({ cat, sub, list }) {
  const [active, setActive] = useState(EMPTY);
  const [panelOpen, setPanelOpen] = useState(false);
  const facets = useMemo(() => buildFacets(list), [list]);
  const shown = useMemo(() => list.filter((p) => matchesFacets(p, active)), [list, active]);
  const activeCount = active.type.length + active.finish.length + active.tube.length;
  const toggle = (group, value) => setActive((a) => ({
    ...a, [group]: a[group].includes(value) ? a[group].filter((v) => v !== value) : [...a[group], value],
  }));
  const sidebar = (
    <FacetSidebar
      cat={cat} sub={sub?.slug || ''} facets={facets} active={active}
      onToggle={toggle} onClear={() => setActive(EMPTY)} activeCount={activeCount}
    />
  );
  return (
    <section className="wrap py-10">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">{sidebar}</aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-steel-900">{sub ? keywordFor(sub) : 'All products'}</h2>
            <p className="text-sm text-steel-600">Showing {shown.length} of {list.length}</p>
          </div>

          <button
            type="button" onClick={() => setPanelOpen(true)}
            className="btn-ghost mt-5 w-full lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Categories &amp; filters{activeCount > 0 && ` (${activeCount})`}
          </button>

          {shown.length === 0 ? (
            <div className="mt-8 rounded-card border border-dashed border-steel-300 p-10 text-center">
              <p className="font-semibold">Nothing matches these filters.</p>
              <button type="button" className="btn-ghost mt-4" onClick={() => setActive(EMPTY)}>Clear filters</button>
            </div>
          ) : (
            <Stagger className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
              {shown.map((p) => <Item key={p.id}><ProductCard p={p} /></Item>)}
            </Stagger>
          )}
        </div>
      </div>

      {/* Mobile: the same sidebar as a slide over. */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-steel-900/50" onClick={() => setPanelOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto bg-steel-50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-bold">Categories &amp; filters</p>
              <button type="button" aria-label="Close filters" onClick={() => setPanelOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            {sidebar}
            <button type="button" className="btn-primary mt-5 w-full" onClick={() => setPanelOpen(false)}>Show {shown.length} products</button>
          </div>
        </div>
      )}
    </section>
  );
}

/* Buying guide for this range, previously an Insights article. */
function Guide({ guide }) {
  if (!guide) return null;
  return (
    <section className="bg-steel-50 section"><div className="wrap max-w-3xl">
      <Reveal>
        <p className="eyebrow">Buying guide</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{guide.heading}</h2>
        <p className="mt-3 text-lg text-steel-600">{guide.lead}</p>
        {guide.body.map((t) => <p key={t.slice(0, 40)} className="mt-4 text-[17px] leading-relaxed text-steel-800">{t}</p>)}
      </Reveal>
    </div></section>
  );
}

export function CategoryPage() {
  const { cat } = useParams(); const c = getCategory(cat);
  if (!c) return <Navigate to="/404" replace />;
  const kw = c.name.replace(' & ', ' and ');
  const pillar = categoryPillars[c.slug];
  const list = productsIn(c.slug);
  const faqLd = pillar?.faqs?.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: pillar.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : [];
  const crumbs = [{ name: 'Home', to: '/' }, { name: 'Products', to: '/products' }, { name: c.name, to: `/products/${c.slug}` }];
  return (
    <>
      <Seo title={titles.category(kw)} description={metas.category(kw)} path={`/products/${c.slug}`} breadcrumbs={crumbs} jsonLd={[{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.name, url: `https://runiindustries.eu/products/${c.slug}` }, ...faqLd]} />
      <PageHero eyebrow={`${c.count} products`} title={c.name} lead={pillar?.intro?.split('. ')[0] + '.'} image={rangeImage[c.slug]} />
      <Breadcrumbs items={crumbs} />
      <Listing cat={c} sub={null} list={list} />
      <Pillar pillar={pillar} />
      <Guide guide={categoryGuides[c.slug]} />
      <CtaBand />
    </>
  );
}

export function SubcategoryPage() {
  const { cat, sub } = useParams(); const c = getCategory(cat); const s = getSubcategory(sub);
  if (!c || !s || s.category.slug !== c.slug) return <Navigate to="/404" replace />;
  const kw = keywordFor(s); const list = productsIn(c.slug, s.slug); const copy = subcategoryCopy[s.slug];
  const crumbs = [{ name: 'Home', to: '/' }, { name: 'Products', to: '/products' }, { name: c.name, to: `/products/${c.slug}` }, { name: kw, to: `/products/${c.slug}/${s.slug}` }];
  return (
    <>
      <Seo title={titles.subcategory(kw)} description={metas.subcategory(kw)} path={`/products/${c.slug}/${s.slug}`} breadcrumbs={crumbs} jsonLd={[{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: kw, url: `https://runiindustries.eu/products/${c.slug}/${s.slug}` }]} />
      <PageHero eyebrow={c.name} title={kw} lead={copy} image={subImage[s.slug]} />
      <Breadcrumbs items={crumbs} />
      <Listing cat={c} sub={s} list={list} />
      <CtaBand heading={`Need ${kw.toLowerCase()} quickly?`} body="Tell us the item codes and quantities. Stock items are quoted within one working day and dispatched from Eindhoven." />
    </>
  );
}


