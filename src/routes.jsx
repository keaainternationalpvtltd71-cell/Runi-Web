import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import { CategoryPage, SubcategoryPage } from './pages/Category.jsx';
import Certifications from './pages/Certifications.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import { About, Quality, Contact, Legal, NotFound } from './pages/Static.jsx';
import { allCategories, allProducts } from './lib/catalog.js';

export const routes = [
  {
    path: '/', Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: Products },
      { path: 'products/:cat', Component: CategoryPage, getStaticPaths: () => allCategories.map((c) => `products/${c.slug}`) },
      { path: 'products/:cat/:sub', Component: SubcategoryPage, getStaticPaths: () => allCategories.flatMap((c) => c.subcategories.map((s) => `products/${c.slug}/${s.slug}`)) },
      { path: 'products/:cat/:sub/:slug', Component: ProductDetail, getStaticPaths: () => allProducts.map((p) => p.path.slice(1)) },
      { path: 'about', Component: About },
      { path: 'quality', Component: Quality },
      { path: 'certifications', Component: Certifications },
      { path: 'contact', Component: Contact },
      // Careers is disabled for now. To restore: import Careers from Static.jsx, re-add
      // { path: 'careers', Component: Careers }, the footer link in navigation.js, and drop the
      // /careers redirect in scripts/runi-legacy-redirects.json.
      { path: ':slug', Component: Legal, getStaticPaths: () => ['privacy-policy', 'cookie-policy', 'terms'] },
      { path: '404', Component: NotFound },
      { path: '*', Component: NotFound },
    ],
  },
];
