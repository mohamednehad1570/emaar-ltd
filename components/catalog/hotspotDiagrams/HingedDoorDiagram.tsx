/**
 * Hinged door elevation — a tall leaf, 120×240 units (1:2), centred in the 400×300 box.
 * Pins (hotspots.ts): multi-point lock 62,50 → lock plate on the latch stile (248,150) ·
 * hinges 35,30 → top hinge on the leaf's hinge edge (140,90) · threshold 50,92 → (200,276) ·
 * closer 52,11 → closer body over the leaf's top rail (208,33).
 */

import DiagramSvg, { DETAIL, GLASS, HARDWARE, HIDDEN, HIDDEN_DASH, OUTLINE, W_HARDWARE, W_OUTLINE } from './DiagramSvg';

// Hinge barrels at 25 / 50 / 75 % of the leaf height (centres 90 / 150 / 210; 24 tall)
const HINGE_Y = [78, 138, 198];
// Frame keepers for the multi-point lock — top, centre (level with the lock), bottom (centres 60 / 150 / 240)
const KEEPER_Y = [54, 144, 234];

export default function HingedDoorDiagram({ label }: { label: string }) {
  return (
    <DiagramSvg label={label}>
      {/* ── Frame (open at the foot) + profile detail ─────── */}
      <path d="M124 270V14h152v256" className={OUTLINE} strokeWidth={W_OUTLINE} />
      <path d="M132 270V22h136v248" className={DETAIL} />

      {/* ── Threshold ─────────────────────────────────────── */}
      <rect x="124" y="270" width="152" height="12" className={OUTLINE} strokeWidth={W_OUTLINE} />
      <path d="M128 276h144" className={DETAIL} />

      {/* ── Leaf + glazed panel (upper half, clear of the lock) ─ */}
      <rect x="164" y="60" width="72" height="68" className={GLASS} />
      <rect x="140" y="30" width="120" height="240" className={OUTLINE} strokeWidth={W_OUTLINE} />

      {/* ── Multi-point lock: hidden gear bar + frame keepers ─ */}
      <path d="M256 56v190" className={HIDDEN} strokeDasharray={HIDDEN_DASH} />
      {KEEPER_Y.map((y) => (
        <rect key={y} x="262" y={y} width="8" height="12" className={HARDWARE} strokeWidth={W_HARDWARE} />
      ))}

      {/* ── Lever handle + lock plate + cylinder ──────────── */}
      <path d="M248 150h-26" className={OUTLINE} strokeWidth={W_OUTLINE} />
      <rect x="242" y="138" width="12" height="46" className={HARDWARE} strokeWidth={W_HARDWARE} />
      <circle cx="248" cy="174" r="3" className={OUTLINE} strokeWidth={W_HARDWARE} />

      {/* ── Hinges (straddle the leaf/frame joint at x 140) ── */}
      {HINGE_Y.map((y) => (
        <rect key={y} x="134" y={y} width="12" height="24" className={HARDWARE} strokeWidth={W_HARDWARE} />
      ))}

      {/* ── Door closer: shoe on the head, arm, body over the leaf's top rail ─ */}
      <rect x="154" y="19" width="10" height="8" className={HARDWARE} strokeWidth={W_HARDWARE} />
      <path d="M164 23h16" className={OUTLINE} strokeWidth={W_HARDWARE} />
      <rect x="180" y="23" width="56" height="20" className={HARDWARE} strokeWidth={W_HARDWARE} />
    </DiagramSvg>
  );
}
