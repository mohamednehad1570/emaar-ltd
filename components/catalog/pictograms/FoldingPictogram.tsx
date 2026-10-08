/**
 * Folding (bi-fold): frame + four glazed panels hinged to each other.
 * Indicator = the fold zig-zag, one vertex per panel joint.
 */

import PictogramSvg, { GLASS, INDICATOR, type PictogramProps } from './PictogramSvg';

// Four 13-unit panels inside the frame, left to right
const PANEL_X = [6, 19, 32, 45];

export default function FoldingPictogram(props: PictogramProps) {
  return (
    <PictogramSvg {...props}>
      {/* ── Frame + panels ────────────────────────────────── */}
      <rect x="4" y="12" width="56" height="40" />
      {PANEL_X.map((x) => (
        <rect key={x} x={x} y="14" width="13" height="36" className={GLASS} />
      ))}
      {/* ── Opening indicator: low at each joint, high mid-panel ─ */}
      <path d="M6 36l6.5-8 6.5 8 6.5-8 6.5 8 6.5-8 6.5 8 6.5-8 6.5 8" className={INDICATOR} />
    </PictogramSvg>
  );
}
