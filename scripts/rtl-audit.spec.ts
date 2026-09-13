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
 *   npx tsx scripts/rtl-audit.spec.ts
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';

const PAGES: Array<{ slug: string; path: string }> = [
  { slug: 'home',      path: '/' },
  { slug: 'upvc',      path: '/products/upvc' },
  { slug: 'aluminum',  path: '/products/aluminum' },
  { slug: 'glass',     path: '/products/glass' },
  { slug: 'villas',    path: '/projects/villas' },
  { slug: 'buildings', path: '/projects/buildings' },
];

const VIEWPORTS = [
  { name: 'mobile',  width: 390,  height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
];

const OUT_DIR = path.resolve('screenshots/rtl-audit');

async function run(): Promise<void> {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    console.log(`\n── ${vp.name} (${vp.width}×${vp.height}) ──`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: 'reduce',
    });

    for (const pg of PAGES) {
      console.log(`\n  ${pg.slug}`);
      const url = `${BASE_URL}${pg.path}`;

      // ── English ──────────────────────────────────────────────────────
      const enPage = await context.newPage();
      await enPage.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
      const enFile = path.join(OUT_DIR, `${pg.slug}-${vp.name}-en.png`);
      await enPage.screenshot({ fullPage: true, path: enFile });
      console.log(`  ✓  ${pg.slug}-${vp.name}-en.png`);
      await enPage.close();

      // ── Arabic ───────────────────────────────────────────────────────
      // Navigate first to establish the storage origin, then set
      // localStorage so LanguageContext reads 'ar' on the next mount.
      const arPage = await context.newPage();
      await arPage.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
      await arPage.evaluate(() => localStorage.setItem('language', 'ar'));
      await arPage.reload({ waitUntil: 'networkidle' });
      await arPage.waitForFunction(
        () => document.documentElement.dir === 'rtl',
        { timeout: 5_000 },
      );
      await arPage.waitForTimeout(300);
      const arFile = path.join(OUT_DIR, `${pg.slug}-${vp.name}-ar.png`);
      await arPage.screenshot({ fullPage: true, path: arFile });
      console.log(`  ✓  ${pg.slug}-${vp.name}-ar.png`);
      await arPage.close();
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
