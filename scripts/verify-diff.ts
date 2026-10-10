/**
 * scripts/verify-diff.ts
 *
 * Batch L before/after pixel diff — locale URLs must change NOTHING visually.
 *   baseline (f87f69d worktree, BASE_URL :3124) — EN: load /path · AR: load /path, click ع
 *   head     (this build,       HEAD_URL :3123) — EN: load /path · AR: load /ar/path directly
 * Pages × 1440/900/390 × EN/AR. Every capture runs the same settle routine (fonts ready,
 * scroll through so whileInView fires, back to top) under reduced motion, so entrance
 * animations can't leave a frame mid-flight.
 *
 * Usage: npx tsx scripts/verify-diff.ts   (both servers running; DIFF_PAGES=/a,/b for a subset)
 * Output: screenshots/batchL/diff/{baseline,head,delta}/{page}-{vp}-{lang}.png
 * Table: diff% (pixelmatch, threshold 0.12) · raw changed px · max channel delta · y-range.
 */

import { chromium, type Browser, type Page } from 'playwright';
import path from 'path';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const HEAD_URL = process.env.HEAD_URL ?? 'http://localhost:3123';
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3124';
const OUT = path.resolve('screenshots/batchL/diff');

const ALL_PAGES = ['/', '/upvc', '/aluminum', '/products/tilt-and-turn-windows', '/products/hinged-doors', '/projects', '/contact'];
// DIFF_PAGES=/projects,/contact re-runs a subset (e.g. after a fix scoped to one page)
const PAGES = process.env.DIFF_PAGES ? process.env.DIFF_PAGES.split(',') : ALL_PAGES;
const VIEWPORTS = [{ w: 1440, h: 900 }, { w: 900, h: 900 }, { w: 390, h: 844 }];
type Side = 'baseline' | 'head';
type Lang = 'en' | 'ar';

const slug = (p: string) => (p === '/' ? 'home' : p.slice(1).replace(/\//g, '-'));

/** Same settle routine on both sides: fonts, lazy content, whileInView, header state. */
async function settle(page: Page) {
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 800) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200); // header frost → clear, last fades land
}

async function capture(browser: Browser, side: Side, route: string, lang: Lang, vp: { w: number; h: number }) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const base = side === 'head' ? HEAD_URL : BASE_URL;
  // Head serves Arabic at /ar/… ; the baseline only has the client-side toggle
  const url = side === 'head' && lang === 'ar' ? `${base}/ar${route === '/' ? '' : route}` : `${base}${route}`;
  await page.goto(url, { waitUntil: 'networkidle' });
  if (side === 'baseline' && lang === 'ar') {
    // <1024 keeps EN|ع in the burger overlay — open it, click ع, close it
    const visible = await page.locator('[aria-label="Switch to Arabic"]:visible').count();
    if (!visible) await page.click('button[aria-controls="mobile-nav"]');
    await page.locator('[aria-label="Switch to Arabic"]:visible').first().click();
    await page.waitForFunction(() => document.documentElement.dir === 'rtl');
    // The open overlay covers the burger — close it with its own first button (✕)
    if (!visible) await page.locator('#mobile-nav button').first().click();
    await page.waitForTimeout(600); // 150ms crossfade + overlay exit + hydration settle
  }
  await settle(page);
  const file = path.join(OUT, side, `${slug(route)}-${vp.w}-${lang}.png`);
  await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
  await ctx.close();
  return file;
}

interface Row { name: string; pct: number; raw: number; maxDelta: number; yRange: string; heights: string }

function diff(name: string): Row {
  const a = PNG.sync.read(fs.readFileSync(path.join(OUT, 'baseline', name)));
  const b = PNG.sync.read(fs.readFileSync(path.join(OUT, 'head', name)));
  const w = Math.max(a.width, b.width), h = Math.max(a.height, b.height);
  // Pad the shorter capture with white so a height change shows up as a diff
  const pad = (img: PNG) => {
    const buf = Buffer.alloc(w * h * 4, 255);
    for (let y = 0; y < img.height; y++) img.data.copy(buf, y * w * 4, y * img.width * 4, (y + 1) * img.width * 4);
    return buf;
  };
  const [pa, pb] = [pad(a), pad(b)];
  const out = new PNG({ width: w, height: h });
  const px = pixelmatch(pa, pb, out.data, w, h, { threshold: 0.12 });
  fs.writeFileSync(path.join(OUT, 'delta', name), PNG.sync.write(out));
  let raw = 0, maxDelta = 0, y0 = -1, y1 = -1;
  for (let i = 0; i < pa.length; i += 4) {
    const d = Math.max(Math.abs(pa[i] - pb[i]), Math.abs(pa[i + 1] - pb[i + 1]), Math.abs(pa[i + 2] - pb[i + 2]));
    if (!d) continue;
    raw++; maxDelta = Math.max(maxDelta, d);
    const y = Math.floor(i / 4 / w); if (y0 < 0) y0 = y; y1 = y;
  }
  return {
    name, pct: (px / (w * h)) * 100, raw, maxDelta,
    yRange: y0 < 0 ? '—' : `${y0}–${y1}`, heights: a.height === b.height ? `${a.height}` : `${a.height}→${b.height}`,
  };
}

async function main() {
  for (const d of ['baseline', 'head', 'delta']) fs.mkdirSync(path.join(OUT, d), { recursive: true });
  const browser = await chromium.launch();
  const names: string[] = [];
  for (const route of PAGES) for (const vp of VIEWPORTS) for (const lang of ['en', 'ar'] as const) {
    for (const side of ['baseline', 'head'] as const) await capture(browser, side, route, lang, vp);
    names.push(`${slug(route)}-${vp.w}-${lang}.png`);
  }
  await browser.close();

  const rows = names.map(diff);
  console.log('\n' + '─'.repeat(96));
  console.log(' VERIFY-DIFF  baseline f87f69d (AR = click ع)  vs  HEAD (AR = /ar/… direct)');
  console.log('─'.repeat(96));
  console.log(`${'capture'.padEnd(40)}${'diff%'.padEnd(9)}${'raw px'.padEnd(9)}${'maxΔ'.padEnd(6)}${'height'.padEnd(13)}y-range`);
  for (const r of rows) {
    console.log(`${r.name.replace('.png', '').padEnd(40)}${(r.pct.toFixed(2) + '%').padEnd(9)}${String(r.raw).padEnd(9)}${String(r.maxDelta).padEnd(6)}${r.heights.padEnd(13)}${r.yRange}`);
  }
  const nonZero = rows.filter((r) => r.pct > 0);
  console.log('─'.repeat(96));
  console.log(` ${rows.length} captures · ${rows.length - nonZero.length} at 0.00% · ${nonZero.length} non-zero (delta images: ${path.relative(process.cwd(), path.join(OUT, 'delta'))})`);
  console.log('─'.repeat(96) + '\n');
}

main();
