'use client';

/**
 * components/layout/NotFoundView.tsx
 *
 * Body of the localized 404 (app/not-found.tsx wraps it in SiteShell). Reads the language
 * from LanguageProvider, which the server already set from the request's locale, so the
 * 404 HTML is Arabic + RTL on /ar/… misses and English elsewhere — before any JS runs.
 *
 * Design rules (CLAUDE.md): bg-off-white page, brand-red 404 numeral, 0px buttons.
 */

import { House, ArrowRight } from '@phosphor-icons/react';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { PAGE_META } from '@/lib/data/pageMeta';
import LocaleLink from '@/components/ui/LocaleLink';

export default function NotFoundView() {
  const { language, isRTL } = useLanguage();
  const t = useTranslation();

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-off-white flex items-center justify-center px-6 py-24">
      <div className="max-w-lg w-full text-center">

        {/* 404 display number — brand-red, extrabold Cairo; digits stay LTR in Arabic */}
        <p dir="ltr" className="text-[9rem] md:text-[11rem] font-extrabold font-cairo leading-none text-brand-red select-none mb-2">
          404
        </p>

        {/* Red accent line — same pattern as section headings */}
        <div className="h-1 w-20 bg-brand-red rounded-full mx-auto mb-8" />

        <h1 className="text-2xl md:text-3xl font-bold font-cairo text-brand-dark mb-4">
          {PAGE_META.notFound.title[language]}
        </h1>

        <p className="text-text-body text-lg leading-relaxed max-w-sm mx-auto mb-10">
          {t(
            'This page doesn’t exist or has been moved. Let us help you find what you’re looking for.',
            'هذه الصفحة غير موجودة أو تم نقلها. دعنا نساعدك في العثور على ما تبحث عنه.',
          )}
        </p>

        {/* ── Navigation links ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Primary — solid red, same as site CTA buttons */}
          <LocaleLink
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-none bg-brand-red hover:bg-brand-red-dark text-white font-bold transition-colors duration-200 shadow-warm-red min-h-[52px]"
          >
            <House size={20} weight="fill" />
            {t('Back to Home', 'العودة إلى الرئيسية')}
          </LocaleLink>

          {/* Secondary — white, warm border */}
          <LocaleLink
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-none bg-white text-brand-dark font-semibold border border-border-medium hover:border-brand-silver transition-colors duration-200 shadow-warm-md min-h-[52px]"
          >
            {t('Contact Us', 'تواصل معنا')}
            {/* Arrow points along the reading direction (← in Arabic) */}
            <ArrowRight size={18} weight="bold" className={isRTL ? 'rotate-180' : ''} />
          </LocaleLink>

        </div>
      </div>
    </div>
  );
}
