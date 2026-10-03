# RUNI Industries website: build brief for Claude Code

Read this first. Then read the owner's long specification (38 sections). This file maps that
specification onto the actual repository and the overlay files delivered with it, sets the
order of work, and fixes the rules that protect both sites' SEO.

## 0. Ground truth

- Foundation repo: the KEAA frontend (React 18, Vite, Tailwind, framer-motion, react-router,
  prerender scripts under scripts/, Vercel edge middleware). Backend: Spring Boot on Railway.
- Overlay files in this package (drop in over the fork, same paths):
  - src/data/company.js              RUNI entity, [VERIFY] fields must be filled before launch
  - src/data/navigation.js           RUNI nav and footer nav
  - src/data/seoKeywords.js          RUNI phrases, title and meta builders
  - src/data/categoryPillars.js      4 category copy blocks, RUNI voice
  - src/data/homeContent.js          homepage copy and section data
  - src/i18n/languages.js            en, nl live; de, fr prepared
  - src/brand.runi.css               provisional tokens, logo colours [VERIFY]
  - scripts/runi-legacy-redirects.json  old URL map from Google's index
  - public/robots.txt
- Not in this package and still needed from RUNI: logo (SVG), KvK and VAT numbers, opening
  hours, LinkedIn URL, team names for About, photography (warehouse, yard, team), the
  statement of which lines are physically stocked vs to order, and Dutch translations review.

## 1. Non negotiable SEO rules (both sites depend on these)

1. No sentence of marketing copy shared with keaainternational.com. Factual product fields
   (name, item code, dimensions, standard, material, images) may be shared. Intros, metas,
   H1 phrasing, FAQs and CTAs may not.
2. Product pages launch with `<meta name="robots" content="noindex,follow">` until each has
   RUNI specific intro and meta. Release in batches via a `runiCopyReady: true` flag on the
   product record. Subcategory and category pages are indexable from day one because their
   copy is unique (this package plus the 28 subcategory texts to follow).
3. Canonical is always the runiindustries.eu URL. Never a KEAA URL.
4. hreflang only across RUNI locales (en, nl, then de, fr). Never to KEAA.
5. Organization schema: RUNI values only. Grep the built HTML for "keaa" and fail the build
   on any hit outside an explicitly allowlisted manufacturing partner mention on /about.
6. Old RUNI URLs 301 in one hop per scripts/runi-legacy-redirects.json, both hosts, both
   schemes, with and without /public/.
7. Preferred host: https://runiindustries.eu (non-www). www 301s to it.

## 2. Order of work (8 days)

Day 1. Fork to a new repo. New Vercel project, env, Railway service or shared backend with
       SITE=runi, Cloudflare zone for runiindustries.eu, Search Console domain property, GA4
       property. Drop in the overlay. Global find and replace of KEAA identity per section 35
       of the spec; report every remaining hit for approval.
Day 2. Brand: apply brand.runi.css once logo colours are confirmed. New Header (utility bar
       with Get a quote, WhatsApp, language), new Footer (different treatment from KEAA),
       RUNI 404. Languages: en, nl only live.
Day 3. Homepage from homeContent.js: cinematic hero (poster first, video lazy, pauses when
       hidden, honours prefers-reduced-motion), proof strip with animated counters (only the
       values in company.stats), 4 numbered category tiles with hover image reveal, Why RUNI
       grid, solutions row, CTA band. No manufacturing band, no certification marquee.
Day 4. Category and subcategory pages: CategoryPillar renders categoryPillars.js; new
       category card and product card variants. Products page: search, filters, sort, load
       more, skeletons, empty and error states.
Day 5. Product detail: gallery left, sticky summary right, tabs (overview, specs,
       applications, downloads, related), enquiry CTA prefilled. All products noindex until
       flagged. About, Quality (only certifications RUNI actually holds; if none, standards
       page describing what it supplies to), Contact, Careers, Legal, Solutions (4 pages).
Day 6. SEO wiring: titles and metas from seoKeywords.js, canonical, OG, schema
       (Organization, WebSite, CollectionPage, BreadcrumbList, Product, FAQPage where FAQs
       exist), sitemap (indexable URLs only), robots. Redirect map in middleware. Analytics
       events: view_product, product_enquiry, contact_submit, catalogue_download,
       career_submit, phone_click, email_click.
Day 7. Dutch: translate chrome, home, category copy, contact, legal. Run
       check-translations.mjs; nl flips live only when it passes. QA per section 36 of the
       spec on desktop, tablet, mobile. Lighthouse on home, category, product.
Day 8. Owner approval, DNS switch at GoDaddy or registrar, deploy, submit sitemap, request
       indexing on home, 4 categories, 28 subcategories. Validate old URL redirects live.

## 3. Approval gates

Propose before implementing at these points: after the Day 1 KEAA hit report, before the
homepage layout is built (send a section list), before any product page is set indexable,
before the DNS switch. Format: what changes, files, risk, how verified.

## 4. Animation and card rules from the spec, in one line each

Reveal on scroll once, 150 to 300 ms, GPU transforms only, stagger 40 to 60 ms, no bounce,
no scroll hijack, reduced motion collapses everything to opacity. Seven card variants:
product (technical), category (image led, numbered), industry (story), certification
(trust), news (editorial), stat (numeric), CTA (conversion). Different border, ratio and
hover per variant.

## 5. Media

Cloudinary assets that KEAA owns are not RUNI's to reuse for hero and brand photography.
Product images are shared factual data and may be used. RUNI hero, warehouse, team and
brand photos go to the RUNI R2 bucket (or a runi prefix in keaa-media if one account is
used) and are served from a RUNI media hostname. Until real photos arrive, use a neutral
solid or generated abstract, never Unsplash and never KEAA plant photos.

## 6. Definition of done

All routes 200, no console errors, no hydration errors, no "keaa" in built HTML except the
allowlisted About line, zero [VERIFY] strings in shipped code, sitemap contains only
canonical indexable URLs, old URLs 301 in one hop, Lighthouse mobile 85+ on home and
category, GA4 events firing, en and nl live, product pages noindex until flagged.
