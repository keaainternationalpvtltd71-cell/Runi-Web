import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Seo from '../lib/Seo.jsx';
import { titles, metas } from '../data/seoKeywords.js';
import { hero, categoryTiles, whyRuni } from '../data/homeContent.js';
import { company } from '../data/company.js';
import { allCategories, productsIn } from '../lib/catalog.js';
import { hero as heroMedia, rangeImage } from '../data/media.js';
import { Reveal, Stagger, Item } from '../components/Reveal.jsx';
import { CategoryTile, IndustryCard, ProductCard } from '../components/cards/index.jsx';
import CtaBand from '../components/CtaBand.jsx';
import CertMarquee from '../components/CertMarquee.jsx';
import RotatingHeadline from '../components/RotatingHeadline.jsx';

const catImage = (slug) => rangeImage[slug] || productsIn(slug).find((p) => p.image)?.image;

export default function Home() {
  const featured = allCategories.flatMap((c) => productsIn(c.slug).filter((p) => p.image).slice(0, 2)).slice(0, 8);
  return (
    <>
      <Seo title={titles.home} description={metas.home} path="/" jsonLd={[{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'RUNI Industries', url: 'https://runiindustries.eu' }]} />
      <section className="relative overflow-hidden bg-steel-900 text-white">
        {/* RUNI's own warehouse behind the headline. runiindustries.eu carries no video. */}
        <img
          src={heroMedia.image} alt="" width="1600" height="900" fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Blackish shade into every edge; no colour cast over the photograph. */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_70%_20%,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.88)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        <div className="wrap relative flex min-h-[78vh] flex-col justify-center py-24">
          <Reveal>
            {/* Type scale mirrors the reference hero: one size for both lines, tight leading so
                they read as a single stacked headline, and the rotating line in brand blue. */}
            <RotatingHeadline
              lead={hero.h1} phrases={hero.h1Phrases}
              className="max-w-6xl text-[clamp(1.75rem,calc(6.4vw-4.6px),2.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-[clamp(2rem,calc(6.4vw-8.8px),3rem)] lg:text-[clamp(3rem,calc(4.375vw+8.2px),3.75rem)]"
              phraseClassName="text-brand-light"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm font-semibold text-white/90">{hero.strapline}</p>
          </Reveal>
          <a href="#ranges" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-steel-400 hover:text-white" aria-label="Scroll to product ranges"><ChevronDown className="h-6 w-6 animate-bounce motion-reduce:animate-none" /></a>
        </div>
      </section>


      <CertMarquee />

      <section id="ranges" className="section"><div className="wrap">
        <Reveal><p className="eyebrow">Product ranges</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">Four ranges, one warehouse in Eindhoven</h2></Reveal>
        <Stagger className="mt-10 grid gap-5 md:grid-cols-2">{categoryTiles.map((t) => <Item key={t.to}><CategoryTile {...t} image={catImage(t.to.split('/').pop())} /></Item>)}</Stagger>
      </div></section>

      <section className="bg-steel-50 section"><div className="wrap">
        <Reveal><p className="eyebrow">Why RUNI</p><h2 className="mt-2 max-w-2xl text-3xl font-bold sm:text-4xl">{whyRuni.heading}</h2></Reveal>
        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{whyRuni.items.map((i, n) => <Item key={i.title} className="rounded-card border border-steel-200 bg-white p-6"><span className="text-sm font-semibold text-brand">0{n + 1}</span><h3 className="mt-2 text-lg font-bold">{i.title}</h3><p className="mt-2 text-sm text-steel-600">{i.body}</p></Item>)}</Stagger>
      </div></section>

      <section className="section"><div className="wrap">
        <Reveal className="flex items-end justify-between gap-6"><div><p className="eyebrow">In the range</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">Selected products</h2></div><Link to="/products" className="btn-ghost hidden sm:inline-flex">All products</Link></Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{featured.map((p) => <Item key={p.id}><ProductCard p={p} /></Item>)}</Stagger>
      </div></section>

      <section className="section"><div className="wrap grid gap-10 md:grid-cols-2 md:items-center">
        <Reveal><p className="eyebrow">Services</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">Stock, sourcing and everything between</h2><p className="mt-4 text-steel-600">{company.description}</p><Link to="/about" className="btn-ghost mt-6">About RUNI</Link></Reveal>
        <Stagger className="grid gap-4">{company.services.map((s) => <Item key={s.title} className="border-l-2 border-steel-200 pl-4 hover:border-brand"><h3 className="font-bold">{s.title}</h3><p className="mt-1 text-sm text-steel-600">{s.body}</p></Item>)}</Stagger>
      </div></section>
      <CtaBand />
    </>
  );
}
