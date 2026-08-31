import Breadcrumbs, { type Crumb } from './Breadcrumbs';

interface Props {
  /** The page's single H1. */
  heading: string;
  /** Short kicker above the heading. */
  eyebrow?: string;
  intro?: string;
  trail: Crumb[];
}

/**
 * Standard interior-page header. Padded at the top to clear the fixed site
 * header, and guarantees exactly one H1 per page.
 */
export default function PageHeader({ heading, eyebrow, intro, trail }: Props) {
  return (
    <div className="bg-background pb-10 pt-28 md:pt-32">
      <div className="container mx-auto px-4">
        <Breadcrumbs trail={trail} />
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl text-primary md:text-5xl">{heading}</h1>
        {intro && <p className="section-subtitle mt-4 max-w-3xl">{intro}</p>}
      </div>
    </div>
  );
}
