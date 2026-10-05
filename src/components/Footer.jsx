import { Link } from 'react-router-dom';
import { Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { company } from '../data/company.js';
import { footerNav, mainNav } from '../data/navigation.js';

const SOCIAL = [
  { key: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
].filter((s) => company.social[s.key]);

export default function Footer() {
  const products = mainNav.find((n) => n.to === '/products')?.children || [];
  return (
    <footer className="mt-16 bg-steel-900 pb-14 text-steel-300 sm:pb-0">
      <div className="wrap-full grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/logo.png" alt="RUNI Industries" width="120" height="60" className="h-12 w-auto rounded bg-white p-1" />
          <p className="mt-4 text-sm">{company.name}. Importer and stockist of steel hardware for construction, agriculture and timber building, supplying Europe from Eindhoven.</p>
        </div>
        <div><h3 className="text-sm font-semibold uppercase tracking-wider text-white">Products</h3><ul className="mt-3 space-y-2 text-sm">{products.map((p) => <li key={p.to}><Link className="hover:text-white" to={p.to}>{p.label}</Link></li>)}</ul></div>
        <div><h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3><ul className="mt-3 space-y-2 text-sm">{footerNav.company.map((p) => <li key={p.to}><Link className="hover:text-white" to={p.to}>{p.label}</Link></li>)}</ul></div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
          <address className="mt-3 not-italic text-sm">
            <p>{company.headOffice.line1}</p><p>{company.headOffice.line2}</p>
            <div className="mt-2">{company.phones.map((n) => <p key={n}><a className="hover:text-white" href={`tel:${n.replace(/\s/g, '')}`}>{n}</a></p>)}</div>
            <div className="mt-2">{company.emails.map((e) => <p key={e}><a className="hover:text-white" href={`mailto:${e}`}>{e}</a></p>)}</div>
          </address>
          {SOCIAL.length > 0 && (
            <ul className="mt-4 flex gap-2">
              {SOCIAL.map(({ key, label, Icon }) => (
                <li key={key}>
                  <a href={company.social[key]} target="_blank" rel="noreferrer" aria-label={label} title={label} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-steel-800 text-steel-200 transition-colors hover:bg-brand hover:text-white">
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-steel-800"><div className="wrap-full flex flex-wrap items-center justify-between gap-3 py-5 text-xs"><p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p><ul className="flex gap-4">{footerNav.legal.map((l) => <li key={l.to}><Link className="hover:text-white" to={l.to}>{l.label}</Link></li>)}</ul></div></div>
    </footer>
  );
}
