import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { img } from '../../lib/media.js';
import Counter from '../Counter.jsx';
import { finishes, tubeSizes } from '../../lib/facets.js';

/* Product card: image, name, item code, the headline spec and finish, then the range it sits in. */
export function ProductCard({ p }) {
  const finish = finishes(p)[0];
  const tube = tubeSizes(p)[0];
  return (
    <Link to={p.path} className="group card-border flex flex-col rounded-card bg-white">
      <div className="aspect-[3/2] overflow-hidden rounded-t-card bg-white">
        {p.image ? (
          <img src={img(p.image, { w: 480, h: 320 })} alt={`${p.name}, ${p.keyword}`} width="480" height="320" loading="lazy" className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04]" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-t-card bg-brand-tint/50 px-3 text-center">
            <span className="text-sm font-semibold text-brand">{p.name}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-steel-600">Image coming soon</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-base font-semibold leading-snug text-steel-900 group-hover:text-brand">{p.name}</h3>
        {p.itemCode && <p className="mt-0.5 text-sm text-brand">{p.itemCode}</p>}
        {tube && (
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-steel-600">
            Diameter<span className="mt-0.5 block text-sm font-medium normal-case tracking-normal text-steel-900">{tube}</span>
          </p>
        )}
        {finish && <span className="mt-2 inline-block w-fit rounded-full border border-brand/40 px-3 py-0.5 text-[11px] font-medium text-brand">{finish}</span>}
        <p className="mt-auto pt-3 text-xs text-steel-600">{p.keyword}</p>
      </div>
    </Link>
  );
}

/* Category tile: numbered, image led, hover reveal. */
export function CategoryTile({ n, title, blurb, to, image }) {
  return (
    <Link to={to} className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-card bg-steel-900 p-6 text-white">
      {image && <img src={img(image, { w: 900, h: 600 })} alt="" width="900" height="600" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-75" />}
      <div className="absolute inset-0 bg-gradient-to-t from-steel-900 via-steel-900/40 to-transparent" />
      <span className="relative text-sm font-semibold text-steel-300">{n}</span>
      <h3 className="relative mt-1 text-2xl font-bold text-white">{title}</h3>
      <p className="relative mt-2 max-w-sm text-sm text-steel-200">{blurb}</p>
      <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white transition-transform group-hover:translate-x-1">View range <ArrowUpRight className="h-4 w-4" /></span>
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
    </Link>
  );
}

/* Industry card: story led, expandable line. */
export function IndustryCard({ title, body, to }) {
  return (
    <Link to={to} className="group card-border block rounded-card bg-white p-6">
      <div className="rule mb-4 transition-all duration-500 group-hover:w-24" />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-steel-600">{body}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-brand">Learn more</span>
    </Link>
  );
}

/* Stat card: minimal numeric. */
export function StatCard({ value, label }) {
  return <div className="border-l-2 border-brand pl-4"><p className="text-3xl font-bold text-steel-900 sm:text-4xl"><Counter value={value} /></p><p className="mt-1 text-sm text-steel-600">{label}</p></div>;
}

/* Certification / standard card: trust led. */
export function TrustCard({ title, body }) {
  return <div className="rounded-card bg-steel-50 p-6"><ShieldCheck className="h-6 w-6 text-brand" /><h3 className="mt-3 font-bold">{title}</h3><p className="mt-2 text-sm text-steel-600">{body}</p></div>;
}

/* CTA card: conversion. */
export function CtaCard({ heading, body, to, label }) {
  return <div className="rounded-card bg-steel-900 p-6 text-white"><h3 className="text-xl font-bold text-white">{heading}</h3><p className="mt-2 text-sm text-steel-300">{body}</p><Link to={to} className="btn-light mt-5">{label}</Link></div>;
}
