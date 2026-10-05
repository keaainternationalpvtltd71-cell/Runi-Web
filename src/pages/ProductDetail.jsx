import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import Seo from '../lib/Seo.jsx';
import { titles, metas } from '../data/seoKeywords.js';
import { getProduct, getCategory, getSubcategory, productsIn, keywordFor } from '../lib/catalog.js';
import { img } from '../lib/media.js';
import { track } from '../lib/analytics.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { Reveal } from '../components/Reveal.jsx';
import { ProductCard } from '../components/cards/index.jsx';

export default function ProductDetail() {
  const { cat, sub, slug } = useParams(); const p = getProduct(cat, sub, slug); const c = getCategory(cat); const s = getSubcategory(sub);
  const [i, setI] = useState(0); const [tab, setTab] = useState('overview');
  if (!p || !c || !s) return <Navigate to="/404" replace />;
  const kw = keywordFor(s); const imgs = p.cloudinaryImages || []; const related = productsIn(cat, sub).filter((r) => r.id !== p.id).slice(0, 4);
  const crumbs = [{ name: 'Home', to: '/' }, { name: 'Products', to: '/products' }, { name: c.name, to: `/products/${c.slug}` }, { name: kw, to: `/products/${c.slug}/${s.slug}` }, { name: p.name, to: p.path }];
  const specs = (p.specs || []).filter((x) => x && (x.label || x.name));
  const ready = Boolean(p.runiCopyReady);
  return (
    <>
      <Seo title={titles.product(p.name, kw)} description={metas.product(p.name, p.itemCode)} path={p.path} image={imgs[0]} noindex={!ready} breadcrumbs={crumbs} jsonLd={[{ '@context': 'https://schema.org', '@type': 'Product', name: p.name, sku: p.itemCode, image: imgs, description: p.description, category: `${c.name} / ${kw}`, brand: { '@type': 'Brand', name: 'RUNI Industries' } }]} />
      <Breadcrumbs items={crumbs} />
      <section className="wrap grid gap-10 py-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-card bg-white">{imgs[i] && <img src={img(imgs[i], { w: 1000, h: 750, fit: 'fit' })} alt={`${p.name}, view ${i + 1}`} width="1000" height="750" className="h-full w-full object-contain p-3 sm:p-5" />}</div>
          {imgs.length > 1 && <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">{imgs.map((u, k) => <button key={u} onClick={() => setI(k)} aria-label={`View image ${k + 1}`} className={`aspect-square overflow-hidden rounded border bg-white ${k === i ? 'border-brand' : 'border-steel-200'}`}><img src={img(u, { w: 160, h: 160, fit: 'fit' })} alt="" width="160" height="160" loading="lazy" className="h-full w-full object-contain p-1" /></button>)}</div>}
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">{kw}</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{p.name}</h1>
            {p.itemCode && <p className="mt-2 text-sm text-steel-600">Item code {p.itemCode}</p>}
            <p className="mt-4 text-steel-800">{p.description}</p>
            <p className="mt-3 text-sm text-steel-600">Supplied by RUNI Industries from stock in Eindhoven or to order, with delivery across Europe. Availability is confirmed on every quotation.</p>
            {specs.length > 0 && <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">{specs.slice(0, 6).map((x, k) => <div key={k}><dt className="text-steel-600">{x.label || x.name}</dt><dd className="font-semibold">{x.value}</dd></div>)}</dl>}
            <div className="mt-6 flex flex-wrap gap-3"><a href="#enquire" className="btn-primary" onClick={() => track('view_product', { product: p.name })}>Request a quote</a><Link to={`/products/${c.slug}/${s.slug}`} className="btn-ghost">All {kw.toLowerCase()}</Link></div>
          </Reveal>
        </div>
      </section>
      <section className="wrap py-8">
        <div className="flex gap-1 overflow-x-auto shadow-[inset_0_-1px_0_0_theme(colors.steel.200)] sm:gap-2">{['overview', 'specifications', 'applications', 'downloads'].map((t) => <button key={t} onClick={() => setTab(t)} className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold capitalize sm:px-4 ${tab === t ? 'border-brand text-brand' : 'border-transparent text-steel-600'}`}>{t}</button>)}</div>
        <div className="py-6 text-steel-800">
          {tab === 'overview' && <p>{p.description}. Part of the {kw.toLowerCase()} range. Ask for the current stock position and a price for your quantity.</p>}
          {tab === 'specifications' && (specs.length ? <table className="w-full text-sm"><tbody>{specs.map((x, k) => <tr key={k} className="border-b border-steel-100"><th className="py-2 pr-4 text-left font-medium text-steel-600 [overflow-wrap:anywhere]">{x.label || x.name}</th><td className="py-2 [overflow-wrap:anywhere]">{x.value}</td></tr>)}</tbody></table> : <p className="text-sm text-steel-600">Full specification is supplied with the quotation. Send the intended use and we return the datasheet.</p>)}
          {tab === 'applications' && <p>Used by contractors, farms, merchants and installers across the Benelux and Germany. Tell us the application and we confirm the right variant.</p>}
          {tab === 'downloads' && <p className="text-sm text-steel-600">Datasheets are supplied on request with each quotation.</p>}
        </div>
      </section>
      <section id="enquire" className="bg-steel-50"><div className="wrap section grid gap-10 lg:grid-cols-[1fr_1.4fr]"><div><h2 className="text-2xl font-bold">Enquire about {p.name}</h2><p className="mt-2 text-sm text-steel-600">Quantity and delivery address are enough. We reply within one working day for stock items.</p></div><EnquiryForm kind="product" product={`${p.name}${p.itemCode ? ` (${p.itemCode})` : ''}`} /></div></section>
      {related.length > 0 && <section className="wrap section"><h2 className="text-2xl font-bold">Related products</h2><div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div></section>}
    </>
  );
}
