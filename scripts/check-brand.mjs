/* Fails the build if KEAA identity or [VERIFY] placeholders leak into built HTML. Shared factual
   product media is allowed: URLs on media.keaainternational.com (the R2 bucket both sites share,
   including its /cdn-cgi/image/ transforms and the preconnect hint) and the old
   res.cloudinary.com/keaa-assets form. Marketing copy, schema and any other KEAA mention still fail.
   The About page manufacturing partner line is allowed. */
import fs from 'node:fs'; import path from 'node:path';
let bad = [];
function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) { const html = fs.readFileSync(p, 'utf8'); if (html.includes('[VERIFY')) bad.push(`${p}: [VERIFY] placeholder`); const stripped = html.replace(/res\.cloudinary\.com\/keaa-assets[^"' )]*/g, '').replace(/media\.keaainternational\.com[^"' )]*/g, ''); const hits = (stripped.match(/keaa/gi) || []).length; const allowed = p.includes('/about/') ? 1 : 0; if (hits > allowed) bad.push(`${p}: ${hits} KEAA mention(s)`); } } }
walk('dist');
if (bad.length) { console.error('check:brand FAILED\n' + bad.slice(0, 20).join('\n')); process.exit(1); }
console.log('check:brand: clean');
