/**
 * scripts/verify-ui/checks-arabic-text.ts
 * Batch R: no English left on Arabic pages. Every /ar URL in the sitemap is loaded at 1440
 * and 390; every visible text node is split into Latin-script tokens, and any token not
 * covered by the allowlist FAILS. Emails and URLs are stripped first; text inside an
 * element with a non-Arabic lang (the "EN" toggle link, lang="en") is legitimately English.
 */

import type { Browser } from 'playwright';
import type { CheckResult } from './runner';
import { goto } from './runner';

// ── Allowlist ─────────────────────────────────────────────────────────────────
// Multi-word brand / system names, removed before tokenizing
export const ALLOW_PHRASES = ['Klasline Plus', 'Low-E'];
// Single tokens: brands, materials, standards, technical symbols and model names
export const ALLOW_TOKENS = new Set([
  // Brands + product systems (manufacturer names stay Latin in Arabic copy)
  'uPVC', 'WhatsApp', 'Domus', 'GIESSE', 'STAC', 'Dormakaba', 'Roto', 'Schüring', 'MTEC',
  'Hebeschiebe', 'Montana',
  // Standards, certifications, file formats, materials
  'ISO', 'DIN', 'RAL', 'CAD', 'PDF', 'EPDM', 'ACP', 'SEA',
  // Technical symbols + model designators: U-value, A+ grade, "TS 77/3", "MTEC III", "W 632"
  'U', 'A+', 'TS', 'III', 'W',
]);
// Codes and numbers with units: UW-01, CW-50, TB-600, 45mm, 50K+, 77/3
export const ALLOW_PATTERNS = [
  /^[A-Z]{1,4}-?\d[\w/-]*$/,         // catalog / system codes
  /^\d[\d.,/]*(mm|cm|m|kg|K)?\+?$/,  // numbers, optionally with a unit or "+"
];

// Latin-script runs (letters may carry digits and code punctuation: UW-01, A+, 77/3)
const TOKEN = /[\p{Script=Latin}\d][\p{Script=Latin}\d'’&+\-/]*/gu;

export function englishTokens(text: string): string[] {
  let t = text.replace(/[\w.+-]+@[\w.-]+\.\w+/g, ' ').replace(/https?:\/\/\S+/g, ' ');
  for (const p of ALLOW_PHRASES) t = t.split(p).join(' ');
  return (t.match(TOKEN) ?? [])
    .map((w) => w.replace(/[.'’-]+$/, ''))
    .filter((w) => /\p{Script=Latin}/u.test(w))
    .filter((w) => !ALLOW_TOKENS.has(w) && !ALLOW_PATTERNS.some((re) => re.test(w)));
}

// Visible text nodes (checkVisibility skips display:none + visibility:hidden — e.g. the
// invisible EN twin inside NavLabel); script/style and non-Arabic lang subtrees excluded
const COLLECT = `(function(){ var out=[]; var w=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); var n;
  while((n=w.nextNode())){ var el=n.parentElement; if(!el||!n.textContent.trim()) continue;
    if(el.closest('script,style,noscript')) continue;
    var lang=el.closest('[lang]'); if(lang&&!/^ar/.test(lang.getAttribute('lang'))) continue;
    if(!el.checkVisibility({visibilityProperty:true})) continue;
    out.push(n.textContent.trim()); }
  return out; })()`;

export async function checkArabicText(browser: Browser, base: string): Promise<CheckResult[]> {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const urls = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname))]
    .filter((p) => p === '/ar' || p.startsWith('/ar/'));
  const results: CheckResult[] = [];
  for (const width of [1440, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    const hits: string[] = [];
    for (const url of urls) {
      await goto(page, `${base}${url}`);
      const texts = (await page.evaluate(COLLECT)) as string[];
      const words = [...new Set(texts.flatMap(englishTokens))];
      if (words.length) hits.push(`${url}: ${words.join(', ')}`);
    }
    results.push({
      name: `no English text on /ar pages at ${width} (${urls.length} pages)`,
      passed: urls.length > 20 && hits.length === 0,
      detail: hits.join(' | ').slice(0, 900) || undefined,
    });
    await ctx.close();
  }
  return results;
}
