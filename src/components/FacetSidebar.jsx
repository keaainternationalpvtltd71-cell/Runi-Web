import { Link } from 'react-router-dom';
import { keywordFor } from '../lib/catalog.js';
import { subImage } from '../data/media.js';

/* One checkbox group in the filter panel. */
function Group({ title, options, active, onToggle }) {
  if (!options.length) return null;
  return (
    <div className="border-t border-steel-100 px-5 py-4 first:border-t-0">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-steel-600">{title}</p>
      <ul className="mt-3 space-y-2">
        {options.map(({ value, count }) => (
          <li key={value}>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-steel-800 hover:text-brand">
              <input
                type="checkbox" checked={active.includes(value)} onChange={() => onToggle(value)}
                className="!m-0 h-4 !w-4 shrink-0 cursor-pointer !rounded-sm !p-0 accent-brand"
              />
              <span className="flex-1">{value}</span>
              <span className="text-xs text-steel-600">({count})</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Category sidebar: the range header, its subcategories with counts, then the facet panel.
 * `sub` is the active subcategory slug, or '' on the category page itself.
 */
export default function FacetSidebar({ cat, sub = '', facets, active, onToggle, onClear, activeCount }) {
  return (
    <div className="space-y-5">
      <div className="rounded-card bg-steel-900 p-5 text-white">
        <h2 className="text-lg font-bold text-white">{cat.name}</h2>
        <p className="mt-1 text-sm text-steel-300">{cat.count} products</p>
      </div>

      <nav className="overflow-hidden rounded-card border border-steel-200 bg-white" aria-label="Subcategories">
        <Link
          to={`/products/${cat.slug}`}
          className={`flex items-center justify-between px-5 py-3 text-sm ${!sub ? 'bg-brand-tint font-semibold text-brand' : 'text-steel-800 hover:bg-steel-50'}`}
        >
          <span>All products</span><span className="text-xs">{cat.count}</span>
        </Link>
        {cat.subcategories.map((s) => (
          <Link
            key={s.slug} to={`/products/${cat.slug}/${s.slug}`}
            className={`flex items-center justify-between border-t border-steel-100 px-5 py-3 text-sm ${sub === s.slug ? 'bg-brand-tint font-semibold text-brand' : 'text-steel-800 hover:bg-steel-50'}`}
          >
            <span className="flex items-center gap-2.5">
              {subImage[s.slug] && <img src={subImage[s.slug]} alt="" width="32" height="32" loading="lazy" className="h-8 w-8 shrink-0 rounded object-cover" />}
              {keywordFor(s)}
            </span>
            <span className="text-xs text-steel-600">{s.count}</span>
          </Link>
        ))}
      </nav>

      <div className="rounded-card border border-steel-200 bg-white">
        <div className="flex items-center justify-between px-5 pb-1 pt-4">
          <p className="font-bold text-steel-900">Filter products</p>
          {activeCount > 0 && <button type="button" onClick={onClear} className="text-xs font-semibold text-brand hover:underline">Clear ({activeCount})</button>}
        </div>
        <Group title="Product type" options={facets.type} active={active.type} onToggle={(v) => onToggle('type', v)} />
        <Group title="Finish" options={facets.finish} active={active.finish} onToggle={(v) => onToggle('finish', v)} />
        <Group title="Tube size" options={facets.tube} active={active.tube} onToggle={(v) => onToggle('tube', v)} />
      </div>
    </div>
  );
}
