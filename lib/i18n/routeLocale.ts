/**
 * lib/i18n/routeLocale.ts
 * Server-side: turns the [locale] route param into a typed Locale. The layout's
 * dynamicParams = false already limits it to en/ar; the guard keeps TypeScript honest.
 */

import { notFound } from 'next/navigation';
import { LOCALES, isLocale, type Locale } from './locales';

export type LocaleParams = Promise<{ locale: string }>;

export async function routeLocale(params: LocaleParams): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

/** generateStaticParams for app/[locale] — both languages are prerendered. */
export const localeStaticParams = () => LOCALES.map((locale) => ({ locale }));
