/**
 * Fixed glazing elevation. Pins (hotspots.ts): structural frame 15,20 → left member (60,60) ·
 * insulated glass unit 50,50 → pane centre (200,150) · EPDM gaskets 82,30 → gasket line at
 * the right glass edge (328,90) · thermal break 35,85 → twin polyamide strips in the bottom
 * member (140,255). Bottom member is deeper (42 vs 28) so the strip pair centres on y 255.
 */

import DiagramSvg, { DETAIL, HIDDEN, HIDDEN_DASH, OUTLINE, W_OUTLINE } from './DiagramSvg';

export default function FixedDiagram({ label }: { label: string }) {
  return (
    <DiagramSvg label={label}>
      {/* ── Frame ─────────────────────────────────────────── */}
      <rect x="40" y="24" width="320" height="252" className={OUTLINE} strokeWidth={W_OUTLINE} />

      {/* ── Thermal break: two polyamide strips along the member centres (hidden) ─ */}
      <rect x="51" y="35" width="298" height="223" className={HIDDEN} strokeDasharray={HIDDEN_DASH} />
      <rect x="57" y="41" width="286" height="211" className={HIDDEN} strokeDasharray={HIDDEN_DASH} />

      {/* ── Insulated glass unit: pane, gasket line, spacer bar ─ */}
      <rect x="68" y="52" width="264" height="182" className="fill-off-white stroke-ink-heading" strokeWidth={W_OUTLINE} />
      <rect x="72" y="56" width="256" height="174" className={HIDDEN} />
      <rect x="80" y="64" width="240" height="158" className={DETAIL} />
    </DiagramSvg>
  );
}
