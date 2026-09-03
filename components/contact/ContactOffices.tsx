'use client';

import { MapPin, Phone, Clock } from '@phosphor-icons/react';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import Container from '@/components/layout/Container';
import type { SiteSettings } from '@/lib/sanity/types';
import { contactData } from '@/lib/data/uiStrings';

interface NormalizedOffice {
  name: string;
  address: string;
  phone: string;
  hours: string;
}

interface Props {
  cmsOffices?: SiteSettings['officeLocations'];
  staticData: typeof contactData;
}

/** Office location cards — CMS-powered with static fallback. */
export default function ContactOffices({ cmsOffices, staticData }: Props) {
  const { language, isRTL } = useLanguage();
  const l = useTranslation();
  const t = staticData[language];

  // Normalize CMS offices to the same flat shape as static data.
  // Spread required because as-const static data is readonly.
  const offices: NormalizedOffice[] = (cmsOffices?.length ?? 0) > 0
    ? cmsOffices!.map(o => ({
        name:    o.name?.[language]         ?? o.name?.en    ?? '', // guard null LocalizedString
        address: o.address?.[language]      ?? o.address?.en ?? '', // guard null LocalizedString
        phone:   o.phone,
        hours:   o.workingHours?.[language] ?? o.workingHours?.en ?? '', // guard null LocalizedString
      }))
    : [...t.offices.list];

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

                <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin size={15} className="text-brand-silver shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{office.address}</span>
                </li>

                <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone size={15} className="text-brand-silver shrink-0 mt-0.5" aria-hidden="true" />
                  {/* dir=ltr keeps digits LTR in Arabic mode */}
                  <a href={`tel:${office.phone}`} dir="ltr" className="tabular-nums hover:text-brand-red transition-colors">
                    {office.phone}
                  </a>
                </li>

                <li className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
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
