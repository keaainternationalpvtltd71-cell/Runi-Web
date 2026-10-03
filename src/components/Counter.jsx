import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
export default function Counter({ value }) {
  const m = String(value).match(/^([^0-9]*)([0-9][0-9,.]*)(.*)$/);
  const ref = useRef(null); const inView = useInView(ref, { once: true }); const reduce = useReducedMotion();
  const target = m ? Number(m[2].replace(/,/g, '')) : null;
  const [n, setN] = useState(reduce || target === null ? target : 0);
  useEffect(() => {
    if (!inView || reduce || target === null) return;
    let f = 0; const steps = 40; const id = setInterval(() => { f++; setN(Math.round((target * f) / steps)); if (f >= steps) clearInterval(id); }, 25);
    return () => clearInterval(id);
  }, [inView, reduce, target]);
  if (!m) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{m[1]}{n === null ? m[2] : n.toLocaleString('en-GB')}{m[3]}</span>;
}
