/* Sitemap from the built dist: only indexable pages (no noindex, no 404). */
import fs from 'node:fs'; import path from 'node:path';
const SITE = 'https://runiindustries.eu'; const urls = [];
function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f === 'index.html') { const html = fs.readFileSync(p, 'utf8'); if (/noindex/.test(html)) continue; let u = p.replace(/^dist/, '').replace(/\/index\.html$/, ''); if (u === '' ) u = '/'; if (u === '/404') continue; urls.push(u); } } }
walk('dist');
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.sort().map((u) => `  <url><loc>${SITE}${u === '/' ? '' : u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync('dist/sitemap.xml', xml); console.log(`sitemap: ${urls.length} URLs`);
