import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaDirections } from 'react-icons/fa';

import { BUSINESS, formatPhone } from '../data/site';
import { reportCallConversion, trackEvent } from '../lib/analytics';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Name, address, phone and hours in one visible block, matching the
 * openingHoursSpecification in the LocalBusiness schema exactly.
 *
 * The previous build had no contact section at all: ContactHours.tsx was
 * misnamed and only rendered reviews, so the address appeared solely in the
 * footer and the opening hours only as one line of hero copy.
 */
export default function ContactDetails() {
  const mapQuery = encodeURIComponent(
    `${BUSINESS.name}, ${BUSINESS.street}, ${BUSINESS.locality}, ${BUSINESS.city} ${BUSINESS.postalCode}`,
  );

  return (
    <section className="bg-white py-16" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4">
        <h2 id="contact-heading" className="section-title mb-10 text-center">
          Visit Adorn &amp; Admire
        </h2>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <address className="not-italic">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <FaMapMarkerAlt aria-hidden="true" className="mt-1 text-xl text-accent" />
                  <div>
                    <h3 className="mb-1 font-display text-lg text-primary">Address</h3>
                    <p className="prose-body text-base">
                      {BUSINESS.street}
                      <br />
                      {BUSINESS.locality}, {BUSINESS.city}
                      <br />
                      {BUSINESS.region} {BUSINESS.postalCode}
                    </p>
                    <a
                      href={BUSINESS.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('directions_click', { source: 'contact-page' })}
                      className="mt-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary hover:text-accent"
                    >
                      <FaDirections aria-hidden="true" />
                      Get directions
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <FaPhone aria-hidden="true" className="mt-1 text-xl text-accent" />
                  <div>
                    <h3 className="mb-1 font-display text-lg text-primary">Phone</h3>
                    <a
                      href={`tel:${BUSINESS.phonePrimary}`}
                      onClick={() => reportCallConversion('contact-page-primary')}
                      className="block text-lg text-secondary hover:text-accent"
                    >
                      {formatPhone(BUSINESS.phonePrimary)}
                    </a>
                    <a
                      href={`tel:${BUSINESS.phoneSecondary}`}
                      onClick={() => reportCallConversion('contact-page-secondary')}
                      className="block text-lg text-secondary hover:text-accent"
                    >
                      {formatPhone(BUSINESS.phoneSecondary)}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <FaEnvelope aria-hidden="true" className="mt-1 text-xl text-accent" />
                  <div>
                    <h3 className="mb-1 font-display text-lg text-primary">Email</h3>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="break-all text-secondary hover:text-accent"
                    >
                      {BUSINESS.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <FaClock aria-hidden="true" className="mt-1 text-xl text-accent" />
                  <div className="w-full">
                    <h3 className="mb-2 font-display text-lg text-primary">Opening hours</h3>
                    <table className="w-full max-w-xs text-sm">
                      <caption className="sr-only">Weekly opening hours</caption>
                      <tbody>
                        {DAYS.map((day) => (
                          <tr key={day}>
                            <th scope="row" className="py-1 pr-4 text-left font-normal text-gray-700">
                              {day}
                            </th>
                            <td className="py-1 text-primary">{BUSINESS.hoursLabel}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </li>
              </ul>
            </address>
          </div>

          <div>
            <h3 className="mb-3 font-display text-lg text-primary">Find us on the map</h3>
            {/*
              loading="lazy" keeps the Maps iframe and its scripts off the
              critical path; an embedded map is otherwise one of the heaviest
              things on a contact page.
            */}
            <iframe
              title={`Map showing ${BUSINESS.name} in ${BUSINESS.locality}, ${BUSINESS.city}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-[420px] w-full rounded-sm border border-gray-light"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="mt-6 rounded-sm bg-background p-5">
              <h3 className="mb-2 font-display text-lg text-primary">Getting here</h3>
              <p className="prose-body text-base">
                We are on the first floor of VP Plaza on CMR Main Road, in HRBR Layout 2nd Block,
                a short walk from Kalyan Nagar and easily reached from Banaswadi, Kammanahalli
                and Indiranagar. Walk-ins are welcome, though calling ahead is safest on weekends
                and weekday evenings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
