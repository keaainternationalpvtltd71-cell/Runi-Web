import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
/* Legal documents render bare: no footer under them. */
const BARE = new Set(['/privacy-policy', '/cookie-policy', '/terms']);

export default function Layout() {
  const loc = useLocation(); const reduce = useReducedMotion();
  const bare = BARE.has(loc.pathname);
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:p-2">Skip to content</a>
      <Header />
      <main id="main" className="flex-1 pb-14 sm:pb-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={loc.pathname} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.22 }}><Outlet /></motion.div>
        </AnimatePresence>
      </main>
      {!bare && <Footer />}
    </div>
  );
}
