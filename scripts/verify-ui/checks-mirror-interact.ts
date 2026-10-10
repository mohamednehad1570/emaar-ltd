/**
 * scripts/verify-ui/checks-mirror-interact.ts
 * Batch R interaction checks: the burger overlay enters from the mirrored side, the
 * lightbox arrow keys follow reading direction (ArrowRight = previous in AR), and no page
 * scrolls horizontally at 390px in either language.
 */

import type { Browser } from 'playwright';
import type { CheckResult } from './runner';
import { goto } from './runner';

/**
 * Samples #mobile-nav's left edge every frame from the click on. The first sample is the
 * drawer's start position: off-screen right in EN (left ≥ W), off-screen left in AR (left < 0).
 */
export async function checkOverlayEntry(browser: Browser, base: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const [path, side] of [['/upvc', 'right'], ['/ar/upvc', 'left']] as const) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' });
    const page = await ctx.newPage();
    await goto(page, `${base}${path}`);
    await page.evaluate(`(function(){ window.__drawer=[]; var n=0;
      (function tick(){ var el=document.getElementById('mobile-nav');
        if(el){ window.__drawer.push(el.getBoundingClientRect().left); n++; }
        if(n<40) requestAnimationFrame(tick); })(); })()`);
    await page.click('header button[aria-controls="mobile-nav"]');
    await page.waitForTimeout(700);
    const xs = (await page.evaluate('window.__drawer')) as number[];
    const first = xs[0] ?? NaN;
    const last = xs[xs.length - 1] ?? NaN;
    const startsOff = side === 'right' ? first > 100 : first < -100;
    results.push({
      name: `burger overlay enters from the ${side} (${path})`,
      // Lands at 0 (full-width drawer) after starting off-screen on the expected side
      passed: startsOff && Math.abs(last) < 1,
      detail: `first left ${first?.toFixed(0)} → last ${last?.toFixed(0)} (${xs.length} frames)`,
    });
    await ctx.close();
  }
  return results;
}

/** Opens the first Options card and presses ArrowRight: EN → next (2), AR → previous (last). */
export async function checkLightboxKeys(browser: Browser, base: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const [path, rtl] of [['/upvc', false], ['/ar/upvc', true]] as const) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await goto(page, `${base}${path}#options`);
    await page.click('button[data-option]');
    const counter = '[role="dialog"] [data-lightbox-counter]';
    // A missing dialog/counter is a FAIL row, never a fatal timeout for the whole run
    if (!(await page.waitForSelector(counter, { timeout: 5000 }).catch(() => null))) {
      results.push({ name: `lightbox ArrowRight = ${rtl ? 'previous' : 'next'} (${path})`, passed: false, detail: 'lightbox counter not found' });
      await ctx.close();
      continue;
    }
    const before = (await page.textContent(counter))?.trim() ?? '';
    const total = Number(before.split('/')[1]);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    const after = (await page.textContent(counter))?.trim() ?? '';
    const want = `${rtl ? total : 2} / ${total}`;
    // Details panel sits on the inline-end side of the media: right in EN, left in AR
    const side = await page.evaluate(`(function(){ var d=document.querySelector('[data-lightbox-details]');
      var f=document.querySelector('[role="dialog"] figure'); if(!d||!f) return 'missing';
      return d.getBoundingClientRect().left > f.getBoundingClientRect().left ? 'right' : 'left'; })()`);
    results.push({
      name: `lightbox ArrowRight = ${rtl ? 'previous' : 'next'} (${path})`,
      passed: before === `1 / ${total}` && after === want,
      detail: `${before} → ${after}, expected ${want}`,
    });
    results.push({
      name: `lightbox details panel on the ${rtl ? 'left' : 'right'} (${path})`,
      passed: side === (rtl ? 'left' : 'right'),
      detail: `panel is ${String(side)}`,
    });
    await ctx.close();
  }
  return results;
}

/** No horizontal page scroll at 390px — every main page, both languages. */
export async function checkNoHScroll390(browser: Browser, base: string): Promise<CheckResult[]> {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  const pages = ['/', '/upvc', '/aluminum', '/products/single-sash-windows', '/projects', '/about', '/contact', '/technical', '/faq', '/careers', '/why-choose-us'];
  const bad: string[] = [];
  for (const p of pages) {
    for (const url of [p, p === '/' ? '/ar' : `/ar${p}`]) {
      await goto(page, `${base}${url}`);
      const o = (await page.evaluate('({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth })')) as { s: number; c: number };
      if (o.s > o.c + 1) bad.push(`${url} ${o.s}>${o.c}`);
    }
  }
  await ctx.close();
  return [{
    name: `no horizontal scroll at 390px (${pages.length} pages × EN/AR)`,
    passed: bad.length === 0,
    detail: bad.join('; ') || undefined,
  }];
}
