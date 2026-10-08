/* Builds vercel.json: Vercel build settings, www to non-www (the bare "/" needs its own rule: /:path* does
   not match the root), legacy RUNI URLs (exact and by product id), /public prefix, .php catch-all. */
import fs from 'node:fs';
const legacy = JSON.parse(fs.readFileSync('scripts/runi-legacy-redirects.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('src/data/products.json', 'utf8'));
const cats = JSON.parse(fs.readFileSync('src/data/categories.json', 'utf8'));
const slug = (s) => String(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const catSlug = Object.fromEntries(cats.map((c) => [c.name, c.slug]));
const subSlug = {}; for (const c of cats) for (const s of c.subcategories) subSlug[s.name] = s.slug;
const newPath = (p) => `/products/${catSlug[p.category] || slug(p.category)}/${subSlug[p.subcategory] || subSlug[p.subcategory.replace(' - ', '-')] || slug(p.subcategory)}/${p.slug}`;
const redirects = [];
for (const [from, to] of Object.entries(legacy.exact)) {
  if (from === '/' || to === '410') continue;
  redirects.push({ source: from, destination: to, permanent: true });
  redirects.push({ source: `/public${from}`, destination: to, permanent: true });
}
for (const p of products) { const d = newPath(p); redirects.push({ source: `/product/:s/${p.id}`, destination: d, permanent: true }); redirects.push({ source: `/public/product/:s/${p.id}`, destination: d, permanent: true }); }
redirects.push({ source: '/enquiry/:path*', destination: '/contact?tab=rfq', permanent: true });
redirects.push({ source: '/public/:path*', destination: '/:path*', permanent: true });
redirects.push({ source: '/:path*.php', destination: '/', permanent: true });
const vercel = {
  framework: 'vite', installCommand: 'npm ci', buildCommand: 'npm run build', outputDirectory: 'dist',
  cleanUrls: true, trailingSlash: false,
  redirects: [{ source: '/', has: [{ type: 'host', value: 'www.runiindustries.eu' }], destination: 'https://runiindustries.eu/', permanent: true }, { source: '/:path*', has: [{ type: 'host', value: 'www.runiindustries.eu' }], destination: 'https://runiindustries.eu/:path*', permanent: true }, ...redirects],
  headers: [{ source: '/(.*)', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'X-Frame-Options', value: 'SAMEORIGIN' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }, { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }] }, { source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }],
};
fs.writeFileSync('vercel.json', JSON.stringify(vercel, null, 2) + '\n');
console.log(`vercel.json: ${vercel.redirects.length} redirects`);
