/**
 * scripts/verify-sbs.ts
 *
 * Batch R visual review: Arabic is expected to CHANGE (it now mirrors English), so instead
 * of a diff it writes side-by-side composites — EN on the left, AR on the right, 24px warm
 * gutter — for review by eye. Same 7 pages × 1440/900/390 as verify-diff, plus three
 * interaction states: the Options lightbox (1440 + 390), the open burger overlay (390) and
 * the hotspot section (1440 + 390).
 *
 * Usage: npx tsx scripts/verify-sbs.ts   (HEAD build on HEAD_URL, default :3123)
 * Output: screenshots/batchR/sbs/{name}.png
 */

import { chromium, type Browser, type Page } from 'playwright';
import path from 'path';
import fs from 'fs';
import { PNG } from 'pngjs';

const HEAD_URL = process.env.HEAD_URL ?? 'http://localhost:3123';
const OUT = path.resolve('screenshots/batchR/sbs');
const PAGES = ['/', '/upvc', '/aluminum', '/products/tilt-and-turn-windows', '/products/hinged-doors', '/projects', '/contact'];
const WIDTHS = [1440, 900, 390];
const GUTTER = 24;
// Warm off-white gutter (#F5F4F0) so the seam reads as page chrome, not as content
const GUTTER_RGB = [245, 244, 240];

type Lang = 'en' | 'ar';
type Shot = (page: Page) => Promise<Buffer>;
const url = (route: string, lang: Lang) => `${HEAD_URL}${lang === 'ar' ? `/ar${route === '/' ? '' : route}` : route}`;
const slug = (p: string) => (p === '/' ? 'home' : p.slice(1).replace(/\//g, '-'));

/** Fonts, whileInView (scroll through), back to top — same routine as verify-diff. */
async function settle(page: Page) {
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 800) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);
}

async function grab(browser: Browser, width: number, target: string, shot: Shot): Promise<PNG> {
  const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(target, { waitUntil: 'networkidle' });
  await settle(page);
  const png = PNG.sync.read(await shot(page));
  await ctx.close();
  return png;
}

/** EN | gutter | AR on one canvas; the shorter side is padded with the gutter colour. */
function compose(en: PNG, ar: PNG, name: string): string {
  const w = en.width + GUTTER + ar.width, h = Math.max(en.height, ar.height);
  const out = new PNG({ width: w, height: h });
  for (let i = 0; i < w * h; i++) out.data.set([...GUTTER_RGB, 255], i * 4);
  PNG.bitblt(en, out, 0, 0, en.width, en.height, 0, 0);
  PNG.bitblt(ar, out, 0, 0, ar.width, ar.height, en.width + GUTTER, 0);
  const file = path.join(OUT, `${name}.png`);
  fs.writeFileSync(file, PNG.sync.write(out));
  return file;
}

async function pair(browser: Browser, name: string, route: string, width: number, shot: Shot) {
  const en = await grab(browser, width, url(route, 'en'), shot);
  const ar = await grab(browser, width, url(route, 'ar'), shot);
  return compose(en, ar, name);
}

// ── Interaction states ───────────────────────────────────────────────────────
const fullPage: Shot = (page) => page.screenshot({ fullPage: true, animations: 'disabled' });
const lightbox: Shot = async (page) => {
  await page.locator('#options').scrollIntoViewIfNeeded();
  await page.click('button[data-option]');
  await page.waitForSelector('[data-lightbox-details]');
  await page.waitForTimeout(400);
  return page.screenshot({ animations: 'disabled' });
};
const overlay: Shot = async (page) => {
  await page.click('header button[aria-controls="mobile-nav"]');
  await page.waitForTimeout(600);
  return page.screenshot({ animations: 'disabled' });
};
const hotspots: Shot = async (page) => {
  const section = page.locator('section:has([data-hotspot-pin])');
  // Activate pin 2 so the highlighted list item shows which side the list sits on
  await page.locator('[data-hotspot-pin="2"]').hover();
  await page.waitForTimeout(300);
  return section.screenshot({ animations: 'disabled' });
};

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const files: string[] = [];
  for (const route of PAGES) for (const w of WIDTHS) files.push(await pair(browser, `${slug(route)}-${w}`, route, w, fullPage));
  for (const w of [1440, 390]) files.push(await pair(browser, `lightbox-${w}`, '/upvc', w, lightbox));
  files.push(await pair(browser, 'burger-overlay-390', '/upvc', 390, overlay));
  for (const w of [1440, 390]) files.push(await pair(browser, `hotspots-${w}`, '/products/hinged-doors', w, hotspots));
  await browser.close();
  console.log(`\n${files.length} side-by-side composites (EN | AR):`);
  for (const f of files) console.log(`  ${path.relative(process.cwd(), f)}`);
}

main();
