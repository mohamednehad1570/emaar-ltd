/**
 * Side-hung casement: frame, sash, glass, handle on the right stile.
 * Indicator = dashed lines from the handle-side corners meeting at the hinge side (left).
 */

import PictogramSvg, { GLASS, INDICATOR, SWING_DASH, type PictogramProps } from './PictogramSvg';

/** Frame + glazed sash shared by every casement-family symbol (casement, top-hung, tilt-turn). */
export function CasementSash() {
  return (
    <>
      <rect x="10" y="8" width="44" height="48" />
      <rect x="14" y="12" width="36" height="40" className={GLASS} />
    </>
  );
}

// Handle on the right stile, mid-height — the lock side for side-hung and tilt-turn
export const SIDE_HANDLE = 'M46 29v8';

export default function CasementPictogram(props: PictogramProps) {
  return (
    <PictogramSvg {...props}>
      {/* ── Frame + sash ──────────────────────────────────── */}
      <CasementSash />
      {/* ── Handle (right stile, mid-height) ──────────────── */}
      <path d={SIDE_HANDLE} />
      {/* ── Opening indicator: apex on the hinge side ─────── */}
      <path d="M50 12 14 32 50 52" strokeDasharray={SWING_DASH} className={INDICATOR} />
    </PictogramSvg>
  );
}
