/**
 * scripts/verify-ui/checks-hydration.ts
 *
 *   a) Hydration — /ar pages loaded DIRECTLY (no stored preference, no toggle click) plus
 *      their EN twins: zero React hydration errors, and <html lang dir> right after load.
 *      (The D-R2 "language flash" check is gone: the server now renders lang/dir, which
 *      checks-locale.ts asserts on the raw no-JS HTML.)
 *   c) Hash filter — /projects#residential and /ar/projects#residential show Residential
 *      active and a non-empty grid.
 * Footer (d) → checks-footer.ts · top-hung pictogram (e) → checks-pictogram.ts.
 */

import type { Browser } from 'playwright';
import type { Page } from 'playwright';
import type { CheckResult } from './runner';

// ── (a) Hydration ──────────────────────────────────────────────────────────────

/** Collects console errors / page errors per page and fails on React's hydration markers. */
export async function checkHydration(browser: Browser, base: string): Promise<CheckResult[]> {
  const pages = ['/ar', '/ar/upvc', '/ar/projects', '/ar/products/hinged-doors', '/', '/upvc', '/projects', '/products/hinged-doors'];
  const results: CheckResult[] = [];

  for (const path of pages) {
    // Fresh context per page — nothing carried over from earlier navigations
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pg = await ctx.newPage();
    const errors: string[] = [];
    pg.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    pg.on('pageerror', (err) => errors.push(String(err)));

    await pg.goto(`${base}${path}`, { waitUntil: 'load' });
    await pg.waitForTimeout(600); // let hydration finish after the load event
    const { dir, lang } = await pg.evaluate(() => ({ dir: document.documentElement.dir, lang: document.documentElement.lang }));
    await ctx.close();

    const ar = path === '/ar' || path.startsWith('/ar/');
    const mismatch = errors.find((e) => /hydrat|did not match|minified react error/i.test(e));
    results.push({
      name:   `hydration ${path}: no hydration errors`,
      passed: mismatch === undefined,
      detail: mismatch,
    });
    results.push({
      name:   `hydration ${path}: html dir=${ar ? 'rtl' : 'ltr'} lang=${ar ? 'ar' : 'en'}`,
      passed: dir === (ar ? 'rtl' : 'ltr') && lang === (ar ? 'ar' : 'en'),
      detail: `dir="${dir}" lang="${lang}"`,
    });
  }
  return results;
}

// ── (c) Hash filter ────────────────────────────────────────────────────────────

/**
 * /projects#residential (and its /ar twin): the "Residential" / "سكني" filter button is
 * aria-pressed and at least one project card renders.
 */
export async function checkHashFilter(page: Page, base: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const path of ['/projects', '/ar/projects']) {
    // Navigate with the hash so the hook sees it from the start
    await page.goto(`${base}${path}#residential`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600); // hash-driven state settles

    // [role="group"] scopes to the filter bar (the header toggle is a link, not a button)
    const pressed = await page.$eval(
      '[role="group"] button[aria-pressed="true"]',
      (el) => el.textContent?.trim() ?? '',
    ).catch(() => '');
    const cardCount = await page.$$eval('article', (els) => els.length).catch(() => 0);
    const want = path.startsWith('/ar') ? 'سكني' : 'residential';

    results.push(
      {
        name:   `hash-filter ${path}#residential: Residential button active`,
        passed: pressed.toLowerCase().includes(want),
        detail: pressed ? `active filter: "${pressed}"` : 'no [role=group] aria-pressed=true button found',
      },
      {
        name:   `hash-filter ${path}#residential: grid not empty`,
        passed: cardCount > 0,
        detail: cardCount === 0 ? 'no article cards rendered after filter' : `${cardCount} card(s) visible`,
      },
    );
  }
  return results;
}
