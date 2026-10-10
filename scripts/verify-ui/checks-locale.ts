/**
 * scripts/verify-ui/checks-locale.ts
 *
 * Batch L — locale URLs (/ = English, /ar = Arabic):
 *   a) NO-JS: raw server HTML (plain HTTP fetch, no browser JS) of 4 AR + 4 EN pages →
 *      <html lang dir>, H1 in the page's script, hreflang en/ar/x-default, canonical = self
 *   b) /en/upvc → 308 → /upvc; legacy /ar/products/glass → 308 → /ar/upvc#glass
 *   c) Language toggle on /upvc#glass points to /ar/upvc#glass (and back on /ar/upvc#glass)
 *   d) sitemap.xml lists both locales with xhtml:link alternates
 *   e) unknown paths answer 404 in the URL's language (lang/dir + localized H1)
 */

import type { APIRequestContext, Page } from 'playwright';
import type { CheckResult } from './runner';
import { goto } from './runner';

const ARABIC = /[؀-ۿ]/;

/** First match of a tag's attribute in raw HTML ('' when absent). */
const attr = (html: string, tag: RegExp, name: string) =>
  html.match(tag)?.[0].match(new RegExp(`${name}="([^"]*)"`, 'i'))?.[1] ?? '';

// ── (a) NO-JS server HTML ──────────────────────────────────────────────────────
export async function checkNoJsHtml(request: APIRequestContext, base: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  const pages = ['/', '/upvc', '/products/hinged-doors', '/projects'];
  for (const lang of ['ar', 'en'] as const) {
    for (const p of pages) {
      const url = lang === 'ar' ? `/ar${p === '/' ? '' : p}` : p;
      const html = await (await request.get(`${base}${url}`)).text();
      const htmlLang = attr(html, /<html[^>]*>/i, 'lang');
      const htmlDir = attr(html, /<html[^>]*>/i, 'dir');
      // H1 text with inner tags stripped
      const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? '').replace(/<[^>]+>/g, '').trim();
      const alternates = ['en', 'ar', 'x-default'].filter((hl) =>
        new RegExp(`<link rel="alternate" hreflang="${hl}" href="[^"]+"`, 'i').test(html));
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] ?? '';
      // Production origin in the HTML, local server here — compare pathnames
      const canonicalPath = canonical ? new URL(canonical).pathname : '';
      const wantDir = lang === 'ar' ? 'rtl' : 'ltr';
      const h1Ok = lang === 'ar' ? ARABIC.test(h1) : h1.length > 0 && !ARABIC.test(h1);
      const ok = htmlLang === lang && htmlDir === wantDir && h1Ok && alternates.length === 3 && canonicalPath === url;
      results.push({
        name: `no-JS ${url}: lang=${lang} dir=${wantDir}, ${lang.toUpperCase()} H1, hreflang×3, canonical=self`,
        passed: ok,
        detail: `lang="${htmlLang}" dir="${htmlDir}" h1="${h1.slice(0, 40)}" hreflang=[${alternates.join(',')}] canonical=${canonicalPath || '(none)'}`,
      });
    }
  }
  return results;
}

// ── (b) Redirects ─────────────────────────────────────────────────────────────
export async function checkLocaleRedirects(request: APIRequestContext, base: string): Promise<CheckResult[]> {
  const cases = [
    { from: '/en/upvc', to: '/upvc' },
    { from: '/en', to: '/' },
    { from: '/products/glass', to: '/upvc#glass' },
    { from: '/ar/products/glass', to: '/ar/upvc#glass' },
    { from: '/ar/products', to: '/ar' },
  ];
  const results: CheckResult[] = [];
  for (const { from, to } of cases) {
    const res = await request.get(`${base}${from}`, { maxRedirects: 0 });
    const location = res.headers()['location'] ?? '';
    const target = location ? new URL(location, base) : null;
    const got = target ? `${target.pathname}${target.hash}` : '(none)';
    results.push({
      name: `redirect ${from} → 308 ${to}`,
      passed: res.status() === 308 && got === to,
      detail: `HTTP ${res.status()} → ${got}`,
    });
  }
  return results;
}

// ── (c) Language toggle keeps the page + hash ─────────────────────────────────
export async function checkToggleHref(page: Page, base: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const [from, want] of [['/upvc#glass', '/ar/upvc#glass'], ['/ar/upvc#glass', '/upvc#glass']] as const) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await goto(page, `${base}${from}`);
    const other = from.startsWith('/ar') ? 'en' : 'ar';
    // The header bar's toggle link (the overlay copy is not mounted at 1440)
    const href = await page.getAttribute(`header a[hreflang="${other}"]`, 'href').catch(() => null);
    results.push({
      name: `toggle on ${from} → href ${want} (hreflang=${other})`,
      passed: href === want,
      detail: `href="${href}"`,
    });
  }
  // Following it lands on the Arabic page with the Glass tab selected
  await goto(page, `${base}/upvc#glass`);
  await page.click('header a[hreflang="ar"]');
  await page.waitForURL(/\/ar\/upvc#glass$/);
  await page.waitForTimeout(500);
  const state = await page.evaluate(() => ({
    dir: document.documentElement.dir,
    tab: document.querySelector('[role="tab"][aria-selected="true"]')?.getAttribute('data-tab') ?? '',
  }));
  results.push({
    name: 'toggle click /upvc#glass → /ar/upvc#glass, dir=rtl, Glass tab',
    passed: state.dir === 'rtl' && state.tab === 'glass',
    detail: `url=${new URL(page.url()).pathname}${new URL(page.url()).hash} dir=${state.dir} tab=${state.tab}`,
  });
  return results;
}

// ── (d) Sitemap ───────────────────────────────────────────────────────────────
export async function checkSitemap(request: APIRequestContext, base: string): Promise<CheckResult[]> {
  const xml = await (await request.get(`${base}/sitemap.xml`)).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  const ar = locs.filter((p) => p === '/ar' || p.startsWith('/ar/'));
  const en = locs.filter((p) => !(p === '/ar' || p.startsWith('/ar/')));
  const hasAlt = /<xhtml:link rel="alternate" hreflang="ar"/.test(xml) && /hreflang="x-default"/.test(xml);
  return [{
    name: 'sitemap.xml: both locales (1:1) + hreflang alternates',
    passed: ar.length > 0 && ar.length === en.length && ['/upvc', '/ar/upvc', '/', '/ar'].every((p) => locs.includes(p)) && hasAlt,
    detail: `${en.length} EN + ${ar.length} AR <loc>; alternates=${hasAlt}`,
  }];
}

// ── (e) Localized 404 ─────────────────────────────────────────────────────────
export async function checkNotFound(request: APIRequestContext, base: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const [url, lang] of [['/no-such-page', 'en'], ['/ar/no-such-page', 'ar'], ['/ar/products/no-such-type', 'ar']] as const) {
    const res = await request.get(`${base}${url}`);
    const html = await res.text();
    const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? '').replace(/<[^>]+>/g, '').trim();
    const htmlLang = attr(html, /<html[^>]*>/i, 'lang');
    const ok = res.status() === 404 && htmlLang === lang && (lang === 'ar' ? ARABIC.test(h1) : h1 === 'Page Not Found');
    results.push({ name: `404 ${url}: status 404, lang=${lang}, localized H1 (no JS)`, passed: ok, detail: `HTTP ${res.status()} lang="${htmlLang}" h1="${h1}"` });
  }
  return results;
}
