/**
 * RTL Visual Audit Script
 *
 * Captures full-page screenshots of key pages in EN + AR at mobile and
 * desktop viewports. Not a test suite — no assertions, just screenshots.
 *
 * Prerequisites (run once):
 *   npm install -D playwright
 *   npx playwright install chromium
 *
 * Run:
 *   npx ts-node --esm scripts/rtl-audit.spec.ts
 *   — or —
 *   npx tsx scripts/rtl-audit.spec.ts
 */

import { chromium, type Page } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://emaar-ltd-git-dev-mohamednehad1570s-projects.vercel.app';

const PAGES: Array<{ slug: string; path: string }> = [
  { slug: 'home',      path: '/' },
  { slug: 'upvc',      path: '/products/upvc' },
  { slug: 'aluminum',  path: '/products/aluminum' },
  { slug: 'glass',     path: '/products/glass' },
  { slug: 'villas',    path: '/projects/villas' },
  { slug: 'buildings', path: '/projects/buildings' },
];

const VIEWPORTS = [
  { name: 'mobile',  width: 390,  height: 844  },
  { name: 'desktop', width: 1440, height: 900  },
];

const OUT_DIR = path.resolve('screenshots/rtl-audit');

async function switchToArabic(page: Page, isMobile: boolean): Promise<void> {
  if (isMobile) {
    // Open the mobile overlay so the language toggle becomes visible.
    const burger = page.locator('button[aria-label="Open menu"]');
    await burger.click();
    await page.waitForTimeout(150); // overlay open animation
  }

  const toggle = page.getByRole('button', { name: 'Switch to Arabic' }).first();
  await toggle.click();
  // Wait for the crossfade transition (LanguageTransition is 150 ms) and
  // any subsequent network activity to settle.
  await page.waitForTimeout(300);
  await page.waitForLoadState('networkidle');

  if (isMobile) {
    // Close the overlay so it doesn't cover page content in the screenshot.
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150); // overlay close animation
  }
}

async function screenshot(
  page: Page,
  slug: string,
  viewport: string,
  lang: string,
): Promise<void> {
  const filename = `${slug}-${viewport}-${lang}.png`;
  const dest = path.join(OUT_DIR, filename);
  await page.screenshot({ fullPage: true, path: dest });
  console.log(`  ✓  ${filename}`);
}

async function run(): Promise<void> {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    console.log(`\n── ${vp.name} (${vp.width}×${vp.height}) ──`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      // Disable animations so screenshots are stable
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();

    for (const pg of PAGES) {
      console.log(`\n  ${pg.slug}`);
      const url = `${BASE_URL}${pg.path}`;

      // ── English ──────────────────────────────────────────────────────
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
      await screenshot(page, pg.slug, vp.name, 'en');

      // ── Arabic ───────────────────────────────────────────────────────
      // Navigate fresh so we start from EN regardless of prior state,
      // then switch to AR.
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
      await switchToArabic(page, vp.name === 'mobile');
      await screenshot(page, pg.slug, vp.name, 'ar');
    }

    await context.close();
  }

  await browser.close();
  console.log(`\nDone. Screenshots saved to ${OUT_DIR}\n`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
