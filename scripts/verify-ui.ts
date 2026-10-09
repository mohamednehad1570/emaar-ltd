/**
 * scripts/verify-ui.ts
 *
 * Playwright UI verification for the Emaar website.
 * Covers stable checks from Batches 5, 6 and 6R + Phase D and D-R2 additions.
 *
 * Usage:
 *   npm run verify:ui                          # against http://localhost:3123
 *   BASE_URL=http://localhost:3000 npm run verify:ui
 *   npm run verify:ui -- --screenshots ./screenshots/verify
 *
 * Prerequisites:
 *   npx next build && npx next start -p 3123
 *   (or a running dev server on another port — set BASE_URL accordingly)
 *
 * Exit code: 0 = all pass, 1 = one or more failures.
 */

import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { printTable } from './verify-ui/runner';
import {
  checkTypeCards,
  checkDeepLinkTabs,
  checkTabHashHistory,
  checkNoMechanismTypes,
} from './verify-ui/checks-catalog';
import {
  checkNoBlue,
  checkNoHScroll,
  checkTabMinHeight,
  checkHotspotTabOrder,
  checkNoARMirror,
} from './verify-ui/checks-layout';
import {
  checkHydrationAR,
  checkHashFilter,
  checkFooter390,
  checkTopHungPictogram,
} from './verify-ui/checks-hydration';

// ─── Config ───────────────────────────────────────────────────────────────────

const BASE_URL     = process.env.BASE_URL ?? 'http://localhost:3123';
const args         = process.argv.slice(2);
const ssIdx        = args.indexOf('--screenshots');
const SCREENSHOTS  = ssIdx !== -1 ? path.resolve(args[ssIdx + 1] ?? 'screenshots/verify') : null;

if (SCREENSHOTS) {
  fs.mkdirSync(SCREENSHOTS, { recursive: true });
  console.log(`Screenshots → ${SCREENSHOTS}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\nRunning verify:ui against ${BASE_URL} …`);
  const browser = await chromium.launch();

  // Default context — 1440px, no reduced-motion preference, for catalog/layout checks
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    // Disable reduced-motion so animation-gated checks run normally
    reducedMotion: 'no-preference',
  });
  const page = await context.newPage();

  try {
    const results = [
      // ── Phase D checks (catalog + layout + RTL) ──────────────────────────────
      ...(await checkTypeCards(page, BASE_URL)),
      ...(await checkDeepLinkTabs(page, BASE_URL)),
      ...(await checkTabHashHistory(page, BASE_URL)),
      ...(await checkNoMechanismTypes(page, BASE_URL)),
      ...(await checkNoBlue(page, BASE_URL)),
      ...(await checkTabMinHeight(page, BASE_URL)),
      ...(await checkHotspotTabOrder(page, BASE_URL)),
      ...(await checkNoARMirror(page, BASE_URL)),
      ...(await checkNoHScroll(page, BASE_URL)),

      // ── Phase D-R2 checks (hydration, flash, hash-filter, footer, pictogram) ─
      // These checks open their own browser contexts so they don't pollute the
      // shared page's language state.
      ...(await checkHydrationAR(browser, BASE_URL)),
      ...(await checkHashFilter(page, BASE_URL)),
      ...(await checkFooter390(browser, BASE_URL)),
      ...(await checkTopHungPictogram(page, BASE_URL)),
    ];

    // Optional full-page screenshot of key pages after all checks
    if (SCREENSHOTS) {
      for (const [url, name] of [
        [`${BASE_URL}/`, 'home'],
        [`${BASE_URL}/upvc`, 'upvc'],
        [`${BASE_URL}/products/casement-windows`, 'casement-windows'],
      ]) {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.screenshot({ path: path.join(SCREENSHOTS, `${name}.png`), fullPage: true });
      }
    }

    const allPassed = printTable(results);
    await browser.close();
    process.exit(allPassed ? 0 : 1);
  } catch (err) {
    console.error('\nFatal error during verify:ui:', err);
    await browser.close();
    process.exit(1);
  }
}

main();
