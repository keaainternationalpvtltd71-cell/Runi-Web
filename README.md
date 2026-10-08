# RUNI Industries B.V. website

React 18, Vite 5, Tailwind, framer-motion, react-router 6, prerendered with vite-react-ssg. Deploys to Vercel as a static site. Enquiries POST straight to the enquiry API at `VITE_API_BASE_URL` (`/api/contact`, `/api/rfq`), protected by Cloudflare Turnstile (`VITE_TURNSTILE_SITE_KEY`).

**Forms.** `src/lib/enquiryRequest.js` maps each form to its request (tested: `npm test`), `src/lib/enquiryApi.js` sends it. With `VITE_API_BASE_URL` empty the forms stay offline and ask the visitor to email or call, so a preview without the variable sends nothing. The API accepts this origin on those form paths only (CORS); it tells the brands apart server-side.

## Run
```
npm install
cp .env.example .env
npm run dev          # http://localhost:5173
npm run build        # prebuild: vercel.json redirects; build: 384 prerendered pages; postbuild: sitemap + brand check
npm run preview
```

## What is where
- `src/data/products.json`, `categories.json`: shared factual catalogue (355 products, 4 categories, 28 subcategories). Product images stay on Cloudinary via `src/lib/media.js`.
- `src/data/company.js`: RUNI entity. `null` fields (KvK, VAT, opening hours, LinkedIn) must be filled before launch.
- `src/data/seoKeywords.js`: RUNI search phrases, title and meta templates (supplier / Netherlands / Europe intent).
- `src/data/categoryPillars.js`, `src/lib/subcategoryCopy.js`: RUNI copy for 4 categories and 28 subcategories.
- `src/data/homeContent.js`, `solutions.js`, `insights.js`: homepage, 4 solution pages, 3 articles.
- `src/pages/`: Home, Products (search, filters, sort, load more), Category, Subcategory, ProductDetail (noindex until `runiCopyReady: true` on the product), Solutions, About, Quality, Insights, Contact (`?tab=rfq`), Careers, Legal, 404.
- `src/components/cards/`: seven card variants (product, category tile, industry, stat, trust, news, CTA).
- `scripts/gen-redirects.mjs`: builds `vercel.json` from `runi-legacy-redirects.json` plus every old `/product/:slug/:id` URL. `gen-sitemap.mjs`: indexable URLs only. `check-brand.mjs`: fails the build on any KEAA mention (outside product image hosts) or `[VERIFY]` placeholder.

## SEO rules baked in
Self canonical on every page, hreflang en + x-default only, Organization + BreadcrumbList on all pages, CollectionPage on category pages, FAQPage on categories with FAQs, Product schema on product pages, Article on insights. Product pages ship `noindex,follow` until their RUNI copy is written, so they never compete with keaainternational.com.

## Before launch
1. Fill `company.js` nulls; set `manufacturingPartner.mentionPublicly` if the About page should name the partner.
2. Set `VITE_API_BASE_URL`, `VITE_TURNSTILE_SITE_KEY` and `VITE_GA_ID` in the Vercel project (Production).
3. Replace `public/og-default.jpg` with a designed card; add RUNI photography (hero poster, warehouse, team) to R2 and reference via `VITE_MEDIA_BASE_URL`.
4. Dutch translation (`nl`) before flipping `live: true` in `src/i18n/languages.js` (not wired yet; en only ships).
5. Vercel: add domain `runiindustries.eu` (primary) and `www` (redirects). Search Console domain property, submit `/sitemap.xml`, request indexing on home, 4 categories, 28 subcategories.
6. Cookie consent component for GA (analytics loads only with `VITE_GA_ID`; add a consent gate before enabling in production).

## Known limits in this first build
- Header hero uses a gradient, not video: no RUNI footage exists yet. `homeContent.hero.media` is wired for a poster and a lazy video when it arrives.
- Bundle includes the full product JSON (about 200 KB). Split per category if it grows.
- Visual QA on desktop, tablet and mobile is still to be done in a browser.
