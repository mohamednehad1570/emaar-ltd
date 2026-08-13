'use client';

import { useLanguage, useTranslation } from '@/contexts/LanguageContext';

/* pr-16 on each strip adds trailing padding equal to gap-16,
   so the seam between strip 1 and strip 2 has the same spacing
   as gaps within each strip — the loop is visually seamless. */
const companies = [
  'Al Rashidi Contracting',
  'Mahmoud Design Studio',
  'Al Mansoori Real Estate',
  'Gulf Construction Co.',
  'Emirates Architecture',
  'Al Futtaim Properties',
  'Damac Contractors',
  'Arabtec Building',
];

function LogoItem({ name }: { name: string }) {
  return (
    /* h-12 = 48px per spec; bg-cream placeholder box; CSS transitions safe — not Framer-animated */
    <div className="shrink-0 h-12 px-8 flex items-center justify-center bg-cream rounded-[4px]
      border border-transparent hover:border-silver-flat group transition-colors duration-150 cursor-default">
      <span className="text-sm font-medium text-text-muted group-hover:text-text-heading whitespace-nowrap transition-colors duration-150">
        {name}
      </span>
    </div>
  );
}

export default function LogoTickerSection() {
  const { isRTL } = useLanguage();
  const t = useTranslation();

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
          {companies.map((name, i) => <LogoItem key={i} name={name} />)}
        </div>
        {/* Strip 2 — aria-hidden duplicate that fills in when strip 1 exits */}
        <div className="flex items-center gap-16 shrink-0 animate-marquee pr-16" aria-hidden="true">
          {companies.map((name, i) => <LogoItem key={`d${i}`} name={name} />)}
        </div>
      </div>
    </section>
  );
}
