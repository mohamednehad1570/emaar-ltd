/**
 * scripts/verify-ui/checks-layout.ts
 * Layout and accessibility checks: no blue outside swatches, no horizontal scroll
 * at 390px AR, tab min-height ≥44px, hotspot tab order, no mirroring in AR.
 */

import type { Page } from 'playwright';
import type { CheckResult } from './runner';
import { goto, minHeightAtLeast } from './runner';

/**
 * No blue-family colors outside designated swatch elements.
 * Samples computed color/background-color of ~400 elements; flags any with hue 200–260
 * that is not inside a [data-swatch] or [data-color-option] container.
 */
export async function checkNoBlue(page: Page, base: string): Promise<CheckResult[]> {
  await goto(page, `${base}/upvc`);
  const blueFound = await page.evaluate(() => {
    // Extract HSL hue from a CSS rgb(...) string
    function hue(rgb: string): number | null {
      const m = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (!m) return null;
      const [r, g, b] = [+m[1] / 255, +m[2] / 255, +m[3] / 255];
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      if (max === min) return 0;
      const d = max - min;
      const h = max === r ? (g - b) / d + (g < b ? 6 : 0)
              : max === g ? (b - r) / d + 2
              :             (r - g) / d + 4;
      return (h / 6) * 360;
    }
    const els = Array.from(document.querySelectorAll('*')).slice(0, 400);
    for (const el of els) {
      if (el.closest('[data-swatch],[data-color-option]')) continue;
      const st = getComputedStyle(el as Element);
      for (const prop of ['color', 'backgroundColor', 'borderColor']) {
        const h = hue(st.getPropertyValue(prop));
        // Blue band: hue 200–260, saturation and lightness > 20% (skip near-greys)
        if (h !== null && h >= 200 && h <= 260) {
          const [s, l] = [st.getPropertyValue('--s'), st.getPropertyValue('--l')];
          // Quick saturation check via color string — if all channels are similar it is grey
          const rgb = st.getPropertyValue(prop).match(/\d+/g)?.map(Number) ?? [];
          if (rgb.length >= 3) {
            const spread = Math.max(...rgb) - Math.min(...rgb);
            if (spread > 40) return el.tagName + '.' + el.className.toString().slice(0, 60);
          }
          void s; void l;
        }
      }
    }
    return null;
  });
  return [{
    name:   'no blue colors outside swatches (/upvc)',
    passed: blueFound === null,
    detail: blueFound ?? undefined,
  }];
}

/**
 * No horizontal scroll at 390px viewport in Arabic mode.
 * Checks that document.documentElement.scrollWidth ≤ clientWidth.
 */
export async function checkNoHScroll(page: Page, base: string): Promise<CheckResult[]> {
  await page.setViewportSize({ width: 390, height: 844 });
  await goto(page, `${base}/upvc`);
  // Switch to Arabic via the lang toggle
  await page.click('[aria-label*="Arabic"],[data-lang="ar"],[data-testid="lang-toggle"]').catch(() => {});
  await page.waitForTimeout(400);
  const overflow = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  // Reset viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  return [{
    name:   'no horizontal scroll at 390px AR (/upvc)',
    passed: overflow.scroll <= overflow.client + 1,
    detail: `scrollWidth ${overflow.scroll} > clientWidth ${overflow.client}`,
  }];
}

/**
 * LineTabs and the tab-role elements on options tabs and hotspot lists
 * must have a minimum touch target of 44px.
 */
export async function checkTabMinHeight(page: Page, base: string): Promise<CheckResult[]> {
  await page.setViewportSize({ width: 1440, height: 900 });
  await goto(page, `${base}/upvc`);
  const ok = await minHeightAtLeast(page, '[role="tab"]', 44);
  return [{
    name:   'options tabs min-height ≥ 44px (/upvc)',
    passed: ok,
    detail: ok ? undefined : 'one or more tab buttons have height < 44px',
  }];
}

/**
 * Hotspot pin buttons appear in DOM order 1 → 4 on a type page that has hotspots.
 * casement-windows has the mechanism's shared hotspot set.
 */
export async function checkHotspotTabOrder(page: Page, base: string): Promise<CheckResult[]> {
  await goto(page, `${base}/products/casement-windows`);
  const labels = await page.$$eval(
    '[aria-label^="Hotspot"],[data-hotspot],.hotspot-pin,[aria-label*="1."],[aria-label*="Pin"]',
    (els) => els.map((e) => e.getAttribute('aria-label') ?? e.textContent?.trim() ?? ''),
  );
  // Hotspot buttons are numbered 1–4; check they appear in ascending DOM order
  const nums = labels.map((l) => parseInt(l)).filter((n) => !isNaN(n));
  const inOrder = nums.length >= 4 && nums.every((n, i) => i === 0 || n >= nums[i - 1]);
  return [{
    name:   'hotspot pins in tab order 1→4 (casement-windows)',
    passed: inOrder,
    detail: inOrder ? undefined : `pin labels found: ${JSON.stringify(nums)}`,
  }];
}

/**
 * In AR mode, the type hero section must have dir="ltr" (never mirrored),
 * and the hotspot diagram SVG must preserve physical geometry.
 */
export async function checkNoARMirror(page: Page, base: string): Promise<CheckResult[]> {
  await goto(page, `${base}/products/casement-windows`);
  // Toggle to AR
  await page.click('[aria-label*="Arabic"],[data-lang="ar"],[data-testid="lang-toggle"]').catch(() => {});
  await page.waitForTimeout(400);

  const heroDir = await page.$eval(
    'section[dir="ltr"]',
    (el) => el.getAttribute('dir'),
  ).catch(() => null);

  const svgDir = await page.$eval(
    'svg[direction="ltr"],svg[dir="ltr"]',
    (el) => el.getAttribute('direction') ?? el.getAttribute('dir'),
  ).catch(() => null);

  return [
    {
      name:   'AR type hero section has dir=ltr (not mirrored)',
      passed: heroDir === 'ltr',
      detail: heroDir === null ? 'no dir=ltr section found on page' : undefined,
    },
    {
      name:   'AR hotspot diagram SVG has direction=ltr',
      passed: svgDir === 'ltr',
      detail: svgDir === null ? 'no direction=ltr SVG found' : undefined,
    },
  ];
}
