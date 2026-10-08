/* Shared media is served same-origin under /img/<folder>/ and proxied by Vercel rewrites
   (gen-redirects.mjs) to the R2 bucket behind MEDIA_ORIGIN. Build-time only: never import this
   from src/, so the bucket host and prefixes stay out of the shipped bundle.
   /img/<folder>/<file>          -> MEDIA_ORIGIN/<prefix>/<file>
   /img/t/<options>/<folder>/<file> -> MEDIA_ORIGIN/cdn-cgi/image/<options>/<prefix>/<file> */
export const MEDIA_ORIGIN = 'https://media.keaainternational.com';

export const MEDIA_FOLDERS = {
  products: '1.keaa-assets/keaa-products',
  certificates: '1.keaa-assets/keaa-certificates',
  manufacturing: '1.keaa-assets/keaa-manufacturing',
  runi: '2.runi-assets/runi-web',
};
