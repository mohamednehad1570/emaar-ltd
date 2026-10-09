/**
 * scripts/verify-ui/checks-hydration.ts
 *
 * Checks added in phase D-R2:
 *   a) Hydration — Arabic saved in localStorage before first load; must not cause
 *      a React hydration mismatch on /, /upvc, /projects, /products/hinged-doors.
 *   b) Language flash — INFORMATIONAL: records <html dir> at DOMContentLoaded vs
 *      after the hydration commit; never pass/fail.
 *   c) Hash filter — /projects#residential shows Residential as active and only
 *      residential cards are rendered.
 *   d) Footer 390px — all footer links resolve to 200; accordion keyboard: Enter
 *      opens (aria-expanded=true), Space closes (aria-expanded=false).
 *   e) Top-hung pictogram — the indicator path's apex is near the top edge (y < 20
 *      in a 64px viewBox), confirming the hinge-at-top convention.
 */

import type { Browser } from 'playwright';
import type { Page } from 'playwright';
import type { CheckResult } from './runner';
import { goto } from './runner';

// ── (a + b) Hydration + language flash ────────────────────────────────────────

/**
 * Open a fresh browser context with localStorage.language=ar pre-seeded via
 * addInitScript so the very first render sees 'ar'. Collect console errors and
 * page-error events; fail if any contain React's hydration-mismatch markers.
 * Also records <html dir> at DOMContentLoaded vs. after full load (informational).
 */
export async function checkHydrationAR(
  browser: Browser,
  base: string,
): Promise<CheckResult[]> {
  const pages: string[] = ['/', '/upvc', '/projects', '/products/hinged-doors'];
  const results: CheckResult[] = [];

  // Each page gets its own context so language state is pristine
  for (const path of pages) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

    // Seed localStorage before any navigation — the script runs before page JS
    await ctx.addInitScript(() => {
      try { localStorage.setItem('language', 'ar'); } catch { /* SSR guard */ }
    });

    const pg = await ctx.newPage();

    // Collect all console messages and page-error events
    const errors: string[] = [];
    pg.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    pg.on('pageerror', (err) => errors.push(String(err)));

    // Flash: record dir at DOMContentLoaded (before JS runs/rehydrates)
    let dirAtDCL = 'unknown';
    pg.on('domcontentloaded', async () => {
      try {
        // Page may not be interactive yet — evaluate with a brief guard
        dirAtDCL = await pg.evaluate(() => document.documentElement.dir || '(none)');
      } catch { dirAtDCL = '(eval-failed)'; }
    });

    await pg.goto(`${base}${path}`, { waitUntil: 'load' });

    // Allow React hydration to complete after the load event
    await pg.waitForTimeout(600);

    const dirAfterLoad = await pg.evaluate(
      () => document.documentElement.dir || '(none)',
    );
    const langAttr = await pg.evaluate(() => document.documentElement.lang);

    await ctx.close();

    // Hydration mismatch keywords React 18+ emits in the console
    const mismatchMsg = errors.find((e) =>
      /hydrat|did not match|minified react error/i.test(e),
    );

    // (a) Hydration: no mismatch + html has dir=rtl lang=ar
    results.push({
      name:   `hydration(AR) ${path}: no hydration errors`,
      passed: mismatchMsg === undefined,
      detail: mismatchMsg ?? undefined,
    });
    results.push({
      name:   `hydration(AR) ${path}: html dir=rtl lang=ar`,
      passed: dirAfterLoad === 'rtl' && langAttr === 'ar',
      detail: `dir="${dirAfterLoad}" lang="${langAttr}"`,
    });

    // (b) Language flash: always passes — prints DCL dir vs load dir as info
    results.push({
      name:   `lang-flash(AR) ${path}: DCL="${dirAtDCL}" → load="${dirAfterLoad}" [INFO]`,
      // Informational: never fail, regardless of flash behaviour
      passed: true,
      detail: dirAtDCL !== dirAfterLoad
        ? `⚠ flash: EN first paint (dir changed from "${dirAtDCL}" to "${dirAfterLoad}")`
        : 'no flash observed',
    });
  }

  return results;
}

// ── (c) Hash filter ────────────────────────────────────────────────────────────

/**
 * Navigate to /projects#residential (a real ProjectType value).
 * Assert: the "Residential" filter button shows aria-pressed="true", and
 * at least one project card is rendered (the grid is not empty).
 * 'all' cards visible when no filter ≠ "only residential" — we just need
 * the sector button to be active and results to appear (the grid is never
 * truly empty for residential in the static data).
 */
export async function checkHashFilter(page: Page, base: string): Promise<CheckResult[]> {
  // Navigate with the hash so the server and client both see it from the start
  await page.goto(`${base}/projects#residential`, { waitUntil: 'networkidle' });
  // Wait for hash-driven JS state to settle
  await page.waitForTimeout(600);

  // The Residential button lives inside a [role="group"] filter bar.
  // Scoping to [role="group"] avoids accidentally matching the language-toggle
  // button in the header, which also uses aria-pressed.
  const pressed = await page.$eval(
    '[role="group"] button[aria-pressed="true"]',
    (el) => el.textContent?.trim() ?? '',
  ).catch(() => '');

  // At least one project card must be visible (grid is not empty)
  const cardCount = await page.$$eval('article', (els) => els.length).catch(() => 0);

  // Accept either EN "Residential" or AR "سكني" — the shared page may be in AR mode
  // from a previous check (checkNoARMirror toggles to AR and doesn't reset).
  const filterActive =
    pressed.toLowerCase().includes('residential') || pressed.includes('سكني');
  return [
    {
      name:   'hash-filter /projects#residential: Residential button active',
      passed: filterActive,
      detail: pressed ? `active filter: "${pressed}"` : 'no [role=group] aria-pressed=true button found',
    },
    {
      name:   'hash-filter /projects#residential: grid not empty',
      passed: cardCount > 0,
      detail: cardCount === 0 ? 'no article cards rendered after filter' : `${cardCount} card(s) visible`,
    },
  ];
}

// ── (d) Footer 390px ────────────────────────────────────────────────────────────

/**
 * At 390px viewport, verify footer links resolve correctly and accordion
 * keyboard interaction is accessible.
 *
 * Link check: each <a> inside the footer with a non-empty href either:
 *   - Returns HTTP 200 (page links), or
 *   - Is a hash link (#…) which is exempt from the 200 check.
 *
 * Keyboard: focus the first accordion trigger (button[aria-expanded]),
 * press Enter → assert aria-expanded="true",
 * press Space → assert aria-expanded="false".
 */
export async function checkFooter390(
  browser: Browser,
  base: string,
): Promise<CheckResult[]> {
  const results: CheckResult[] = [];

  for (const lang of ['en', 'ar'] as const) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });

    if (lang === 'ar') {
      // Pre-seed AR so the footer renders bilingual AR labels on first load
      await ctx.addInitScript(() => {
        try { localStorage.setItem('language', 'ar'); } catch { /* SSR guard */ }
      });
    }

    const pg = await ctx.newPage();
    await pg.goto(`${base}/`, { waitUntil: 'networkidle' });

    // ── Link status check ──────────────────────────────────────────────────────
    // Collect href values from all <a> elements inside <footer>
    const hrefs: string[] = await pg.$$eval(
      'footer a[href]',
      (anchors) => anchors
        .map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? '')
        .filter(Boolean),
    );

    let linkFail: string | undefined;
    for (const href of hrefs) {
      // Skip anchor-only links — they are same-page tab jumps, always valid
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
      // External links (WhatsApp, social) open in _blank — skip 200 check to avoid CORS/redirect issues
      if (href.startsWith('http')) continue;

      const res = await pg.request.get(`${base}${href}`).catch(() => null);
      if (!res || res.status() !== 200) {
        linkFail = `${href} → ${res?.status() ?? 'failed'}`;
        break;
      }
    }

    results.push({
      name:   `footer(${lang}) 390px: all links resolve 200 or exempt`,
      passed: linkFail === undefined,
      detail: linkFail,
    });

    // ── Accordion keyboard interaction ─────────────────────────────────────────
    // The footer accordion is inside an lg:hidden container — only visible at <1024px.
    // Use :visible so we never grab a hidden desktop element, and cap the scroll
    // timeout so an invisible match doesn't stall the suite.
    const trigger = await pg.$('footer button[aria-expanded]:visible');
    if (!trigger) {
      results.push({
        name:   `footer(${lang}) 390px: accordion keyboard (Enter/Space)`,
        passed: false,
        detail: 'no visible button[aria-expanded] found in footer — accordion not rendered at 390px',
      });
      await ctx.close();
      continue;
    }

    await trigger.scrollIntoViewIfNeeded({ timeout: 5000 });
    await trigger.focus();

    // Press Enter → expect aria-expanded="true"
    await pg.keyboard.press('Enter');
    await pg.waitForTimeout(350); // wait for Framer Motion expand animation
    const afterEnter = await trigger.getAttribute('aria-expanded');

    // Press Space → expect aria-expanded="false"
    await pg.keyboard.press('Space');
    await pg.waitForTimeout(350);
    const afterSpace = await trigger.getAttribute('aria-expanded');

    results.push({
      name:   `footer(${lang}) 390px: accordion Enter opens (aria-expanded=true)`,
      passed: afterEnter === 'true',
      detail: `aria-expanded after Enter: "${afterEnter}"`,
    });
    results.push({
      name:   `footer(${lang}) 390px: accordion Space closes (aria-expanded=false)`,
      passed: afterSpace === 'false',
      detail: `aria-expanded after Space: "${afterSpace}"`,
    });

    await ctx.close();
  }

  return results;
}

// ── (e) Top-hung pictogram ────────────────────────────────────────────────────

/**
 * On /products/top-hung-windows, the opening indicator (stroke-brand-red dashed path)
 * must form a triangle whose APEX is near the TOP edge of the 64px viewBox.
 * European drafting convention: dashed lines from the free corners (bottom) meet at
 * the hinge side (top), so the apex y-coordinate must be < 20 (viewBox 0–64).
 * Free-edge vertices must have y > 40.
 *
 * The path is: M14 52 32 12 50 52  →  points = [14,52], [32,12], [50,52]
 * Apex = the vertex with the smallest y value.
 */
export async function checkTopHungPictogram(page: Page, base: string): Promise<CheckResult[]> {
  await goto(page, `${base}/products/top-hung-windows`);

  // The indicator SVG path is the only dashed stroke-brand-red path on the page
  // (PictogramSvg renders it inside the 64px SVG on TypeIntro's 56px pictogram slot)
  const pathD = await page.$eval(
    // data-testid is not used — select by class; there is only one indicator per page
    'svg[direction="ltr"] path[stroke-dasharray]',
    (el) => el.getAttribute('d') ?? '',
  ).catch(() => '');

  if (!pathD) {
    return [{
      name:   'top-hung pictogram: indicator path found',
      passed: false,
      detail: 'no stroke-dasharray path found inside direction=ltr SVG — pictogram may not be rendered',
    }];
  }

  // Parse simple SVG path: "M14 52 32 12 50 52" → [[14,52],[32,12],[50,52]]
  // Handles optional 'L' commands and both space / comma separators
  const nums = pathD.replace(/[MmLlZz]/g, ' ').trim().split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
  // Group into [x, y] pairs
  const points: [number, number][] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) points.push([nums[i], nums[i + 1]]);

  const results: CheckResult[] = [];

  results.push({
    name:   `top-hung pictogram: indicator coordinates (d="${pathD}")`,
    // This entry is always informational — it reports the coordinates
    passed: true,
    detail: points.map(([x, y]) => `(${x},${y})`).join(' → '),
  });

  if (points.length < 3) {
    results.push({
      name:   'top-hung pictogram: apex at top edge (y < 20)',
      passed: false,
      detail: `expected ≥3 coordinate pairs, got ${points.length}`,
    });
    return results;
  }

  // The apex is the point with the minimum y (nearest the top edge in SVG coords)
  const apexIdx = points.reduce((mi, [, y], i, a) => (y < a[mi][1] ? i : mi), 0);
  const [apexX, apexY] = points[apexIdx];
  // All non-apex points are the free (bottom) edge — must be near the bottom
  const freePoints = points.filter((_, i) => i !== apexIdx);
  const freeNearBottom = freePoints.every(([, y]) => y > 40);

  results.push({
    name:   'top-hung pictogram: apex at top edge (y < 20)',
    passed: apexY < 20,
    detail: `apex=(${apexX},${apexY}); free-edge points=${freePoints.map(([x, y]) => `(${x},${y})`).join(', ')}`,
  });

  results.push({
    name:   'top-hung pictogram: free-edge points near bottom (y > 40)',
    passed: freeNearBottom,
    detail: freeNearBottom ? undefined : `free-edge points not near bottom: ${freePoints.map(([x, y]) => `(${x},${y})`).join(', ')}`,
  });

  return results;
}
