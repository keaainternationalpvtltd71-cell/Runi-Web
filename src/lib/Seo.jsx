import { Head } from 'vite-react-ssg';
import { company } from '../data/company.js';
import { SITE } from '../data/seoKeywords.js';

const clip = (s, n) => (s && s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') : s);

export default function Seo({ title, description, path = '/', image = '/og-default.jpg', noindex = false, jsonLd = [], breadcrumbs = [] }) {
  const url = `${SITE.url}${path === '/' ? '' : path}`;
  const t = clip(title, 60);
  const d = clip(description, 160);
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: company.name, url: SITE.url, logo: `${SITE.url}/logo.png`, address: { '@type': 'PostalAddress', streetAddress: company.headOffice.line1, postalCode: '5657 HJ', addressLocality: 'Eindhoven', addressCountry: 'NL' }, telephone: company.phones[0], email: company.emails[0] },
    breadcrumbs.length ? { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `${SITE.url}${b.to}` })) } : null,
    ...jsonLd,
  ].filter(Boolean);
  return (
    <Head>
      <title>{t}</title>
      <meta name="description" content={d} />
      <link rel="canonical" href={url} />
      {noindex ? <meta name="robots" content="noindex,follow" /> : <meta name="robots" content="index,follow" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image.startsWith('http') ? image : `${SITE.url}${image}`} />
      <meta property="og:locale" content="en_GB" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      {ld.map((o, i) => <script key={i} type="application/ld+json">{JSON.stringify(o)}</script>)}
    </Head>
  );
}
