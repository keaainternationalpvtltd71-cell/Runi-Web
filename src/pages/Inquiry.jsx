import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Seo from '../lib/Seo.jsx';
import { company } from '../data/company.js';
import { brand } from '../data/media.js';
import { track } from '../lib/analytics.js';

/**
 * Standalone inquiry page, reached only by its direct URL or the printed QR code. It renders
 * outside the site Layout (no header, footer or links to it from anywhere) and is noindex, so
 * the sitemap script leaves it out.
 */

const ENDPOINT = '/api/inquiry';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUCCESS = 'Thank you for contacting RUNI Industries. Our team will get back to you shortly.';

const INQUIRY_TYPES = ['Request a quote', 'Product information', 'Stock and availability', 'Bulk or container order', 'Custom manufacturing', 'Partnership or distribution', 'Other'];
const COUNTRIES = ['Netherlands', 'Belgium', 'Germany', 'France', 'Luxembourg', 'United Kingdom', 'Ireland', 'Denmark', 'Sweden', 'Norway', 'Finland', 'Poland', 'Czech Republic', 'Austria', 'Switzerland', 'Spain', 'Portugal', 'Italy', 'Greece', 'Romania', 'Hungary', 'Slovakia', 'Slovenia', 'Croatia', 'Bulgaria', 'Lithuania', 'Latvia', 'Estonia', 'United States', 'Canada', 'United Arab Emirates', 'Saudi Arabia', 'India'];

const EMPTY = { name: '', company: '', email: '', phone: '', country: '', inquiryType: '', message: '' };
const ORDER = ['name', 'email', 'message'];

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = 'Please enter your full name.';
  if (!f.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (!f.message.trim()) e.message = 'Please enter a message.';
  return e;
}

const Req = () => <span className="ml-0.5 text-red-600" aria-hidden="true">*</span>;

function Field({ id, label, required, error, children }) {
  return (
    <div className="min-w-0">
      <label htmlFor={`inq-${id}`}>{label}{required && <Req />}</label>
      {children}
      {error && <p id={`inq-${id}-error`} className="mt-1 text-xs font-medium text-red-700">{error}</p>}
    </div>
  );
}

function InquiryForm() {
  const [f, setF] = useState(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const sending = useRef(false);
  const successRef = useRef(null);

  useEffect(() => { if (state === 'success') successRef.current?.focus(); }, [state]);

  const set = (k) => (e) => {
    const v = e.target.value;
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => { const n = { ...p }; delete n[k]; return n; });
  };
  const invalid = (k) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `inq-${k}-error`, className: '!border-red-500' } : {});

  async function submit(e) {
    e.preventDefault();
    if (sending.current) return;
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`inq-${ORDER.find((k) => errs[k])}`)?.focus();
      return;
    }
    sending.current = true;
    setState('submitting');
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, website: honeypot, sourceUrl: window.location.href }),
      });
      const body = await r.json().catch(() => ({}));
      if (r.status === 422 && body.fields) {
        setErrors(body.fields);
        setState('idle');
        sending.current = false;
        return;
      }
      if (!r.ok || !body.ok) throw new Error(`HTTP ${r.status}`);
      setState('success');
      track('inquiry_submit', { type: f.inquiryType || 'unspecified' });
    } catch {
      setState('error');
      sending.current = false;
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center px-2 py-8 text-center" role="status">
        <CheckCircle2 className="h-14 w-14 text-brand" aria-hidden="true" />
        <h2 ref={successRef} tabIndex={-1} className="mt-4 text-xl font-bold outline-none">Inquiry sent</h2>
        <p className="mt-2 max-w-sm text-steel-800">{SUCCESS}</p>
      </div>
    );
  }

  const busy = state === 'submitting';
  return (
    <form onSubmit={submit} noValidate aria-busy={busy}>
      <fieldset disabled={busy} className="grid min-w-0 gap-4 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={errors.name}>
          <input id="inq-name" value={f.name} onChange={set('name')} autoComplete="name" maxLength={120} required {...invalid('name')} />
        </Field>
        <Field id="company" label="Company">
          <input id="inq-company" value={f.company} onChange={set('company')} autoComplete="organization" maxLength={160} />
        </Field>
        <Field id="email" label="Email" required error={errors.email}>
          <input id="inq-email" type="email" inputMode="email" value={f.email} onChange={set('email')} autoComplete="email" maxLength={254} required {...invalid('email')} />
        </Field>
        <Field id="phone" label="Phone">
          <input id="inq-phone" type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" maxLength={40} placeholder="+31 6 12345678" />
        </Field>
        <Field id="country" label="Country">
          <input id="inq-country" list="inq-countries" value={f.country} onChange={set('country')} autoComplete="country-name" maxLength={80} placeholder="Start typing…" />
          <datalist id="inq-countries">{COUNTRIES.map((c) => <option key={c} value={c} />)}</datalist>
        </Field>
        <Field id="inquiryType" label="Inquiry type">
          <select id="inq-inquiryType" value={f.inquiryType} onChange={set('inquiryType')}>
            <option value="">Select an inquiry type</option>
            {INQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="message" label="Message" required error={errors.message}>
            <textarea id="inq-message" rows={5} value={f.message} onChange={set('message')} maxLength={5000} required placeholder="Products, quantities, delivery location and when you need them." {...invalid('message')} />
          </Field>
        </div>

        {/* Honeypot: invisible to people, tempting to bots. A filled value is dropped server-side. */}
        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="inq-website">Website</label>
          <input id="inq-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        {state === 'error' && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:col-span-2">
            We could not send your inquiry. Please try again, or email us at{' '}
            <a className="font-semibold underline" href={`mailto:${company.emails[0]}`}>{company.emails[0]}</a>.
          </p>
        )}

        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary w-full !rounded-xl !py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0">
            {busy ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…</> : 'Submit'}
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default function Inquiry() {
  const tel = `tel:${company.phones[0].replace(/\s/g, '')}`;
  const actions = [
    { label: 'Call', href: tel, Icon: Phone, primary: true },
    { label: 'WhatsApp', href: company.social.whatsapp, Icon: MessageCircle, external: true },
    { label: 'Email', href: `mailto:${company.emails[0]}`, Icon: Mail },
  ];
  return (
    <>
      <Seo
        title="Send an Inquiry | RUNI Industries"
        description="Send RUNI Industries an inquiry about scaffolding, livestock housing, wood connectors or aluminium rolling towers. Our Eindhoven team replies shortly."
        path="/inquiry" noindex
      />
      <main className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-brand-tint via-[#DCE5F6] to-[#E8E2F6]">
        {/* Soft blurred colour fields behind the card, as on the reference card page. */}
        <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-80 w-80 rounded-full bg-[#B9A8F0]/30 blur-3xl" aria-hidden="true" />

        <div className="mx-auto w-full max-w-xl px-4 py-8 sm:py-14">
          <section className="rounded-3xl bg-white/80 px-5 pb-6 pt-8 text-center shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:px-8">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white p-4 shadow-md ring-4 ring-brand/15">
              <img src={brand.logoStacked} alt="RUNI Industries" width="96" height="96" className="h-full w-full object-contain" />
            </div>
            <h1 className="mt-4 text-2xl font-bold sm:text-3xl">RUNI Industries</h1>
            <p className="mt-1 text-sm text-steel-600 sm:text-base">{company.tagline}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-steel-600">
              <MapPin className="h-4 w-4 text-brand" aria-hidden="true" /> {company.headOffice.line2}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              {actions.map(({ label, href, Icon, primary, external }) => (
                <a
                  key={label} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  onClick={() => track(`inquiry_${label.toLowerCase()}_click`)}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl px-2 py-3 text-xs font-semibold transition-colors sm:text-sm ${primary ? 'bg-brand text-white hover:bg-brand-dark' : 'border border-steel-200 bg-white text-steel-900 hover:border-brand hover:text-brand'}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" /> {label}
                </a>
              ))}
            </div>
          </section>

          <section className="mt-5 rounded-3xl bg-white px-5 py-7 shadow-[0_10px_40px_rgba(15,23,42,0.08)] sm:px-8" aria-labelledby="inq-heading">
            <h2 id="inq-heading" className="text-xl font-bold sm:text-2xl">Send us an inquiry</h2>
            <p className="mb-6 mt-1 text-sm text-steel-600">Fields marked <span className="text-red-600">*</span> are required.</p>
            <InquiryForm />
          </section>

          <p className="mt-6 text-center text-xs text-steel-600">
            © {new Date().getFullYear()} {company.name} · <a className="hover:text-brand" href="/">{company.website}</a>
          </p>
        </div>
      </main>
    </>
  );
}
