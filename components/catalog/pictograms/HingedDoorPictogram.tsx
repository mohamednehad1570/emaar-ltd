/**
 * Hinged door: frame, leaf with a glazed panel, lever handle, threshold.
 * Indicator = dashed lines from the lock-side corners meeting at the hinge side (left).
 */

import PictogramSvg, { GLASS, INDICATOR, SWING_DASH, type PictogramProps } from './PictogramSvg';

export default function HingedDoorPictogram(props: PictogramProps) {
  return (
    <PictogramSvg {...props}>
      {/* ── Frame (open at the foot) + threshold ─────────── */}
      <path d="M16 58V6h32v52" />
      <path d="M13 58h38" />
      {/* ── Leaf + glazed panel ───────────────────────────── */}
      <rect x="19" y="9" width="26" height="49" />
      <rect x="23" y="13" width="18" height="24" className={GLASS} />
      {/* ── Lever handle (lock stile) ─────────────────────── */}
      <path d="M42 34h-4" />
      {/* ── Opening indicator: apex on the hinge side ─────── */}
      <path d="M45 9 19 33.5 45 58" strokeDasharray={SWING_DASH} className={INDICATOR} />
    </PictogramSvg>
  );
}
