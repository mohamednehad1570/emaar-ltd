/**
 * Side-hung casement: frame, sash, glass, handle on the right stile.
 * Indicator = dashed lines from the handle-side corners meeting at the hinge side (left).
 */

import PictogramSvg, { GLASS, INDICATOR, SWING_DASH, type PictogramProps } from './PictogramSvg';

export default function CasementPictogram(props: PictogramProps) {
  return (
    <PictogramSvg {...props}>
      {/* ── Frame + sash ──────────────────────────────────── */}
      <rect x="10" y="8" width="44" height="48" />
      <rect x="14" y="12" width="36" height="40" className={GLASS} />
      {/* ── Handle (right stile, mid-height) ──────────────── */}
      <path d="M46 29v8" />
      {/* ── Opening indicator: apex on the hinge side ─────── */}
      <path d="M50 12 14 32 50 52" strokeDasharray={SWING_DASH} className={INDICATOR} />
    </PictogramSvg>
  );
}
