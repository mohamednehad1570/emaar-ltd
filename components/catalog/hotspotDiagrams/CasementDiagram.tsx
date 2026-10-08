/**
 * Side-hung casement elevation. Pins (hotspots.ts): handle 78,50 → right stile (312,150) ·
 * hinges 20,25 → frame/sash joint, top hinge (80,75) · double seal 50,12 → twin seal lines
 * just inside the sash edge (200,36) · steel 30,80 → hidden steel in the bottom rail (120,240).
 * Locking points are drawn because the handle hotspot names them ("drives the locking points").
 */

import DiagramSvg, { DETAIL, GLASS, HARDWARE, HIDDEN, HIDDEN_DASH, OUTLINE, W_HARDWARE, W_OUTLINE } from './DiagramSvg';

// Hinge knuckles centred on the pin (y 75) and its mirror from the bottom (y 225)
const HINGE_Y = [63, 213];
// Frame keepers the locking points engage: [x, y, w, h] in the 16-unit frame band
const KEEPERS: [number, number, number, number][] = [
  [320, 70, 8, 16], [320, 214, 8, 16], [252, 23, 16, 8], [252, 269, 16, 8],
];

export default function CasementDiagram({ label }: { label: string }) {
  return (
    <DiagramSvg label={label}>
      {/* ── Frame (no inner detail line — it would blur the seal pair beside it) ─ */}
      <rect x="64" y="15" width="272" height="270" className={OUTLINE} strokeWidth={W_OUTLINE} />

      {/* ── Glass (sash members: 24 stiles, 28 top rail, 49 bottom rail) ─ */}
      <rect x="104" y="59" width="192" height="161" className={GLASS} />

      {/* ── Double seal: two lines 3 and 6 units inside the sash edge ─ */}
      <rect x="83" y="34" width="234" height="232" className={DETAIL} />
      <rect x="86" y="37" width="228" height="226" className={DETAIL} />

      {/* ── Steel reinforcement (hidden, along the profile centre) ─ */}
      <rect x="92" y="46" width="216" height="194" className={HIDDEN} strokeDasharray={HIDDEN_DASH} />

      {/* ── Sash ──────────────────────────────────────────── */}
      <rect x="80" y="31" width="240" height="238" className={OUTLINE} strokeWidth={W_OUTLINE} />

      {/* ── Hardware: keepers, hinges, handle ─────────────── */}
      {KEEPERS.map(([x, y, w, h]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} className={HARDWARE} strokeWidth={W_HARDWARE} />
      ))}
      {HINGE_Y.map((y) => (
        <rect key={y} x="76" y={y} width="8" height="24" className={HARDWARE} strokeWidth={W_HARDWARE} />
      ))}
      {/* Lever hangs down (closed position); escutcheon drawn last so it caps the lever */}
      <path d="M312 156v40" className={OUTLINE} strokeWidth={W_OUTLINE} />
      <rect x="306" y="140" width="12" height="20" className={HARDWARE} strokeWidth={W_HARDWARE} />
    </DiagramSvg>
  );
}
