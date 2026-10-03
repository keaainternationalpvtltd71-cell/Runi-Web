import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { track } from '../lib/analytics.js';
import { company } from '../data/company.js';
import { allCategories } from '../lib/catalog.js';

const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT;
const DIAL = '+31';
const MAX_WORDS = 250;

/* Three enquiry types behind one form. `fields` lists the extra inputs each one adds. */
export const TABS = [
  {
    id: 'contact', label: 'Contact Us', kind: 'contact',
    heading: 'Send us a message', eyebrow: 'Request a consultation',
    subjectPlaceholder: 'e.g. Availability of Ringlock ledgers',
    messagePlaceholder: 'Tell us how we can help: product, quantity, timeline, destination…',
    fields: [],
  },
  {
    id: 'rfq', label: 'RFQ Form', kind: 'product',
    heading: 'Request a quotation', eyebrow: 'Item codes and quantities',
    subjectPlaceholder: 'e.g. Bulk order enquiry for Cuplock scaffolding',
    messagePlaceholder: 'Item codes and quantities, one per line. Add the delivery address and the date you need them.',
    fields: ['quantity', 'deliveryTo'],
  },
  {
    id: 'export', label: 'Export Inquiry', kind: 'export',
    heading: 'Export enquiry', eyebrow: 'Container and freight',
    subjectPlaceholder: 'e.g. FCL of adjustable props to Gdańsk',
    messagePlaceholder: 'What you need, the volume, and the incoterms you buy on. We quote stock and direct-from-factory routes.',
    fields: ['destinationPort', 'volume'],
  },
];

const EXTRA = {
  quantity: { label: 'Quantity', placeholder: 'e.g. 200 pcs' },
  deliveryTo: { label: 'Delivery address', placeholder: 'Town and country' },
  destinationPort: { label: 'Destination port', placeholder: 'e.g. Rotterdam' },
  volume: { label: 'Volume', placeholder: 'e.g. 1 x 40ft FCL' },
};

const Req = () => <span className="ml-0.5 text-red-600" aria-hidden="true">*</span>;

export default function EnquiryForm({ tab = 'contact', onTabChange, product = '' }) {
  const active = TABS.find((t) => t.id === tab) || TABS[0];
  const categories = useMemo(
    () => [...allCategories.map((c) => c.name), 'Custom manufactured item'],
    [],
  );
  const [state, setState] = useState('idle');
  const [err, setErr] = useState('');
  const [f, setF] = useState({
    name: '', company: '', email: '', country: 'Netherlands', phone: '', subject: '',
    categories: [], product, quantity: '', deliveryTo: '', destinationPort: '', volume: '', message: '',
  });
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const toggleCat = (c) => setF((p) => ({
    ...p, categories: p.categories.includes(c) ? p.categories.filter((x) => x !== c) : [...p.categories, c],
  }));

  const words = f.message.trim() ? f.message.trim().split(/\s+/).length : 0;
  const overLimit = words > MAX_WORDS;

  async function submit(e) {
    e.preventDefault(); setErr('');
    if (!f.name || !f.email || !f.subject || !f.message) { setErr('Name, email, subject and message are required.'); return; }
    if (overLimit) { setErr(`Please shorten the message to ${MAX_WORDS} words or fewer.`); return; }
    if (!ENDPOINT) {
      setState('error');
      setErr(`The enquiry service is not connected yet. Please email ${company.emails[0]} or call ${company.phones[0]}.`);
      return;
    }
    setState('submitting');
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: active.kind, ...f, phone: f.phone ? `${DIAL} ${f.phone}` : '', site: 'runi' }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setState('success');
      track(active.kind === 'contact' ? 'contact_submit' : `${active.kind}_enquiry`, { product });
    } catch {
      setState('error');
      setErr(`We could not send your enquiry. Please try again or email ${company.emails[0]}.`);
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-card border border-brand/30 bg-brand-tint p-6">
        <h3 className="text-lg font-bold">Enquiry received</h3>
        <p className="mt-2 text-sm text-steel-800">Thank you. We reply to stock enquiries within one working day.</p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-steel-200 bg-white p-5 sm:p-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-steel-200 pb-5" role="tablist" aria-label="Enquiry type">
        {TABS.map((t) => (
          <button
            key={t.id} type="button" role="tab" aria-selected={t.id === active.id}
            onClick={() => onTabChange?.(t.id)}
            className={`rounded-card px-4 py-2.5 text-sm font-semibold transition-colors ${
              t.id === active.id ? 'bg-steel-900 text-white' : 'text-steel-800 hover:bg-steel-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <h2 className="mt-7 text-2xl font-bold">{active.heading}</h2>
      <p className="eyebrow mt-1">{active.eyebrow}</p>

      <form onSubmit={submit} noValidate className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name">Your name<Req /></label>
          <input id="name" value={f.name} onChange={set('name')} autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="company">Company name</label>
          <input id="company" value={f.company} onChange={set('company')} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="email">Email address<Req /></label>
          <input id="email" type="email" value={f.email} onChange={set('email')} autoComplete="email" required />
        </div>
        <div>
          <label htmlFor="country">Country<Req /></label>
          <input id="country" value={f.country} onChange={set('country')} autoComplete="country-name" required />
        </div>

        <div>
          <label htmlFor="phone">Phone number</label>
          <div className="flex">
            <span className="inline-flex shrink-0 items-center rounded-l-card border border-r-0 border-steel-300 bg-steel-50 px-3 text-sm text-steel-600">{DIAL}</span>
            <input
              id="phone" type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel"
              placeholder="6 12345678" className="!rounded-l-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="subject">Subject<Req /></label>
          <input id="subject" value={f.subject} onChange={set('subject')} placeholder={active.subjectPlaceholder} required />
        </div>

        {active.fields.map((key) => (
          <div key={key}>
            <label htmlFor={key}>{EXTRA[key].label}</label>
            <input id={key} value={f[key]} onChange={set(key)} placeholder={EXTRA[key].placeholder} />
          </div>
        ))}

        {/* Product category: a details panel of checkboxes, so it works without any JS for
            open/close and stays keyboard reachable. */}
        <div className="sm:col-span-2">
          <label htmlFor="cats">Product category</label>
          <details id="cats" className="group relative">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-card border border-steel-300 bg-white px-3 py-2.5 text-sm text-steel-900 marker:content-none">
              <span className={f.categories.length ? '' : 'text-steel-400'}>
                {f.categories.length ? f.categories.join(', ') : 'Select one or more categories…'}
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-steel-600 transition-transform group-open:rotate-180" />
            </summary>
            <div className="absolute z-20 mt-1 w-full rounded-card border border-steel-200 bg-white p-2 shadow-xl">
              {categories.map((c) => (
                <label key={c} className="flex cursor-pointer items-center gap-2.5 rounded px-2 py-2 text-sm font-normal normal-case tracking-normal text-steel-800 hover:bg-steel-50">
                  <input
                    type="checkbox" checked={f.categories.includes(c)} onChange={() => toggleCat(c)}
                    className="!m-0 h-4 !w-4 shrink-0 cursor-pointer !rounded-sm !p-0 accent-brand"
                  />
                  {c}
                </label>
              ))}
            </div>
          </details>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message">Message<Req /></label>
          <textarea id="message" rows={6} value={f.message} onChange={set('message')} placeholder={active.messagePlaceholder} required />
          <p className={`mt-1 text-right text-xs ${overLimit ? 'font-semibold text-red-700' : 'text-steel-600'}`}>
            {words} / {MAX_WORDS} words
          </p>
        </div>

        {err && <p role="alert" className="text-sm text-red-700 sm:col-span-2">{err}</p>}

        <div className="sm:col-span-2">
          <button className="btn-primary" disabled={state === 'submitting'}>
            {state === 'submitting' ? 'Sending…' : 'Send message'}
          </button>
        </div>
      </form>
    </div>
  );
}
