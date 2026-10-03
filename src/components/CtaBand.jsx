import { Link } from 'react-router-dom';
import { ctaBand } from '../data/homeContent.js';
import { scene } from '../data/media.js';
import { img } from '../lib/media.js';
import { Reveal } from './Reveal.jsx';

/**
 * Closing call to action. The photograph sits behind a brand wash heavy enough to keep the
 * band unmistakably RUNI blue and the white type at full contrast, with the image reading as
 * texture rather than as a picture competing with the copy.
 */
export default function CtaBand({ heading = ctaBand.heading, body = ctaBand.body, image = scene.warehouseAisle }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      {image && (
        <>
          <img
            src={img(image, { w: 1920, h: 520 })} alt="" width="1920" height="520" loading="lazy"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-brand/90" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-deep/70 via-brand/40 to-transparent" />
        </>
      )}
      <div className="wrap section grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <Reveal>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{heading}</h2>
          <p className="mt-3 max-w-xl text-brand-tint">{body}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-3">
            <Link to={ctaBand.primary.to} className="btn-light">{ctaBand.primary.label}</Link>
            <a href={ctaBand.secondary.href} className="btn border border-white/40 text-white hover:bg-white/10">{ctaBand.secondary.label}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
