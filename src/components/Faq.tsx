export interface FaqItem { question: string; answer: string }

/**
 * FAQ block. Rendered as plain, always-visible markup rather than a collapsed
 * accordion: Google requires FAQPage answer text to be present in the HTML,
 * and content hidden behind JavaScript-only toggles risks not counting.
 */
export default function Faq({
  items,
  heading = 'Frequently asked questions',
}: {
  items: FaqItem[];
  heading?: string;
}) {
  return (
    <section className="bg-white py-16" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4">
        <h2 id="faq-heading" className="section-title mb-8 text-center">
          {heading}
        </h2>
        <dl className="mx-auto max-w-3xl divide-y divide-gray-light">
          {items.map((item) => (
            <div key={item.question} className="py-5">
              <dt className="mb-2 font-display text-xl text-primary">{item.question}</dt>
              <dd className="prose-body">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
