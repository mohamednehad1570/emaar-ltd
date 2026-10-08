/**
 * Hinged door elevation. Pins (hotspots.ts): multi-point lock 72,52 → lock plate (288,156) ·
 * hinges 22,30 → top hinge on the frame/leaf joint (88,90) · threshold 50,92 → (200,276) ·
 * closer 60,10 → closer body on the head (240,30).
 * Note: the pins fix the leaf at ~224×242 units, so the door reads wider than a typical leaf.
 */

import DiagramSvg, { DETAIL, GLASS, HARDWARE, HIDDEN, HIDDEN_DASH, OUTLINE, W_HARDWARE, W_OUTLINE } from './DiagramSvg';

// Three hinge barrels, 75 apart from the pinned top hinge (centres 90 / 165 / 240)
const HINGE_Y = [78, 153, 228];
// Frame keepers for the multi-point lock — top, centre (at the lock), bottom
const KEEPER_Y = [52, 150, 248];

export default function HingedDoorDiagram({ label }: { label: string }) {
  return (
    <DiagramSvg label={label}>
      {/* ── Frame (open at the foot) + profile detail ─────── */}
      <path d="M72 270V12h256v258" className={OUTLINE} strokeWidth={W_OUTLINE} />
      <path d="M80 270V20h240v250" className={DETAIL} />

      {/* ── Threshold ─────────────────────────────────────── */}
      <rect x="72" y="270" width="256" height="12" className={OUTLINE} strokeWidth={W_OUTLINE} />
      <path d="M76 276h248" className={DETAIL} />

      {/* ── Leaf + glazed panel ───────────────────────────── */}
      <rect x="136" y="76" width="128" height="114" className={GLASS} />
      <rect x="88" y="28" width="224" height="242" className={OUTLINE} strokeWidth={W_OUTLINE} />

      {/* ── Multi-point lock: hidden gear bar + frame keepers ─ */}
      <path d="M306 56v200" className={HIDDEN} strokeDasharray={HIDDEN_DASH} />
      {KEEPER_Y.map((y) => (
        <rect key={y} x="312" y={y} width="8" height="12" className={HARDWARE} strokeWidth={W_HARDWARE} />
      ))}

      {/* ── Lever handle + lock plate + cylinder ──────────── */}
      <path d="M288 150h-30" className={OUTLINE} strokeWidth={W_OUTLINE} />
      <rect x="282" y="138" width="12" height="46" className={HARDWARE} strokeWidth={W_HARDWARE} />
      <circle cx="288" cy="174" r="3" className={OUTLINE} strokeWidth={W_HARDWARE} />

      {/* ── Hinges ────────────────────────────────────────── */}
      {HINGE_Y.map((y) => (
        <rect key={y} x="82" y={y} width="12" height="24" className={HARDWARE} strokeWidth={W_HARDWARE} />
      ))}

      {/* ── Door closer: shoe + arm on the head, body over the leaf top ─ */}
      <path d="M178 20h30" className={OUTLINE} strokeWidth={W_HARDWARE} />
      <rect x="168" y="16" width="10" height="8" className={HARDWARE} strokeWidth={W_HARDWARE} />
      <rect x="208" y="22" width="64" height="16" className={HARDWARE} strokeWidth={W_HARDWARE} />
    </DiagramSvg>
  );
}
