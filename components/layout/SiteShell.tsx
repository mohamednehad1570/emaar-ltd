/**
 * components/layout/SiteShell.tsx
 *
 * The whole document for one language: <html lang dir> + providers + header, <main>,
 * footer and the sticky quote bar. Server component, shared by app/[locale]/layout.tsx
 * (every page) and app/not-found.tsx (404s), so a missing page keeps the site chrome
 * and its language. lang/dir come from the caller's locale — never from the browser.
 */

import '@/app/globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import MotionProvider from '@/components/MotionProvider';
import Header from '@/components/Header';
import Footer from '@/components/layout/footer/Footer';
import StickyQuoteBar from '@/components/layout/StickyQuoteBar';
import { SITE_SETTINGS } from '@/lib/data/siteSettings';
import { buildHeaderNav } from '@/lib/data/headerNav';
import { dirFor, type Locale } from '@/lib/i18n/locales';
import { cairo } from '@/lib/fonts';

// Built once at module load on the server — the header receives plain data, not the catalog
const HEADER_NAV = buildHeaderNav();

interface SiteShellProps {
  locale:   Locale;
  children: React.ReactNode;
}

export default function SiteShell({ locale, children }: SiteShellProps) {
  return (
    // suppressHydrationWarning stays for extensions that stamp attributes on <html>
    <html lang={locale} dir={dirFor(locale)} suppressHydrationWarning>
      <body className={`${cairo.variable} antialiased`}>
        <MotionProvider>
          <LanguageProvider locale={locale}>
            {/* Header/Footer keep their contact props so the custom CMS can feed them later */}
            <Header nav={HEADER_NAV} whatsappNumber={SITE_SETTINGS.whatsappNumber} />
            <main className="min-h-screen">{children}</main>
            <Footer
              phone={SITE_SETTINGS.phone}
              email={SITE_SETTINGS.emails.info}
              whatsappNumber={SITE_SETTINGS.whatsappNumber}
            />
            {/* <1024 only; mounted once here so it survives client navigation */}
            <StickyQuoteBar whatsappNumber={SITE_SETTINGS.whatsappNumber} nav={HEADER_NAV} />
          </LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
