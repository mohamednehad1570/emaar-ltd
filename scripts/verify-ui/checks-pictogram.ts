/**
 * scripts/verify-ui/checks-pictogram.ts
 * (e) Top-hung pictogram: the opening indicator's apex sits at the top (hinge) edge.
 */

import type { Page } from 'playwright';
import type { CheckResult } from './runner';
import { goto } from './runner';

// ── (e) Top-hung pictogram ────────────────────────────────────────────────────

/**
 * On /products/top-hung-windows, the opening indicator (stroke-brand-red dashed path)
 * must form a triangle whose APEX is near the TOP edge of the 64px viewBox.
 * European drafting convention: dashed lines from the free corners (bottom) meet at
 * the hinge side (top), so the apex y-coordinate must be < 20 (viewBox 0–64).
 * Free-edge vertices must have y > 40.
 *
 * The path is: M14 52 32 12 50 52  →  points = [14,52], [32,12], [50,52]
 * Apex = the vertex with the smallest y value.
 */
export async function checkTopHungPictogram(page: Page, base: string): Promise<CheckResult[]> {
  await goto(page, `${base}/products/top-hung-windows`);

  // The indicator SVG path is the only dashed stroke-brand-red path on the page
  // (PictogramSvg renders it inside the 64px SVG on TypeIntro's 56px pictogram slot)
  const pathD = await page.$eval(
    // data-testid is not used — select by class; there is only one indicator per page
    // data-rtl-mirror marks every pictogram/diagram SVG; on this EN page it is unflipped
    'svg[data-rtl-mirror] path[stroke-dasharray]',
    (el) => el.getAttribute('d') ?? '',
  ).catch(() => '');

  if (!pathD) {
    return [{
      name:   'top-hung pictogram: indicator path found',
      passed: false,
      detail: 'no stroke-dasharray path found inside a pictogram SVG — pictogram may not be rendered',
    }];
  }

  // Parse simple SVG path: "M14 52 32 12 50 52" → [[14,52],[32,12],[50,52]]
  // Handles optional 'L' commands and both space / comma separators
  const nums = pathD.replace(/[MmLlZz]/g, ' ').trim().split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
  // Group into [x, y] pairs
  const points: [number, number][] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) points.push([nums[i], nums[i + 1]]);

  const results: CheckResult[] = [];

  results.push({
    name:   `top-hung pictogram: indicator coordinates (d="${pathD}")`,
    // This entry is always informational — it reports the coordinates
    passed: true,
    detail: points.map(([x, y]) => `(${x},${y})`).join(' → '),
  });

  if (points.length < 3) {
    results.push({
      name:   'top-hung pictogram: apex at top edge (y < 20)',
      passed: false,
      detail: `expected ≥3 coordinate pairs, got ${points.length}`,
    });
    return results;
  }

  // The apex is the point with the minimum y (nearest the top edge in SVG coords)
  const apexIdx = points.reduce((mi, [, y], i, a) => (y < a[mi][1] ? i : mi), 0);
  const [apexX, apexY] = points[apexIdx];
  // All non-apex points are the free (bottom) edge — must be near the bottom
  const freePoints = points.filter((_, i) => i !== apexIdx);
  const freeNearBottom = freePoints.every(([, y]) => y > 40);

  results.push({
    name:   'top-hung pictogram: apex at top edge (y < 20)',
    passed: apexY < 20,
    detail: `apex=(${apexX},${apexY}); free-edge points=${freePoints.map(([x, y]) => `(${x},${y})`).join(', ')}`,
  });

  results.push({
    name:   'top-hung pictogram: free-edge points near bottom (y > 40)',
    passed: freeNearBottom,
    detail: freeNearBottom ? undefined : `free-edge points not near bottom: ${freePoints.map(([x, y]) => `(${x},${y})`).join(', ')}`,
  });

  return results;
}
