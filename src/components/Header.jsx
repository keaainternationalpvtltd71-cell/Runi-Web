import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, MessageCircle, Globe, Search } from 'lucide-react';
import { mainNav } from '../data/navigation.js';
import { company } from '../data/company.js';
import { track } from '../lib/analytics.js';
import { img } from '../lib/media.js';

export default function Header() {
  const [open, setOpen] = useState(false); const [panel, setPanel] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false); const [term, setTerm] = useState('');
  const searchRef = useRef(null); const loc = useLocation(); const navigate = useNavigate();
  useEffect(() => { setOpen(false); setPanel(null); setSearchOpen(false); }, [loc.pathname, loc.hash]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);
  const submitSearch = (e) => {
    e.preventDefault();
    const t = term.trim(); if (!t) return;
    track('header_search', { term: t });
    navigate(`/products?q=${encodeURIComponent(t)}`);
    setSearchOpen(false); setTerm('');
  };
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Utility bar: right aligned locale / WhatsApp / phone, as on the KEAA header. */}
      <div className="hidden border-b border-steel-100 bg-brand-tint/60 text-xs text-steel-600 md:block">
        <div className="wrap-full flex h-9 items-center justify-between">
          <span>{company.headOffice.line1}, {company.headOffice.line2}</span>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> NL (EN)</span>
            <a href={company.social.whatsapp} target="_blank" rel="noreferrer" onClick={() => track('whatsapp_click')} className="inline-flex items-center gap-1.5 hover:text-brand">
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp: {company.whatsappNumber}
            </a>
            <a href={`tel:${company.phones[0].replace(/\s/g, '')}`} onClick={() => track('phone_click')} className="inline-flex items-center gap-1.5 hover:text-brand">
              <Phone className="h-3.5 w-3.5" /> {company.phones[0]}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar: logo left, nav centred, search + quote pill right. */}
      <div className="wrap-full flex h-16 items-center gap-6">
        <Link to="/" className="flex shrink-0 items-center" aria-label="RUNI Industries home">
          <img src="/logo-wide.png" alt="RUNI Industries" width="260" height="60" className="h-10 w-auto sm:h-11" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Main" onMouseLeave={() => setPanel(null)}>
          {mainNav.map((n) => (
            <div key={n.to} className="relative" onMouseEnter={() => setPanel(n.children ? n.to : null)}>
              <NavLink
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) => `relative block px-3 py-2 text-sm font-medium transition-colors hover:text-brand ${isActive ? 'text-brand' : 'text-steel-800'}`}
              >
                {({ isActive }) => (
                  <>
                    {n.label}
                    {isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand" />}
                  </>
                )}
              </NavLink>
              <AnimatePresence>
                {n.children && panel === n.to && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }} className={`absolute left-1/2 top-full -translate-x-1/2 rounded-card border border-steel-200 bg-white p-2 shadow-xl ${n.children.some((c) => c.image) ? 'w-96' : 'w-80'}`}>
                    {n.children.map((c) => (
                      <Link key={c.to} to={c.to} className="flex items-center gap-3 rounded px-3 py-2 hover:bg-steel-50">
                        {c.image && <img src={img(c.image, { w: 112, h: 112, fit: 'pad' })} alt="" width="56" height="56" loading="lazy" className="h-14 w-14 shrink-0 rounded border border-steel-200 bg-white object-contain p-1" />}
                        <span>
                          <span className="block text-sm font-semibold text-steel-900">{c.label}</span>
                          <span className="block text-xs text-steel-600">{c.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <AnimatePresence initial={false}>
            {searchOpen && (
              <motion.form
                initial={{ width: 0, opacity: 0 }} animate={{ width: 220, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.18 }} onSubmit={submitSearch} className="hidden overflow-hidden sm:block" role="search"
              >
                <input
                  ref={searchRef} type="search" value={term} onChange={(e) => setTerm(e.target.value)}
                  onBlur={() => !term && setSearchOpen(false)}
                  onKeyDown={(e) => e.key === 'Escape' && (setSearchOpen(false), setTerm(''))}
                  placeholder="Search products" aria-label="Search products" className="!py-2 text-sm"
                />
              </motion.form>
            )}
          </AnimatePresence>
          <button
            type="button" onClick={() => (searchOpen ? submitSearch({ preventDefault() {} }) : setSearchOpen(true))}
            className="hidden rounded p-2 text-steel-800 hover:text-brand sm:inline-flex" aria-label="Search products" aria-expanded={searchOpen}
          >
            <Search className="h-5 w-5" />
          </button>
          <Link to="/contact?tab=rfq" className="btn-primary hidden !rounded-full sm:inline-flex">Get a Quote</Link>
          <button className="rounded p-2 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 top-16 z-30 overflow-y-auto bg-white lg:hidden">
            <nav className="wrap-full py-6" aria-label="Mobile">
              <form onSubmit={submitSearch} role="search" className="mb-5">
                <input type="search" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search products" aria-label="Search products" />
              </form>
              {mainNav.map((n) => (
                <div key={n.to} className="border-b border-steel-100 py-3">
                  <Link to={n.to} className="block text-lg font-semibold">{n.label}</Link>
                  {n.children && <div className="mt-2 grid gap-2 pl-3">{n.children.map((c) => <Link key={c.to} to={c.to} className="text-sm text-steel-600">{c.label}</Link>)}</div>}
                </div>
              ))}
              <Link to="/contact?tab=rfq" className="btn-primary mt-6 w-full !rounded-full">Get a Quote</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-steel-200 bg-white text-xs font-semibold sm:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <Link to="/contact?tab=rfq" className="py-3 text-center text-brand">Quote</Link>
        <a href={company.social.whatsapp} className="py-3 text-center">WhatsApp</a>
        <a href={`tel:${company.phones[0].replace(/\s/g, '')}`} onClick={() => track('phone_click')} className="py-3 text-center">Call</a>
      </div>
    </header>
  );
}
