/** Product images stay on Cloudinary (shared factual data). RUNI's own media serves from R2. */
const MEDIA = import.meta.env.VITE_MEDIA_BASE_URL || '';
export function img(url, { w = 800, h, fit = 'fill' } = {}) {
  if (!url) return '';
  if (url.includes('res.cloudinary.com')) {
    const t = [`f_auto`, `q_auto`, `w_${w}`, h ? `h_${h}` : null, fit ? `c_${fit}` : null].filter(Boolean).join(',');
    // Same transform slot for uploaded assets and for originals delivered via /fetch/.
    for (const seg of ['/upload/', '/fetch/']) if (url.includes(seg)) return url.replace(seg, `${seg}${t}/`);
  }
  if (url.startsWith('/media/')) return url;                 // shipped in public/, served as is
  if (url.startsWith('/') && MEDIA) return `${MEDIA}/cdn-cgi/image/width=${w},format=auto${h ? `,height=${h},fit=cover` : ''}${url}`;
  return url;
}
