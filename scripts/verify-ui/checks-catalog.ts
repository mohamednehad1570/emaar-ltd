/**
 * scripts/verify-ui/checks-catalog.ts
 * Checks specific to the product catalog: type cards, deep-link tabs,
 * hash/history behaviour, and no-mechanism type rendering.
 */

import type { Page } from 'playwright';
import type { CheckResult } from './runner';
import { goto } from './runner';

/** Type cards on material pages link to /products/[slug] and appear in known quantities. */
export async function checkTypeCards(page: Page, base: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const material of ['upvc', 'aluminum'] as const) {
    await goto(page, `${base}/${material}`);
    const links = await page.$$eval(
      'a[href^="/products/"]',
      (els) => els.map((el) => (el as HTMLAnchorElement).href),
    );
    const unique = [...new Set(links)];
    results.push({
      name:   `${material}: type cards link to /products/[slug]`,
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
 * Deep-link tabs: /upvc#glass activates the Glass tab; /upvc#accessories the Accessories tab.
 * The check reads aria-selected on the tab button whose value matches the hash.
 */
export async function checkDeepLinkTabs(page: Page, base: string): Promise<CheckResult[]> {
  const cases = [
    { url: `${base}/upvc#glass`,        label: 'Glass' },
    { url: `${base}/upvc#accessories`,  label: 'Accessories' },
    { url: `${base}/aluminum#glass`,    label: 'Glass' },
  ];
  const results: CheckResult[] = [];
  for (const { url, label } of cases) {
    await goto(page, url);
    // Wait for JS to activate the tab (LineTabs fires on mount via useOptionsHash)
    await page.waitForTimeout(400);
    const selected = await page.$eval(
      `[role="tab"][aria-selected="true"]`,
      (el) => el.textContent?.trim() ?? '',
    ).catch(() => '');
    results.push({
      name:   `deep-link ${url.replace(base, '')}: tab "${label}" active`,
      passed: selected.toLowerCase().includes(label.toLowerCase()),
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
  await goto(page, `${base}/upvc`);
  const lengthBefore = await page.evaluate(() => history.length);
  await page.click('[role="tab"]:has-text("Designs")');
  await page.waitForTimeout(200);
  const lengthAfter  = await page.evaluate(() => history.length);
  const hash         = await page.evaluate(() => location.hash);
  return [
    {
      name:   'tab click: hash set to #designs',
      passed: hash === '#designs',
      detail: `hash is "${hash}"`,
    },
    {
      name:   'tab click: no history push (replaceState)',
      passed: lengthAfter === lengthBefore,
      detail: `history.length ${lengthBefore} → ${lengthAfter}`,
    },
  ];
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
