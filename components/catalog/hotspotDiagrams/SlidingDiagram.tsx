/**
 * Two-panel sliding elevation. Pins (hotspots.ts): lock 50,45 → interlock (200,135) ·
 * rollers 25,88 → left sash bottom rail (100,264) · double seal 82,20 → right glass top
 * edge (328,60) · fly-mesh 75,65 → right pane (300,195).
 */

import DiagramSvg, { DETAIL, GLASS, HARDWARE, HIDDEN, HIDDEN_DASH, OUTLINE, W_HARDWARE, W_OUTLINE } from './DiagramSvg';

// Each sash: outer x, glass x — sashes are 172 wide and overlap 12 units at the interlock
const SASHES = [{ x: 34, glass: 50 }, { x: 194, glass: 210 }];
// Tandem roller pairs — one per sash, centred under the rollers pin (25%) and its mirror (75%)
const ROLLER_X = [92, 108, 292, 308];
// Fly-mesh grid over the right pane, 10-unit pitch
const MESH_X = Array.from({ length: 13 }, (_, i) => 220 + i * 10);
const MESH_Y = Array.from({ length: 17 }, (_, i) => 70 + i * 10);

export default function SlidingDiagram({ label }: { label: string }) {
  return (
    <DiagramSvg label={label}>
      {/* ── Frame + sill track ────────────────────────────── */}
      <rect x="20" y="18" width="360" height="264" className={OUTLINE} strokeWidth={W_OUTLINE} />
      <path d="M34 275h332" className={DETAIL} />

      {/* ── Glass + double seal (glass edge + a line 4 units out) ─ */}
      {SASHES.map((s) => (
        <g key={s.x}>
          <rect x={s.glass} y="60" width="140" height="176" className={GLASS} />
          <rect x={s.glass - 4} y="56" width="148" height="184" className={DETAIL} />
        </g>
      ))}

      {/* ── Fly-mesh (right pane, own track) ──────────────── */}
      <g className={DETAIL} strokeWidth={0.75}>
        {MESH_X.map((x) => <path key={`v${x}`} d={`M${x} 60v176`} />)}
        {MESH_Y.map((y) => <path key={`h${y}`} d={`M210 ${y}h140`} />)}
      </g>

      {/* ── Sash profiles — right drawn last so it reads in front at the interlock ─ */}
      {SASHES.map((s) => (
        <rect key={s.x} x={s.x} y="32" width="172" height="236" className={OUTLINE} strokeWidth={W_OUTLINE} />
      ))}

      {/* ── Rollers (hidden in the bottom rail) ───────────── */}
      {ROLLER_X.map((x) => (
        <circle key={x} cx={x} cy="262" r="6" className={HIDDEN} strokeDasharray="3 2" />
      ))}
      <path d="M86 262h28M286 262h28" className={HIDDEN} strokeDasharray={HIDDEN_DASH} />

      {/* ── Sliding lock on the interlock ─────────────────── */}
      <rect x="195" y="121" width="10" height="28" className={HARDWARE} strokeWidth={W_HARDWARE} />
      <path d="M200 128v14" className={OUTLINE} strokeWidth={W_HARDWARE} />
    </DiagramSvg>
  );
}
