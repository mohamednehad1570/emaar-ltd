'use client';

/**
 * components/ui/LocaleLink.tsx
 *
 * The ONLY way to link to a site page. Wraps next/link and prefixes the href for the
 * current language: href="/upvc#glass" renders /upvc#glass on English pages and
 * /ar/upvc#glass on Arabic ones. Pass `locale` to target the other language (LangToggle).
 * External / mailto / tel / hash-only hrefs pass through localizePath untouched.
 */

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/lib/i18n/localizePath';
import type { Locale } from '@/lib/i18n/locales';

// href is a plain string (not a UrlObject) so it can be localized; next/link's own
// `locale` prop is Pages-Router only, so ours replaces it
type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'href' | 'locale'> & {
  href:    string;
  locale?: Locale;
};

export default function LocaleLink({ href, locale, ...rest }: LocaleLinkProps) {
  const { language } = useLanguage();
  return <Link href={localizePath(href, locale ?? language)} {...rest} />;
}
