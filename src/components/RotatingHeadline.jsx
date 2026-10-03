import { useEffect, useState } from 'react';

const DWELL = 2600;   // how long a phrase is held, once it has finished arriving
const OUT_MS = 300;   // must match .phrase-out in index.css
const IN_MS = 460;    // must match .phrase-in in index.css

/**
 * Hero headline: a fixed first line with a rotating line beneath it.
 *
 * Layout is reserved rather than measured. Every phrase is rendered once, invisible, stacked
 * into a single grid cell; that hidden layer fixes the box to the tallest and widest phrase
 * for the current viewport, so the visible phrase can be any length without moving anything
 * on the page, at any breakpoint, including when a long phrase wraps on a narrow screen.
 *
 * Only one phrase is ever visible. It animates out completely, then the next animates in, so
 * the two never overlap and there is no crossfade flash. The animations are keyframes, not
 * transitions, because a keyframe animation runs on mount, which is what makes the incoming
 * phrase animate rather than simply appear.
 *
 * The visible text is hidden from assistive tech; the heading carries one stable label so a
 * screen reader is not read a new heading every few seconds.
 */
export default function RotatingHeadline({ lead, phrases, className = '', phraseClassName = '' }) {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState('in');

  useEffect(() => {
    if (phrases.length < 2) return;
    let timer;
    if (phase === 'in') {
      // Hold, then start the exit. While the tab is hidden, re-arm instead of advancing;
      // setting the same phase again would not re-run this effect and would stall it.
      const tick = () => {
        if (document.hidden) { timer = setTimeout(tick, 1000); return; }
        setPhase('out');
      };
      timer = setTimeout(tick, DWELL + IN_MS);
    } else {
      timer = setTimeout(() => {
        setI((n) => (n + 1) % phrases.length);
        setPhase('in');
      }, OUT_MS);
    }
    return () => clearTimeout(timer);
  }, [phase, i, phrases.length]);

  return (
    <h1 className={className} aria-label={`${lead}: ${phrases.join(', ')}`}>
      <span aria-hidden="true">
        <span className="block">{lead}</span>

        {/* py/-my gives the mask room for descenders without altering the reserved height. */}
        <span className={`relative grid overflow-hidden py-[0.16em] -my-[0.16em] ${phraseClassName}`}>
          {phrases.map((p) => (
            <span key={`reserve-${p}`} className="invisible col-start-1 row-start-1 block">{p}</span>
          ))}
          <span
            key={i}
            className={`col-start-1 row-start-1 block will-change-[opacity,transform] ${phase === 'out' ? 'phrase-out' : 'phrase-in'}`}
          >
            {phrases[i]}
          </span>
        </span>
      </span>
    </h1>
  );
}
