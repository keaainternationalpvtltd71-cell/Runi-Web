import { standards } from '../data/media.js';
import { img } from '../lib/media.js';

/**
 * Continuously scrolling strip of the certification marks the goods are made against.
 * The track holds the list twice so the -50% keyframe in index.css loops seamlessly;
 * that same stylesheet stops the animation under prefers-reduced-motion, which leaves
 * the first set sitting still and readable.
 */
export default function CertMarquee({ heading = 'Certified to European and international schemes' }) {
  return (
    <section className="border-y border-steel-200 bg-white py-10">
      {heading && <p className="wrap mb-7 text-center text-xs font-semibold uppercase tracking-[0.18em] text-steel-600">{heading}</p>}
      <div
        className="group relative overflow-hidden"
        style={{ maskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)' }}
      >
        <ul className="marquee w-max items-center group-hover:[animation-play-state:paused]">
          {[...standards, ...standards].map((m, i) => (
            <li key={`${m.key}-${i}`} className="shrink-0" aria-hidden={i >= standards.length}>
              <img
                src={img(m.image, { w: 300, fit: 'pad' })}
                alt={i < standards.length ? m.label : ''}
                width="150" height="64" loading="lazy"
                className="h-12 w-auto object-contain sm:h-14"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
