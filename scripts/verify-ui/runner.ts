/**
 * scripts/verify-ui/runner.ts
 * Shared result type, table printer, and page helper for verify-ui checks.
 */

import type { Page } from 'playwright';

export interface CheckResult {
  name:    string;
  passed:  boolean;
  detail?: string;
}

/** Print a fixed-width pass/fail table and return false if any check failed. */
export function printTable(results: CheckResult[]): boolean {
  const COL = 56;
  console.log('\n' + '─'.repeat(COL + 10));
  console.log(' VERIFY-UI RESULTS');
  console.log('─'.repeat(COL + 10));
  for (const r of results) {
    const tag  = r.passed ? '  PASS  ' : '  FAIL  ';
    const line = `[${tag}] ${r.name.padEnd(COL)}`;
    console.log(line);
    if (!r.passed && r.detail) console.log(`         → ${r.detail}`);
  }
  const failed = results.filter((r) => !r.passed).length;
  console.log('─'.repeat(COL + 10));
  console.log(` ${results.length - failed} passed · ${failed} failed`);
  console.log('─'.repeat(COL + 10) + '\n');
  return failed === 0;
}

/** Wait for hydration + any pending navigation before querying. */
export async function waitReady(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
}

/** Navigate and wait for hydration; optionally save a screenshot. */
export async function goto(page: Page, url: string, screenshotPath?: string): Promise<void> {
  await page.goto(url, { waitUntil: 'networkidle' });
  if (screenshotPath) await page.screenshot({ path: screenshotPath, fullPage: true });
}

/** True when the element's minimum height is ≥ minPx (reads CSS min-height or falls back to offsetHeight). */
export async function minHeightAtLeast(page: Page, selector: string, minPx: number): Promise<boolean> {
  const heights = await page.$$eval(selector, (els, min) =>
    els.map((el) => {
      const mh = parseFloat(getComputedStyle(el).minHeight);
      return isNaN(mh) ? (el as HTMLElement).offsetHeight >= min : mh >= min;
    }),
    minPx,
  );
  return heights.length > 0 && heights.every(Boolean);
}
