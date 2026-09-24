'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';
import type { ClientLogo } from '@/lib/sanity/types';

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
  name:     string
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
    <div className="shrink-0 h-12 px-8 flex items-center justify-center bg-surface-cream
      border border-transparent hover:border-border-medium group transition-colors duration-150 cursor-default">
      <span className="text-sm font-medium text-ink-muted group-hover:text-ink-heading whitespace-nowrap transition-colors duration-150">
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
  const [paused, setPaused] = useState(false);

  // Build items from CMS data or fall back to placeholder company names
  const items: Array<{ key: string; name: string; logoUrl?: string }> =
    clientLogos.length > 0
      ? clientLogos.map((cl) => ({
          key:    cl._id,
          name:   isRTL ? cl.companyName.ar : cl.companyName.en,
          logoUrl: cl.logo ?? undefined,
        }))
      : PLACEHOLDER_COMPANIES.map((name) => ({ key: name, name }));

  // Cards rendered once — InfiniteMarquee duplicates them internally
  const cards = items.map((item) => (
    <div
      key={item.key}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <LogoItem name={item.name} logoUrl={item.logoUrl} />
    </div>
  ));

  // RTL pages scroll right (same visual left-to-right reading feel)
  const direction = isRTL ? 'right' : 'left';

  return (
    <section className="py-16 bg-off-white overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Centred label — obeys page language direction */}
      <p className="text-[11px] tracking-[0.22em] uppercase text-ink-muted text-center pb-8 px-4">
        {t('TRUSTED BY LEADING COMPANIES', 'موثوق به من كبرى الشركات')}
      </p>

      {/* gap-16 between items — matches the previous CSS version */}
      <div className="[&_>div>div]:gap-16">
        <InfiniteMarquee
          duration={30}
          direction={direction}
          paused={paused}
          childrenCopy={cards}
        >
          {cards}
        </InfiniteMarquee>
      </div>
    </section>
  );
}
