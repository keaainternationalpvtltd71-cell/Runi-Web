/** Shared factual product/partner media serves from R2 (media.keaainternational.com);
 *  RUNI's own media ships in public/ or serves from the VITE_MEDIA_BASE_URL R2 base. */
const MEDIA = import.meta.env.VITE_MEDIA_BASE_URL || '';
const KEAA_MEDIA = 'https://media.keaainternational.com';

export function img(url, { w = 800, h, fit = 'fill' } = {}) {
  if (!url) return '';
  // media.keaainternational.com objects ride Cloudflare Image Resizing on that zone.
  // Cloudinary fit names map: fill→cover, fit→contain, limit→scale-down.
  if (url.startsWith(`${KEAA_MEDIA}/`)) {
    const key = url.slice(KEAA_MEDIA.length + 1).replace(/^cdn-cgi\/image\/[^/]+\//, '');
    const FIT = { fill: 'cover', fit: 'contain', limit: 'scale-down' };
    const t = [`width=${w}`, h ? `height=${h}` : null, `fit=${FIT[fit] || fit}`, 'format=auto']
      .filter(Boolean)
      .join(',');
    return `${KEAA_MEDIA}/cdn-cgi/image/${t}/${key}`;
  }
  // Legacy branch: nothing references Cloudinary any more (the aluminium set moved to R2,
  // 2.runi-assets/, on 2026-10-07); kept so an overlooked URL still renders.
  if (url.includes('res.cloudinary.com')) {
    const t = [`f_auto`, `q_auto`, `w_${w}`, h ? `h_${h}` : null, fit ? `c_${fit}` : null].filter(Boolean).join(',');
    // Same transform slot for uploaded assets and for originals delivered via /fetch/.
    for (const seg of ['/upload/', '/fetch/']) if (url.includes(seg)) return url.replace(seg, `${seg}${t}/`);
  }
  if (url.startsWith('/media/')) return url;                 // shipped in public/, served as is
  if (url.startsWith('/') && MEDIA) return `${MEDIA}/cdn-cgi/image/width=${w},format=auto${h ? `,height=${h},fit=cover` : ''}${url}`;
  return url;
}
