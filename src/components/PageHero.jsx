import { Reveal } from './Reveal.jsx';
import { img } from '../lib/media.js';

/**
 * Page header. With `image` it becomes a photographic band: the photo sits full bleed and a
 * black vignette darkens the edges so the type stays readable without a coloured panel over
 * the picture. Content stays deliberately light here: eyebrow, title, one line of lead.
 */
export default function PageHero({ eyebrow, title, lead, image, dark = false }) {
  const onPhoto = Boolean(image);
  const light = onPhoto || dark;
  return (
    <section className={`relative isolate overflow-hidden ${onPhoto ? 'bg-black' : dark ? 'bg-steel-900 text-white' : 'bg-steel-50'}`}>
      {onPhoto && (
        <>
          <img
            src={img(image, { w: 1920, h: 640 })} alt="" width="1920" height="640"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          {/* Blackish shade into every edge, heaviest bottom left where the type sits. */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_70%_20%,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.88)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        </>
      )}
      <div className="wrap py-14 sm:py-20">
        <Reveal>
          {eyebrow && <p className={`eyebrow mb-3 ${light ? 'text-brand-tint' : ''}`}>{eyebrow}</p>}
          <h1 className={`max-w-3xl text-3xl font-bold leading-tight sm:text-5xl ${light ? 'text-white' : ''}`}>{title}</h1>
          {lead && <p className={`mt-5 max-w-2xl text-lg ${light ? 'text-steel-200' : 'text-steel-600'}`}>{lead}</p>}
        </Reveal>
      </div>
    </section>
  );
}
