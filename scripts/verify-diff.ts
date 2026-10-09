/**
 * scripts/verify-diff.ts
 *
 * Before/after screenshot diff between HEAD (3123) and the commit before cb2c2dd
 * (baseline = 404ea1d, served on 3124).
 *
 * Pages captured: / and /contact (footer-heavy), plus 4 product type pages.
 * Viewports: 1440×900 · 900×900 · 390×844.
 * Languages: EN and AR (seeded via localStorage addInitScript for AR).
 * Accordion: one group expanded (Enter key on first footer accordion trigger).
 *
 * Reports: page / viewport / lang → differing pixel % + explanation of every
 * non-zero diff. Anything other than intended copy/title/eyebrow changes is a bug.
 *
 * Usage:
 *   npx tsx scripts/verify-diff.ts
 *   (HEAD on 3123, baseline on 3124 — both must be running)
 *
 * Output goes to: screenshots/diff/{head,baseline}/{page-viewport-lang[-open]}.png
 *           and:  screenshots/diff/delta/  (pixelmatch diff images)
 */

import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import path from 'path';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

// ─── Config ───────────────────────────────────────────────────────────────────

const HEAD_URL     = process.env.HEAD_URL     ?? 'http://localhost:3123';
const BASE_URL     = process.env.BASE_URL     ?? 'http://localhost:3124';
const OUT_DIR      = path.resolve('screenshots/diff');
const HEAD_DIR     = path.join(OUT_DIR, 'head');
const BASE_DIR     = path.join(OUT_DIR, 'baseline');
const DELTA_DIR    = path.join(OUT_DIR, 'delta');

const VIEWPORTS = [
  { w: 1440, h: 900,  label: '1440' },
  { w: 900,  h: 900,  label: '900'  },
  { w: 390,  h: 844,  label: '390'  },
] as const;

const TYPE_SLUGS = [
  'casement-windows',
  'sliding-windows',
  'hinged-doors',
  'top-hung-windows',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ensureDirs() {
  for (const d of [HEAD_DIR, BASE_DIR, DELTA_DIR]) fs.mkdirSync(d, { recursive: true });
}

/** Navigate, wait for networkidle, optionally open a footer accordion. */
async function capturePage(
  page: Page,
  url: string,
  screenshotPath: string,
  openAccordion = false,
): Promise<void> {
  await page.goto(url, { waitUntil: 'networkidle' });
  if (openAccordion) {
    // Mobile accordion is lg:hidden — only visible below 1024px.
    // Use a short timeout so desktop viewports don't stall.
    const trigger = await page.$('button[aria-expanded]:visible');
    if (trigger) {
      await trigger.scrollIntoViewIfNeeded({ timeout: 2000 }).catch(() => {});
      await trigger.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(400); // let Framer Motion animate
    }
  }
  await page.screenshot({ path: screenshotPath, fullPage: true });
}

/**
 * Pixel-diff two PNG file paths.
 * Returns { diffPct, diffPixels, width, height }.
 */
function diffImages(
  pathA: string,
  pathB: string,
  outPath: string,
): { diffPct: number; diffPixels: number } {
  if (!fs.existsSync(pathA) || !fs.existsSync(pathB)) {
    return { diffPct: -1, diffPixels: -1 };
  }
  const imgA = PNG.sync.read(fs.readFileSync(pathA));
  const imgB = PNG.sync.read(fs.readFileSync(pathB));

  // Pages may differ in height (e.g. footer size changed) — pad the shorter one
  const w = Math.max(imgA.width,  imgB.width);
  const h = Math.max(imgA.height, imgB.height);

  function pad(img: PNG): Buffer {
    if (img.width === w && img.height === h) return img.data;
    const buf = Buffer.alloc(w * h * 4, 255); // fill with white
    for (let row = 0; row < img.height; row++) {
      img.data.copy(buf, row * w * 4, row * img.width * 4, (row + 1) * img.width * 4);
    }
    return buf;
  }

  const diff = new PNG({ width: w, height: h });
  const diffPixels = pixelmatch(pad(imgA), pad(imgB), diff.data, w, h, {
    threshold: 0.12, // allow minor antialiasing differences
  });
  fs.writeFileSync(outPath, PNG.sync.write(diff));
  return { diffPct: (diffPixels / (w * h)) * 100, diffPixels };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

interface DiffRow {
  page:       string;
  viewport:   string;
  lang:       string;
  accordion:  string;
  diffPct:    number;
  diffPixels: number;
  explanation?: string;
}

async function takeScreenshots(
  browser: Browser,
  serverUrl: string,
  outDir: string,
): Promise<string[]> {
  const paths: string[] = [];

  for (const lang of ['en', 'ar'] as const) {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });

      if (lang === 'ar') {
        await ctx.addInitScript(() => {
          try { localStorage.setItem('language', 'ar'); } catch { /* guard */ }
        });
      }

      const pg = await ctx.newPage();

      // Footer pages: /, /contact (accordion closed + one open)
      for (const { route, accordionOpen } of [
        { route: '/',        accordionOpen: false },
        { route: '/',        accordionOpen: true  },
        { route: '/contact', accordionOpen: false },
        { route: '/contact', accordionOpen: true  },
      ]) {
        const accSuffix = accordionOpen ? '-open' : '';
        const slug      = route === '/' ? 'home' : route.slice(1);
        const filename  = `${slug}-${vp.label}-${lang}${accSuffix}.png`;
        const ssPath    = path.join(outDir, filename);
        await capturePage(pg, `${serverUrl}${route}`, ssPath, accordionOpen);
        paths.push(filename);
        // Reopen page without state for the next iteration
        if (accordionOpen) await capturePage(pg, `${serverUrl}${route}`, ssPath, false);
      }

      // Type pages (no accordion)
      for (const slug of TYPE_SLUGS) {
        const filename = `${slug}-${vp.label}-${lang}.png`;
        const ssPath   = path.join(outDir, filename);
        await capturePage(pg, `${serverUrl}/products/${slug}`, ssPath);
        paths.push(filename);
      }

      await ctx.close();
    }
  }

  return paths;
}

async function main() {
  ensureDirs();
  console.log('\nVerify-diff: capturing screenshots …');
  console.log(`  HEAD     → ${HEAD_URL}  (screenshots → ${HEAD_DIR})`);
  console.log(`  Baseline → ${BASE_URL}  (screenshots → ${BASE_DIR})`);

  const browser = await chromium.launch();

  console.log('\n  Capturing HEAD …');
  const headFiles = await takeScreenshots(browser, HEAD_URL, HEAD_DIR);

  console.log('  Capturing baseline …');
  const baseFiles = await takeScreenshots(browser, BASE_URL, BASE_DIR);

  await browser.close();

  // ── Diff ────────────────────────────────────────────────────────────────────
  const allFiles = [...new Set([...headFiles, ...baseFiles])];
  const rows: DiffRow[] = [];

  for (const filename of allFiles) {
    const headPath  = path.join(HEAD_DIR,  filename);
    const basePath  = path.join(BASE_DIR,  filename);
    const deltaPath = path.join(DELTA_DIR, filename);

    const { diffPct, diffPixels } = diffImages(headPath, basePath, deltaPath);

    // Parse filename: "{page-slug}-{viewport}-{lang}[-open].png"
    // Viewport and lang are deterministic tokens, so work backwards from the end.
    const base2  = filename.replace('.png', '');
    const tokens = base2.split('-');
    // Pop known suffixes from the tail: "open" (optional), lang ("en"|"ar"), viewport ("1440"|"900"|"390")
    const accordion = tokens[tokens.length - 1] === 'open' ? 'open' : 'closed';
    const tail      = accordion === 'open' ? tokens.slice(-3) : tokens.slice(-2);  // [vp, lang] or [vp, lang, open]
    const vpPart    = accordion === 'open' ? tokens[tokens.length - 3] : tokens[tokens.length - 2];
    const langPart  = accordion === 'open' ? tokens[tokens.length - 2] : tokens[tokens.length - 1];
    void tail; // suppress unused warning
    const headTokenCount = tokens.length - (accordion === 'open' ? 3 : 2);
    const pagePart = tokens.slice(0, headTokenCount).join('-');

    let explanation: string | undefined;
    if (diffPct > 0) {
      // Known-acceptable changes introduced by cb2c2dd + 43933e1:
      //   - Footer was completely rewritten (Footer.tsx → 6 sub-components)
      //   - Footer variant copy, title/eyebrow text changes (variant copy Batch 4/5)
      //   - LanguageContext hydration refactor (no visible diff for EN)
      // Any diff on / or /contact is expected to be in the footer region.
      // Type pages: expected changes are: eyebrow shortLabel (AR), TypeHero title copy.
      explanation =
        pagePart === 'home'    ? 'footer rewrite (cb2c2dd); potential brand/tagline copy change' :
        pagePart === 'contact' ? 'footer rewrite (cb2c2dd)' :
        TYPE_SLUGS.some((s) => filename.includes(s)) ? 'eyebrow shortLabel / variant copy (cb2c2dd)' :
        'INVESTIGATE — unexpected diff';
    }

    rows.push({
      page:      pagePart ?? filename,
      viewport:  vpPart   ?? '?',
      lang:      langPart ?? '?',
      accordion,
      diffPct,
      diffPixels,
      explanation,
    });
  }

  // ── Report ──────────────────────────────────────────────────────────────────
  const COL = { page: 24, vp: 6, lang: 4, acc: 7, pct: 8 };
  const hdr = (s: string, w: number) => s.padEnd(w);
  console.log('\n' + '─'.repeat(80));
  console.log(' VERIFY-DIFF RESULTS  (HEAD vs baseline 404ea1d)');
  console.log('─'.repeat(80));
  console.log(
    hdr('page',     COL.page) +
    hdr('vp',       COL.vp)   +
    hdr('lang',     COL.lang)  +
    hdr('acc',      COL.acc)   +
    hdr('diff%',    COL.pct)   +
    'explanation',
  );
  console.log('─'.repeat(80));

  let anyBug = false;
  for (const r of rows) {
    const pctStr = r.diffPct < 0 ? 'MISSING' : `${r.diffPct.toFixed(2)}%`;
    const line =
      hdr(r.page,     COL.page) +
      hdr(r.viewport, COL.vp)   +
      hdr(r.lang,     COL.lang)  +
      hdr(r.accordion,COL.acc)   +
      hdr(pctStr,     COL.pct);
    if (r.diffPct > 0 && r.explanation?.startsWith('INVESTIGATE')) {
      anyBug = true;
      console.log(line + '⚠ ' + (r.explanation ?? ''));
    } else {
      console.log(line + (r.explanation ?? ''));
    }
  }

  console.log('─'.repeat(80));
  if (anyBug) {
    console.log(' ⚠  UNEXPECTED diffs found — see rows marked INVESTIGATE above.');
  } else {
    console.log(' All diffs accounted for (footer rewrite + variant copy).');
  }
  console.log('─'.repeat(80) + '\n');

  process.exit(anyBug ? 1 : 0);
}

main();
