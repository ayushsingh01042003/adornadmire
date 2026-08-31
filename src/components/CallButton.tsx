import { BUSINESS, formatPhone } from '../data/site';
import { reportCallConversion } from '../lib/analytics';

interface Props {
  /** Identifies which CTA fired, so GA4 can tell hero from header from footer. */
  source: string;
  className?: string;
  children?: React.ReactNode;
  phone?: string;
}

/**
 * Every phone CTA on the site routes through here so conversion tracking can
 * never be silently missing from one of them.
 */
export default function CallButton({
  source,
  className = 'btn btn-primary',
  children,
  phone = BUSINESS.phonePrimary,
}: Props) {
  return (
    <a
      href={`tel:${phone}`}
      className={className}
      onClick={() => reportCallConversion(source)}
      aria-label={`Call ${BUSINESS.name} on ${formatPhone(phone)}`}
    >
      {children ?? `Call ${formatPhone(phone)}`}
    </a>
  );
}
