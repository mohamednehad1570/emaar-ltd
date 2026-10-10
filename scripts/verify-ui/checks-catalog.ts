/**
 * scripts/verify-ui/checks-catalog.ts
 * Checks specific to the product catalog: type cards, deep-link tabs,
 * hash/history behaviour, and no-mechanism type rendering.
 * EN runs on the unprefixed URLs, AR on /ar/… loaded directly (Batch L locale URLs).
 */

import type { Page } from 'playwright';
import type { CheckResult } from './runner';
import { goto } from './runner';

/** Type cards on material pages link to /products/[slug] (/ar/products/[slug] in Arabic). */
export async function checkTypeCards(page: Page, base: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const material of ['upvc', 'aluminum', 'ar/upvc'] as const) {
    await goto(page, `${base}/${material}`);
    // Card links must stay in the page's language
    const prefix = material.startsWith('ar/') ? '/ar/products/' : '/products/';
    const links = await page.$$eval(
      `a[data-testid="type-card"][href^="${prefix}"]`,
      (els) => els.map((el) => (el as HTMLAnchorElement).href),
    );
    const unique = [...new Set(links)];
    results.push({
      name:   `${material}: type cards link to ${prefix}[slug]`,
      passed: unique.length >= 4,
      detail: unique.length < 4 ? `only ${unique.length} unique product links found` : undefined,
    });
    // Each link should resolve to a non-redirect 200 (sampled: first 3)
    for (const href of unique.slice(0, 3)) {
      const res = await page.request.get(href);
      results.push({
        name:   `${material}: ${href.replace(base, '')} returns 200`,
        passed: res.status() === 200,
        detail: res.status() !== 200 ? `HTTP ${res.status()}` : undefined,
      });
    }
  }
  return results;
}

/**
 * Deep-link tabs: /upvc#glass activates the Glass tab; /upvc#accessories the Accessories tab;
 * same on /ar/…. Reads data-tab (the tab id) so EN and AR share one assertion.
 */
export async function checkDeepLinkTabs(page: Page, base: string): Promise<CheckResult[]> {
  const cases = [
    { url: `${base}/upvc#glass`,           tab: 'glass' },
    { url: `${base}/upvc#accessories`,     tab: 'accessories' },
    { url: `${base}/aluminum#glass`,       tab: 'glass' },
    { url: `${base}/ar/upvc#glass`,        tab: 'glass' },
    { url: `${base}/ar/aluminum#accessories`, tab: 'accessories' },
  ];
  const results: CheckResult[] = [];
  for (const { url, tab } of cases) {
    await goto(page, url);
    // Wait for JS to activate the tab (LineTabs fires on mount via useOptionsHash)
    await page.waitForTimeout(400);
    const selected = await page.$eval(
      `[role="tab"][aria-selected="true"]`,
      (el) => `${el.getAttribute('data-tab')}|${el.textContent?.trim() ?? ''}`,
    ).catch(() => '');
    results.push({
      name:   `deep-link ${url.replace(base, '')}: tab "${tab}" active`,
      passed: selected.split('|')[0] === tab,
      detail: selected ? `active tab is "${selected}"` : 'no active tab found',
    });
  }
  return results;
}

/**
 * Tab clicks update the hash via history.replaceState (no history push).
 * Navigate to /upvc, click the Designs tab, check history.length unchanged.
 */
export async function checkTabHashHistory(page: Page, base: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const path of ['/upvc', '/ar/upvc']) {
    await goto(page, `${base}${path}`);
    const lengthBefore = await page.evaluate(() => history.length);
    await page.click('[role="tab"][data-tab="designs"]');
    await page.waitForTimeout(200);
    const lengthAfter  = await page.evaluate(() => history.length);
    const { pathname, hash } = await page.evaluate(() => ({ pathname: location.pathname, hash: location.hash }));
    results.push(
      {
        // The hash rewrite must keep the locale prefix (/ar/upvc#designs, never /upvc#designs)
        name:   `tab click ${path}: URL ${path}#designs`,
        passed: hash === '#designs' && pathname === path,
        detail: `URL is "${pathname}${hash}"`,
      },
      {
        name:   `tab click ${path}: no history push (replaceState)`,
        passed: lengthAfter === lengthBefore,
        detail: `history.length ${lengthBefore} → ${lengthAfter}`,
      },
    );
  }
  return results;
}

/**
 * Non-glazed types (pergola, handrails, cladding, security-systems) have mechanism=unspecified.
 * They must not render a hotspot diagram section or an empty "How it opens" block.
 */
export async function checkNoMechanismTypes(page: Page, base: string): Promise<CheckResult[]> {
  // These slugs are known non-glazed types — see CLAUDE.md mechanism rules
  const slugs = ['pergola', 'handrails', 'cladding', 'security-systems'];
  const results: CheckResult[] = [];
  for (const slug of slugs) {
    const res = await page.request.get(`${base}/products/${slug}`);
    if (res.status() !== 200) {
      results.push({ name: `${slug}: page returns 200`, passed: false, detail: `HTTP ${res.status()}` });
      continue;
    }
    await goto(page, `${base}/products/${slug}`);
    // No hotspot diagram section should be rendered
    const hasDiagram = await page.$('svg[viewBox="0 0 400 300"]') !== null;
    // No "How it opens" heading should appear
    const hasHowText = await page.$eval(
      '*',
      () => document.body.textContent?.toLowerCase().includes('how it opens') ?? false,
    );
    results.push({
      name:   `${slug}: no hotspot diagram`,
      passed: !hasDiagram,
    });
    results.push({
      name:   `${slug}: no "How it opens" heading`,
      passed: !hasHowText,
    });
  }
  return results;
}
