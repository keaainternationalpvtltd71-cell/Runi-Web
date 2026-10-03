import { Link } from 'react-router-dom';
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="wrap py-3 text-xs text-steel-600">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((b, i) => (
          <li key={b.to} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? <span className="text-steel-900">{b.name}</span> : <Link className="hover:text-brand" to={b.to}>{b.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
