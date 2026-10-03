import { Link, useParams, Navigate, useSearchParams } from 'react-router-dom';
import Seo from '../lib/Seo.jsx';
import { titles, metas } from '../data/seoKeywords.js';
import { company } from '../data/company.js';
import { allCategories, productsIn } from '../lib/catalog.js';
import { standards, process, scene } from '../data/media.js';
import { enquiryGuide } from '../data/guides.js';
import { legalDocs, LAST_UPDATED } from '../data/legal.js';
import { img } from '../lib/media.js';
import PageHero from '../components/PageHero.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import EnquiryForm, { TABS } from '../components/EnquiryForm.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { Reveal, Stagger, Item } from '../components/Reveal.jsx';
import { IndustryCard, TrustCard, StatCard, CategoryTile } from '../components/cards/index.jsx';

const clean = (v) => (typeof v === 'string' && v.includes('[VERIFY]') ? null : v);

export function About() {
  const crumbs = [{ name: 'Home', to: '/' }, { name: 'About', to: '/about' }];
  return (
    <>
      <Seo title={titles.about} description={metas.about} path="/about" breadcrumbs={crumbs} />
      <PageHero eyebrow="About RUNI" title="An Eindhoven stockist with a factory network behind it" lead="RUNI Industries B.V. imports, stocks and supplies steel hardware to construction, agricultural and timber trade customers across Europe." image={scene.stockHall} />
      {/* Stock and handling. Shot at the partner plant, not the Eindhoven warehouse, so the
          captions describe the goods rather than claiming a location. */}
      <section className="wrap pt-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { src: scene.warehouseAisle, alt: 'Warehouse aisle with racked stock' },
            { src: scene.stockHall, alt: 'Steel stock held in the hall' },
            { src: scene.port, alt: 'Container port, export consignments' },
          ].map((im) => (
            <img key={im.alt} src={img(im.src, { w: 640, h: 440 })} alt={im.alt} width="640" height="440" loading="lazy" className="h-48 w-full rounded-card object-cover sm:h-56" />
          ))}
        </div>
      </section>
      <section className="wrap section grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose-block">
          <Reveal><h2 className="mb-3 text-2xl font-bold">What we do</h2><p>{company.description}</p></Reveal>
          <Reveal><h2 className="mb-3 mt-8 text-2xl font-bold">Netherlands presence</h2><p>Office and warehouse at {company.headOffice.line1}, {company.headOffice.line2}. Common lines are held here so that Dutch, Belgian and German customers receive goods in days, invoiced in euros with Dutch VAT.</p></Reveal>
          <Reveal><h2 className="mb-3 mt-8 text-2xl font-bold">Business model</h2><p>We sell in the quantities a site, a farm or a merchant actually needs: a carton, a pallet, a mixed load. When a customer needs a container, we arrange it direct from the factory and manage freight and documentation. Custom items are produced to drawing through our manufacturing partners in India and Asia.</p></Reveal>
          {clean(company.manufacturingPartner?.name) && company.manufacturingPartner.mentionPublicly && <Reveal><h2 className="mb-3 mt-8 text-2xl font-bold">Manufacturing partner</h2><p>Our principal manufacturing partner is {company.manufacturingPartner.name} in {company.manufacturingPartner.country}, which gives RUNI customers factory pricing on volume and consistent specification on repeat orders.</p></Reveal>}
          <Reveal><h2 className="mb-3 mt-8 text-2xl font-bold">Customer service</h2><p>A Netherlands based team, reachable by phone, email and WhatsApp in your working hours, before and after delivery.</p></Reveal>
        </div>
        <aside className="space-y-6"><div className="grid gap-6">{company.stats.map((s) => <StatCard key={s.label} {...s} />)}</div><div className="grid gap-3">{company.services.map((s) => <TrustCard key={s.title} title={s.title} body={s.body} />)}</div></aside>
      </section>
      <CtaBand />
    </>
  );
}

export function Quality() {
  const crumbs = [{ name: 'Home', to: '/' }, { name: 'Quality', to: '/quality' }];
  const items = [
    { title: 'Hot dip galvanising to EN ISO 1461', body: 'Structural scaffolding, livestock and post hardware is supplied hot dip galvanised after fabrication unless the item page states another finish.' },
    { title: 'Props to EN 1065', body: 'Adjustable steel props are supplied against the EN 1065 class stated on the quotation.' },
    { title: 'Couplers to EN 74-1 and BS 1139', body: 'European and British pattern scaffold fittings are supplied to the respective standard.' },
    { title: 'Structural steel to EN 10025-2', body: 'Post support ranges are made from S235JR structural steel.' },
    { title: 'Documentation with every order', body: 'Certificates of conformity, mill certificates and test reports are supplied on request with each consignment.' },
    { title: 'Inspection on arrival', body: 'Goods are checked in our Eindhoven warehouse before dispatch to the customer.' },
  ];
  return (
    <>
      <Seo title={titles.quality} description="The standards RUNI Industries supplies to: EN ISO 1461 galvanising, EN 1065 props, EN 74 couplers, EN 10025-2 steel, with documentation on every order." path="/quality" breadcrumbs={crumbs} />
      <PageHero eyebrow="Quality" title="Standards we supply to" lead="RUNI Industries does not manufacture. What we control is the specification we buy to, the checks on arrival and the paperwork you receive." image={scene.welding} />
      <section className="wrap section"><Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((i) => <Item key={i.title}><TrustCard {...i} /></Item>)}</Stagger></section>

      {/* Scheme marks the goods are certified against. No company name appears on any of them. */}
      <section className="bg-steel-50 section"><div className="wrap">
        <Reveal><p className="eyebrow">Certification</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">Schemes the goods are certified against</h2></Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {standards.map((m) => (
            <Item key={m.key} className="flex flex-col items-center rounded-card border border-steel-200 bg-white p-5 text-center">
              <img src={img(m.image, { w: 260, fit: 'pad' })} alt={m.label} width="130" height="90" loading="lazy" className="h-20 w-auto object-contain" />
              <p className="mt-3 text-xs text-steel-600">{m.label}</p>
            </Item>
          ))}
        </Stagger>
        <p className="mt-6 text-xs text-steel-600">Certificates of conformity naming RUNI Industries B.V. are issued per product family and supplied with your quotation on request.</p>
      </div></section>

      {/* How the goods are made at the partner plants. */}
      <section className="section"><div className="wrap">
        <Reveal><p className="eyebrow">Production</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">How the goods are made</h2><p className="mt-3 max-w-2xl text-steel-600">RUNI does not manufacture. These are the processes our manufacturing partners run, and the stages our specification and inspection cover.</p></Reveal>
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((s) => (
            <Item key={s.key} className="group overflow-hidden rounded-card border border-steel-200 bg-white">
              <div className="aspect-[16/10] overflow-hidden bg-steel-900">
                <img src={img(s.image, { w: 640, h: 400 })} alt={s.title} width="640" height="400" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="p-4 font-semibold text-steel-900">{s.title}</p>
            </Item>
          ))}
        </Stagger>
      </div></section>

      <section className="relative overflow-hidden">
        <img src={img(scene.fittings, { w: 1600, h: 480 })} alt="Scaffold couplers and fittings" width="1600" height="480" loading="lazy" className="h-64 w-full object-cover sm:h-80" />
      </section>
      <CtaBand />
    </>
  );
}

export function Contact() {
  const [sp, setSp] = useSearchParams();
  const tab = TABS.some((t) => t.id === sp.get('tab')) ? sp.get('tab') : 'contact';
  const crumbs = [{ name: 'Home', to: '/' }, { name: 'Contact', to: '/contact' }];
  const titleFor = { contact: 'Talk to the Eindhoven team', rfq: 'Request a quote', export: 'Export and container enquiries' };
  return (
    <>
      <Seo title={titles.contact} description={metas.contact} path="/contact" breadcrumbs={crumbs} />
      <PageHero eyebrow="Contact" title={titleFor[tab]} lead="Stock enquiries are answered within one working day." image={scene.port} />
      <section className="wrap section grid items-start gap-10 lg:grid-cols-[340px_1fr]">
        <aside>
          <p className="eyebrow">Get in touch</p>
          <div className="mt-4 rounded-card border border-steel-200 bg-white p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-brand">Office and warehouse</h2>
            <p className="mt-2 text-sm text-steel-800">{company.headOffice.line1}<br />{company.headOffice.line2}</p>

            <h2 className="mt-6 text-xs font-semibold uppercase tracking-wider text-brand">Phone</h2>
            {company.phones.map((n) => (
              <p key={n} className="text-sm"><a className="text-steel-800 hover:text-brand" href={`tel:${n.replace(/\s/g, '')}`}>{n}</a></p>
            ))}

            <h2 className="mt-6 text-xs font-semibold uppercase tracking-wider text-brand">Email</h2>
            {company.emails.map((e) => (
              <p key={e} className="text-sm"><a className="break-all text-steel-800 hover:text-brand" href={`mailto:${e}`}>{e}</a></p>
            ))}

            {clean(company.openingHours) && (
              <>
                <h2 className="mt-6 text-xs font-semibold uppercase tracking-wider text-brand">Business hours</h2>
                <p className="text-sm text-steel-800">{company.openingHours}</p>
              </>
            )}

            <h2 className="mt-6 text-xs font-semibold uppercase tracking-wider text-brand">WhatsApp</h2>
            <p className="text-sm"><a className="text-steel-800 hover:text-brand" href={company.social.whatsapp} target="_blank" rel="noreferrer">{company.whatsappNumber}</a></p>
          </div>
          <iframe
            title="Map to RUNI Industries, Park Forum 1005, Eindhoven"
            className="mt-5 h-56 w-full rounded-card border border-steel-200" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Park+Forum+1005,+5657+HJ+Eindhoven&output=embed"
          />
        </aside>

        <EnquiryForm tab={tab} onTabChange={(id) => setSp(id === 'contact' ? {} : { tab: id }, { replace: true })} />
      </section>
    </>
  );
}

export function Careers() {
  const crumbs = [{ name: 'Home', to: '/' }, { name: 'Careers', to: '/careers' }];
  return (
    <>
      <Seo title={titles.careers} description="Work at RUNI Industries in Eindhoven: warehouse, sales and logistics roles in a growing steel hardware supplier serving Europe." path="/careers" breadcrumbs={crumbs} />
      <PageHero eyebrow="Careers" title="Work with us in Eindhoven" lead="We are a small team handling stock, sales and logistics for customers across Europe." image={scene.warehouseAisle} />
      <section className="wrap section max-w-3xl prose-block"><p>There are no open vacancies published at the moment. If you work in warehousing, B2B sales or freight and want to be considered for future roles, send a short introduction and your CV to {company.emails[0]}.</p></section>
    </>
  );
}

export function Legal() {
  const { slug } = useParams();
  const d = legalDocs[slug];
  if (!d) return <Navigate to="/404" replace />;
  return (
    <>
      <Seo title={`${d.title} | RUNI Industries`} description={`${d.title} of RUNI Industries B.V., Eindhoven.`} path={`/${slug}`} />
      {/* Plain text document: no hero photograph, and Layout omits the footer on these routes. */}
      <article className="wrap max-w-3xl py-14 sm:py-20">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{d.title}</h1>
        {d.sections.map((sec) => (
          <section key={sec.heading} className="mt-9">
            <h3 className="text-lg font-bold text-steel-900">{sec.heading}</h3>
            <p className="mt-2 text-[17px] leading-relaxed text-steel-800">{sec.body}</p>
          </section>
        ))}
        <p className="mt-12 border-t border-steel-200 pt-5 text-sm text-steel-600">Last updated: {LAST_UPDATED}.</p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-brand">
          {Object.entries(legalDocs).filter(([k]) => k !== slug).map(([k, v]) => (
            <Link key={k} to={`/${k}`} className="hover:underline">{v.title.split(' for ')[0]}</Link>
          ))}
          <Link to="/" className="hover:underline">Back to home</Link>
        </div>
      </article>
    </>
  );
}

export function NotFound() {
  return (
    <>
      <Seo title="Page not found | RUNI Industries" description="This page does not exist." path="/404" noindex />
      <section className="wrap section text-center"><p className="eyebrow">404</p><h1 className="mt-3 text-3xl font-bold">That page is not here</h1><p className="mt-3 text-steel-600">The address may have changed. Try the product ranges or contact us.</p><div className="mt-6 flex justify-center gap-3"><Link to="/products" className="btn-primary">Products</Link><Link to="/contact" className="btn-ghost">Contact</Link></div></section>
    </>
  );
}
