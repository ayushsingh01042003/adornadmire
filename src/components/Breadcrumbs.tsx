import { Link } from 'react-router';
import { FaChevronRight } from 'react-icons/fa';

export interface Crumb { name: string; path: string }

/**
 * Visible breadcrumbs. The matching BreadcrumbList JSON-LD is emitted from
 * each route's meta(); Google expects the markup and the visible trail to
 * agree, so both are driven from the same array.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-secondary">
        <li>
          <Link to="/" className="hover:text-accent hover:underline">
            Home
          </Link>
        </li>
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              <FaChevronRight aria-hidden="true" className="text-[0.6rem] text-gray" />
              {isLast ? (
                <span aria-current="page" className="text-primary">
                  {crumb.name}
                </span>
              ) : (
                <Link to={crumb.path} className="hover:text-accent hover:underline">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
