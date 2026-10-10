'use client';

import { MapPin, Phone, Clock } from '@phosphor-icons/react';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import Container from '@/components/layout/Container';
import { contactData } from '@/lib/data/uiStrings';

interface Props {
  staticData: typeof contactData;
}

/** Office location cards from the static contact copy. */
export default function ContactOffices({ staticData }: Props) {
  const { language } = useLanguage();
  const l = useTranslation();
  const t = staticData[language];

  const offices = t.offices.list;

  return (
    <section className="py-16 bg-surface-cream">
      <Container>

        {/* ── Section heading ────────────────────────────────────── */}
        <h2 className="text-xl font-bold text-ink-heading mb-8 text-center tracking-[-0.01em]">
          {l('Our Locations', 'مواقعنا')}
        </h2>

        {/* ── Office cards grid ───────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offices.map((office, idx) => (
            <div
              key={idx}
              className="bg-surface-white p-6 border border-border-light hover:border-silver-material transition-colors"
            >
              <h3 className="font-bold text-ink-heading mb-4 text-base">{office.name}</h3>
              <ul className="space-y-3 text-sm text-ink-body">

                <li className={`flex items-start gap-2`}>
                  <MapPin size={15} className="text-brand-silver shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{office.address}</span>
                </li>

                <li className={`flex items-start gap-2`}>
                  <Phone size={15} className="text-brand-silver shrink-0 mt-0.5" aria-hidden="true" />
                  {/* dir=ltr keeps digits LTR in Arabic mode */}
                  <a href={`tel:${office.phone}`} dir="ltr" className="tabular-nums hover:text-brand-red transition-colors">
                    {office.phone}
                  </a>
                </li>

                <li className={`flex items-start gap-2`}>
                  <Clock size={15} className="text-brand-silver shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{office.hours}</span>
                </li>

              </ul>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
