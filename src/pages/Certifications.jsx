import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Seo from '../lib/Seo.jsx';
import { certifications } from '../data/certifications.js';
import { scene } from '../data/media.js';
import { img } from '../lib/media.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { Reveal, Stagger, Item } from '../components/Reveal.jsx';

const crumbs = [{ name: 'Home', to: '/' }, { name: 'About', to: '/about' }, { name: 'Certifications', to: '/certifications' }];
const SLIDES = [scene.welding, scene.fittings, scene.warehouse, scene.port];

/* Full-width rotating banner with the page title over it. */
function HeroCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [i]);
  const go = (d) => setI((n) => (n + d + SLIDES.length) % SLIDES.length);
  return (
    <section className="relative isolate h-[420px] overflow-hidden bg-black sm:h-[480px]">
      {SLIDES.map((src, k) => (
        <img
          key={src} src={img(src, { w: 1920, h: 640 })} alt="" width="1920" height="640"
          className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-1000 ${k === i ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
      <div className="wrap flex h-full flex-col justify-center">
        <p className="eyebrow mb-3 text-brand-tint">Our certifications</p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">Committed to European Standards</h1>
        <p className="mt-5 max-w-2xl text-lg text-steel-200">EN certified in our own name, made at an ISO and CE certified production site.</p>
      </div>
      {/* Side arrows only where the gutter is wider than the arrow; below that they sit beside the dots. */}
      <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/15 p-2 text-white backdrop-blur hover:bg-white/30 xl:block"><ChevronLeft className="h-5 w-5" /></button>
      <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/15 p-2 text-white backdrop-blur hover:bg-white/30 xl:block"><ChevronRight className="h-5 w-5" /></button>
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
        <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="mr-2 rounded-full bg-white/15 p-1.5 text-white backdrop-blur hover:bg-white/30 xl:hidden"><ChevronLeft className="h-4 w-4" /></button>
        {SLIDES.map((src, k) => (
          <button key={src} type="button" onClick={() => setI(k)} aria-label={`Show image ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? 'w-6 bg-white' : 'w-2 bg-white/50'}`} />
        ))}
        <button type="button" onClick={() => go(1)} aria-label="Next image" className="ml-2 rounded-full bg-white/15 p-1.5 text-white backdrop-blur hover:bg-white/30 xl:hidden"><ChevronRight className="h-4 w-4" /></button>
      </div>
    </section>
  );
}

function CertificationCard({ c }) {
  const full = c.scan ? img(c.image, { w: 1400, fit: 'limit' }) : null;
  return (
    <div id={c.key} className="flex h-full scroll-mt-32 flex-col bg-white shadow-[0_2px_18px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_6px_28px_rgba(15,23,42,0.14)]">
      <div className="flex h-60 items-center justify-center border-b border-steel-100 bg-white p-6">
        <img src={img(c.image, { w: 560, fit: 'pad' })} alt={c.title} width="560" height="400" loading="lazy" className="max-h-full w-auto object-contain" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-bold leading-snug text-steel-900">{c.title}</h3>
        <p className="mt-1 text-sm text-steel-600">{c.issuer}{c.number && <> · No. {c.number}</>}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-steel-800">{c.body}</p>
        <div className="mt-auto pt-6">
          {full ? (
            <a href={full} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">View certificate <ArrowRight className="h-4 w-4" /></a>
          ) : (
            <Link to="/contact?tab=rfq" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">Request certificate <ArrowRight className="h-4 w-4" /></Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return undefined;
    // Wait for the page transition in Layout to finish before scrolling to the certificate.
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    return () => clearTimeout(t);
  }, [hash]);
  return (
    <>
      <Seo
        title="Certifications | EN 74-1 couplers and EN 1065 props | RUNI Industries"
        description="Certificates of conformity held by RUNI Industries B.V. for EN 74-1 couplers and EN 1065 steel props, certified by SIGMA KARLSRUHE GmbH, and the ISO, CE and EN 1090 certifications of the production site."
        path="/certifications" breadcrumbs={crumbs}
      />
      <HeroCarousel />
      <Breadcrumbs items={crumbs} />

      <section className="wrap section">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Quality You Can Verify</h2>
          <p className="mt-4 text-steel-600">
            Certificates of conformity issued to RUNI Industries B.V. by SIGMA KARLSRUHE GmbH, an
            accredited German test institute for building construction, alongside the management
            system and production certifications held at our manufacturing site.
          </p>
        </Reveal>
        <Stagger className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          {certifications.map((c) => <Item key={c.key}><CertificationCard c={c} /></Item>)}
        </Stagger>
      </section>
    </>
  );
}
