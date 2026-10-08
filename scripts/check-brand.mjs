/* Fails the build if the partner brand ships anywhere in dist: built HTML, JS and CSS bundles,
   JSON, XML, text and dotfiles alike, whether or not a page ever displays it (a hidden data field
   in a bundle still ships). Shared media is served as /img/<folder>/ through vercel.json rewrites,
   so the bucket host and its key prefixes never need to appear. Also fails on [VERIFY]
   placeholders in built HTML. Runs last in postbuild so it sees every generated file. */
import fs from 'node:fs'; import path from 'node:path';
const TEXT = /\.(html?|m?js|css|json|xml|txt|svg|webmanifest|map)$|^\.htaccess$|^_redirects$|^_headers$/i;
const bad = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) { walk(p); continue; }
    if (!TEXT.test(f)) continue;
    const text = fs.readFileSync(p, 'utf8');
    if (/\.html?$/i.test(f) && text.includes('[VERIFY')) bad.push(`${p}: [VERIFY] placeholder`);
    // Embedded base64 (e.g. the PNG inside favicon.svg) can spell "keaa" by chance; it carries no readable text.
    const readable = text.replace(/;base64,[A-Za-z0-9+/=\s]+/g, ';base64,');
    const hits = [...readable.matchAll(/.{0,40}keaa.{0,40}/gis)];
    if (hits.length) bad.push(`${p}: ${hits.length} KEAA mention(s), first: …${hits[0][0].replace(/\s+/g, ' ')}…`);
  }
}
walk('dist');
if (bad.length) { console.error('check:brand FAILED\n' + bad.slice(0, 20).join('\n')); process.exit(1); }
console.log('check:brand: clean (no KEAA string in any shipped file)');
