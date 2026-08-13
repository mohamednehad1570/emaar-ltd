'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import type { ClientLogo } from '@/lib/sanity/types';

/* pr-16 on each strip adds trailing padding equal to gap-16,
   so the seam between strip 1 and strip 2 has the same spacing
   as gaps within each strip — the loop is visually seamless. */
const PLACEHOLDER_COMPANIES = [
  'Al Rashidi Contracting',
  'Mahmoud Design Studio',
  'Al Mansoori Real Estate',
  'Gulf Construction Co.',
  'Emirates Architecture',
  'Al Futtaim Properties',
  'Damac Contractors',
  'Arabtec Building',
];

interface LogoItemProps {
  name: string
  logoUrl?: string
}

function LogoItem({ name, logoUrl }: LogoItemProps) {
  const [imgError, setImgError] = useState(false);

  if (logoUrl && !imgError) {
    return (
      /* h-12 = 48px per spec; transparent bg to let logo breathe */
      <div className="shrink-0 h-12 px-4 flex items-center justify-center">
        <Image
          src={logoUrl}
          alt={name}
          width={140}
          height={48}
          style={{ width: 'auto', height: '48px', maxWidth: '140px', objectFit: 'contain' }}
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    /* h-12 = 48px per spec; cream placeholder box for text fallback */
    <div className="shrink-0 h-12 px-8 flex items-center justify-center bg-cream rounded-[4px]
      border border-transparent hover:border-silver-flat group transition-colors duration-150 cursor-default">
      <span className="text-sm font-medium text-text-muted group-hover:text-text-heading whitespace-nowrap transition-colors duration-150">
        {name}
      </span>
    </div>
  );
}

interface LogoTickerSectionProps {
  clientLogos: ClientLogo[]
}

export default function LogoTickerSection({ clientLogos }: LogoTickerSectionProps) {
  const { isRTL } = useLanguage();
  const t = useTranslation();

  // Build the items array from CMS data or fall back to placeholder company names
  const items: Array<{ key: string; name: string; logoUrl?: string }> =
    clientLogos.length > 0
      ? clientLogos.map((cl) => ({
          key: cl._id,
          name: isRTL ? cl.companyName.ar : cl.companyName.en,
          logoUrl: cl.logo ?? undefined,
        }))
      : PLACEHOLDER_COMPANIES.map((name) => ({ key: name, name }));

  return (
    /* overflow-hidden clips the strips as they translate off-screen */
    <section className="py-16 bg-off-white overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Centred label — obeys page language direction */}
      <p className="text-[11px] tracking-[0.22em] uppercase text-text-muted text-center pb-8 px-4">
        {t('TRUSTED BY LEADING COMPANIES', 'موثوق به من كبرى الشركات')}
      </p>

      {/* Ticker always scrolls LTR regardless of page language */}
      <div className="ticker-pause flex" dir="ltr">
        {/* Strip 1 — visible */}
        <div className="flex items-center gap-16 shrink-0 animate-marquee pr-16">
          {items.map((item) => (
            <LogoItem key={item.key} name={item.name} logoUrl={item.logoUrl} />
          ))}
        </div>
        {/* Strip 2 — aria-hidden duplicate that fills in when strip 1 exits */}
        <div className="flex items-center gap-16 shrink-0 animate-marquee pr-16" aria-hidden="true">
          {items.map((item) => (
            <LogoItem key={`d-${item.key}`} name={item.name} logoUrl={item.logoUrl} />
          ))}
        </div>
      </div>
    </section>
  );
}
