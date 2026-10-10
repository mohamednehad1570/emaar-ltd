/**
 * scripts/verify-ui/checks-footer.ts
 * (d) Footer at 390px, EN (/) and AR (/ar): every link resolves 200 (AR links must keep
 * the /ar prefix); accordion keyboard — Enter opens, Space closes.
 */

import type { Browser } from 'playwright';
import type { CheckResult } from './runner';

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
    const pg = await ctx.newPage();
    // Arabic is its own URL now — no stored preference to seed
    await pg.goto(`${base}${lang === 'ar' ? '/ar' : '/'}`, { waitUntil: 'networkidle' });

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
      // Internal links must stay in the page's language
      if (lang === 'ar' && !(href === '/ar' || href.startsWith('/ar/') || href.startsWith('/ar#'))) {
        linkFail = `${href} → missing /ar prefix`;
        break;
      }

      const res = await pg.request.get(`${base}${href}`).catch(() => null);
      if (!res || res.status() !== 200) {
        linkFail = `${href} → ${res?.status() ?? 'failed'}`;
        break;
      }
    }

    results.push({
      name:   `footer(${lang}) 390px: all links resolve 200 or exempt${lang === 'ar' ? ', /ar-prefixed' : ''}`,
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
