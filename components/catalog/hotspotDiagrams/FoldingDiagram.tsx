/**
 * Four-panel folding door, closed. Pins (hotspots.ts): multi-panel fold 30,45 → fold hinge on
 * the 1|2 joint (120,135) · track 55,90 → sill track (220,270) · double seal 80,18 → panel 4
 * glass top edge (320,54) · full-width opening 70,60 → the 3|4 joint (280,180).
 * Panels are 80 wide from x 40, which puts joints exactly at 30% / 50% / 70%.
 */

import DiagramSvg, { DETAIL, GLASS, HARDWARE, OUTLINE, W_HARDWARE, W_OUTLINE } from './DiagramSvg';

const PANEL_X = [40, 120, 200, 280];
const JOINT_X = [120, 200, 280];
// Fold-hinge knuckles centred at y 70 / 135 / 200 on every joint
const KNUCKLE_Y = [60, 125, 190];

export default function FoldingDiagram({ label }: { label: string }) {
  return (
    <DiagramSvg label={label}>
      {/* ── Frame + sill track channel ────────────────────── */}
      <rect x="24" y="18" width="352" height="260" className={OUTLINE} strokeWidth={W_OUTLINE} />
      <rect x="40" y="266" width="320" height="8" className={OUTLINE} strokeWidth={W_HARDWARE} />

      {/* ── Panels: glass, double seal (glass edge + line 4 out), profile ─ */}
      {PANEL_X.map((x) => (
        <g key={x}>
          <rect x={x + 14} y="54" width="52" height="176" className={GLASS} />
          <rect x={x + 10} y="50" width="60" height="184" className={DETAIL} />
          <rect x={x} y="34" width="80" height="228" className={OUTLINE} strokeWidth={W_OUTLINE} />
        </g>
      ))}

      {/* ── Fold hinges on each panel joint ───────────────── */}
      {JOINT_X.flatMap((x) => KNUCKLE_Y.map((y) => (
        <rect key={`${x}-${y}`} x={x - 4} y={y} width="8" height="20" className={HARDWARE} strokeWidth={W_HARDWARE} />
      )))}
    </DiagramSvg>
  );
}
