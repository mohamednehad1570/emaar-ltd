/**
 * proxy.ts — locale routing (Next 16's replacement for middleware.ts).
 *
 *   /ar, /ar/…   → pass through (Arabic tree, app/[locale] with locale=ar)
 *   /en, /en/…   → 308 to the unprefixed path — English has exactly one URL
 *   anything else→ internal REWRITE to /en/… (the address bar stays unprefixed)
 *
 * No Accept-Language sniffing and no cookie: the URL alone decides the language, so
 * every page is the same static HTML for every visitor (○ / ● in the build).
 * The locale also travels as the x-site-locale request header — read ONLY by the root
 * 404 (app/not-found.tsx), which has no [locale] param but must answer in the URL's language.
 * The legacy 308s in next.config.ts run BEFORE this file, so old URLs never reach it.
 */

import { NextResponse, type NextRequest } from 'next/server';
import { LOCALE_HEADER, type Locale } from '@/lib/i18n/locales';

// Forwards the incoming request headers plus the locale stamp
function withLocale(request: NextRequest, locale: Locale) {
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale);
  return { request: { headers } };
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/ar' || pathname.startsWith('/ar/')) return NextResponse.next(withLocale(request, 'ar'));

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice('/en'.length) || '/';
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url, withLocale(request, 'en'));
}

export const config = {
  // Skip API routes, Next internals, and any path with a file extension (images, fonts,
  // favicon.ico, robots.txt, sitemap.xml, emaar-logo.png …) — those are not localized
  matcher: ['/((?!api/|_next/|_vercel/|images/|.*\\..*).*)'],
};
