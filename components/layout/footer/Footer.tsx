'use client';

/**
 * components/layout/footer/Footer.tsx
 *
 * Thin compositor — assembles the footer from focused sub-components.
 * Desktop: white bg, silver gradient top line, 4-column grid (Brand | Products | Company | Contact).
 * Mobile: Brand always visible; Products / Company / Contact collapse to animated accordions.
 * The StickyQuoteBar spacer at the end keeps the last row visible above the bar (<1024 only).
 */

import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import Container from '@/components/layout/Container';
import FooterBrand from './FooterBrand';
import FooterLinkColumn from './FooterLinkColumn';
import FooterContact from './FooterContact';
import FooterAccordion from './FooterAccordion';
import FooterBottomBar from './FooterBottomBar';
import { COLUMNS } from './footerLinks';

interface FooterProps {
  phone?:          string;
  email?:          string;
  whatsappNumber?: string;
}

export default function Footer({ phone, email, whatsappNumber }: FooterProps) {
  const { language, isRTL } = useLanguage();
  const l = useTranslation();

  const contactProps = { language, isRTL, phone, email, whatsappNumber };

  return (
    <footer className="bg-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Top accent line ──────────────────────────────────────────────────
          Fades in from both sides to avoid a harsh cut on wide viewports. */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-silver to-transparent" />

      <Container className="pt-14 pb-8">

        {/* ════════════════════════════════════════════════════════════════
            DESKTOP LAYOUT  — 4-column grid, hidden on < lg
        ════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-12 mb-12">

          {/* Column 1: Brand — logo, tagline, social */}
          <FooterBrand />

          {/* Column 2: Products */}
          <FooterLinkColumn
            header={l('Products', 'المنتجات')}
            links={COLUMNS[0].links}
            language={language}
            isRTL={isRTL}
          />

          {/* Column 3: Company */}
          <FooterLinkColumn
            header={l('Company', 'الشركة')}
            links={COLUMNS[1].links}
            language={language}
            isRTL={isRTL}
          />

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-silver-dark mb-5 select-none">
              {l('Contact', 'التواصل')}
            </h3>
            <FooterContact {...contactProps} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            MOBILE LAYOUT  — stacked brand + accordions, visible on < lg
        ════════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden mb-8">

          {/* Brand always visible at the top on mobile */}
          <div className="flex flex-col gap-5 pb-8 mb-2 border-b border-border-light">
            <FooterBrand mobile />
          </div>

          {/* Collapsible sections */}
          <FooterAccordion title={l('Products', 'المنتجات')}>
            <FooterLinkColumn header="" links={COLUMNS[0].links} language={language} isRTL={isRTL} />
          </FooterAccordion>

          <FooterAccordion title={l('Company', 'الشركة')}>
            <FooterLinkColumn header="" links={COLUMNS[1].links} language={language} isRTL={isRTL} />
          </FooterAccordion>

          <FooterAccordion title={l('Contact', 'التواصل')}>
            <FooterContact {...contactProps} />
          </FooterAccordion>
        </div>

        {/* ── Copyright bar — shared by both breakpoints ───────────────── */}
        <FooterBottomBar language={language} />

      </Container>

      {/* Reserves StickyQuoteBar's height (<1024 only) so the last footer row is never hidden */}
      <div aria-hidden="true" className="lg:hidden h-[calc(var(--quote-bar-h)+env(safe-area-inset-bottom))]" />
    </footer>
  );
}
