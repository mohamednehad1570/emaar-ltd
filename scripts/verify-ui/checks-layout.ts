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
  const results: CheckResult[] = [];
  for (const path of ['/upvc', '/ar/upvc']) {
    await goto(page, `${base}${path}`);
    // page.evaluate stringifies the callback — avoid named inner functions so that
    // esbuild's __name() helper is never inserted (it is undefined in the browser).
    const blueFound = await page.evaluate(`(function() {
      var els = Array.from(document.querySelectorAll('*')).slice(0, 400);
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.closest('[data-swatch],[data-color-option]')) continue;
        var st = getComputedStyle(el);
        var props = ['color', 'backgroundColor', 'borderColor'];
        for (var j = 0; j < props.length; j++) {
          var val = st.getPropertyValue(props[j]);
          var m = val.match(/rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)/);
          if (!m) continue;
          var r = +m[1]/255, g = +m[2]/255, b = +m[3]/255;
          var max = Math.max(r,g,b), min = Math.min(r,g,b);
          if (max === min) continue;
          var d = max - min;
          var hh = max===r ? (g-b)/d+(g<b?6:0) : max===g ? (b-r)/d+2 : (r-g)/d+4;
          var hDeg = (hh/6)*360;
          if (hDeg >= 200 && hDeg <= 260) {
            var nums = val.match(/\\d+/g).map(Number);
            if (nums.length >= 3 && Math.max.apply(null,nums) - Math.min.apply(null,nums) > 40)
              return el.tagName + '.' + String(el.className).slice(0, 60);
          }
        }
      }
      return null;
    })()`);
    // A string-form evaluate is typed `unknown` — narrow it instead of asserting:
    // the script returns either the offending element's tag/class string or null.
    const offender = typeof blueFound === 'string' ? blueFound : null;
    results.push({
      name:   `no blue colors outside swatches (${path})`,
      passed: blueFound === null,
      detail: offender ?? (blueFound === null ? undefined : `unexpected result: ${String(blueFound)}`),
    });
  }
  return results;
}

/**
 * No horizontal scroll at 390px viewport in Arabic (/ar/upvc loaded directly).
 * Checks that document.documentElement.scrollWidth ≤ clientWidth.
 */
export async function checkNoHScroll(page: Page, base: string): Promise<CheckResult[]> {
  await page.setViewportSize({ width: 390, height: 844 });
  await goto(page, `${base}/ar/upvc`);
  const overflow = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  // Reset viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  return [{
    name:   'no horizontal scroll at 390px AR (/ar/upvc)',
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
 * single-sash-windows is a casement-mechanism type with the shared 4-pin hotspot set.
 * Pins use aria-label="n. label" + aria-pressed — both attributes on the same button.
 */
export async function checkHotspotTabOrder(page: Page, base: string): Promise<CheckResult[]> {
  await goto(page, `${base}/products/single-sash-windows`);
  const labels = await page.$$eval(
    'button[aria-label][aria-pressed]',
    (els) => els.map((e) => e.getAttribute('aria-label') ?? ''),
  );
  // Hotspot buttons are numbered 1–4; aria-label starts with "n. label text"
  const nums = labels.map((l) => parseInt(l)).filter((n) => !isNaN(n));
  const inOrder = nums.length >= 4 && nums.every((n, i) => i === 0 || n >= nums[i - 1]);
  return [{
    name:   'hotspot pins in tab order 1→4 (single-sash-windows)',
    passed: inOrder,
    detail: inOrder ? undefined : `pin labels found: ${JSON.stringify(nums)}`,
  }];
}

/**
 * In AR mode, the type hero section must have dir="ltr" (never mirrored),
 * and the hotspot diagram SVG must preserve physical geometry.
 * single-sash-windows: valid casement slug with a real CasementDiagram SVG.
 */
export async function checkNoARMirror(page: Page, base: string): Promise<CheckResult[]> {
  // Arabic URL loaded directly — the server already renders dir=rtl on <html>
  await goto(page, `${base}/ar/products/single-sash-windows`);

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
