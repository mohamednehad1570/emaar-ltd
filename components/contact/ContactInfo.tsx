'use client';

import { Phone, Envelope, MapPin, Clock } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
}

/** Contact detail strip rendered below the form — address, email, phone, hours. */
export default function ContactInfo({ phone, email, address, workingHours }: Props) {
  const { isRTL } = useLanguage();

  const row = `flex items-center gap-2 text-sm text-ink-muted ${isRTL ? 'flex-row-reverse' : ''}`;
  const iconClass = 'text-brand-silver shrink-0';

  return (
    <div className="mt-14 pt-8 border-t border-border-light space-y-3.5">

      {/* ── Phone ─────────────────────────────────────────────── */}
      <div className={row}>
        <Phone size={15} className={iconClass} aria-hidden="true" />
        {/* dir=ltr preserves digit order in RTL context */}
        <a href={`tel:${phone}`} dir="ltr" className="tabular-nums hover:text-brand-red transition-colors">
          {phone}
        </a>
      </div>

      {/* ── Email ─────────────────────────────────────────────── */}
      <div className={row}>
        <Envelope size={15} className={iconClass} aria-hidden="true" />
        <a href={`mailto:${email}`} className="hover:text-brand-red transition-colors">
          {email}
        </a>
      </div>

      {/* ── Address ───────────────────────────────────────────── */}
      <div className={row}>
        <MapPin size={15} className={iconClass} aria-hidden="true" />
        <span>{address}</span>
      </div>

      {/* ── Working hours ──────────────────────────────────────── */}
      <div className={row}>
        <Clock size={15} className={iconClass} aria-hidden="true" />
        <span>{workingHours}</span>
      </div>

    </div>
  );
}
