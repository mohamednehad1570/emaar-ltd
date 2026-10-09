/**
 * Top-hung casement (variant of 'casement'): hinge line along the top rail, so the sash
 * swings out from the bottom. Indicator = dashed lines from the bottom corners meeting at
 * the middle of the top edge (European drafting: apex on the hinge side). Handle on the bottom rail.
 */

import PictogramSvg, { INDICATOR, SWING_DASH, type PictogramProps } from './PictogramSvg';
import { CasementSash } from './CasementPictogram';

export default function TopHungPictogram(props: PictogramProps) {
  return (
    <PictogramSvg {...props}>
      {/* ── Frame + sash ──────────────────────────────────── */}
      <CasementSash />
      {/* ── Handle (bottom rail, centred — the free edge) ─── */}
      <path d="M28 48h8" />
      {/* ── Opening indicator: apex on the top (hinge) edge ── */}
      <path d="M14 52 32 12 50 52" strokeDasharray={SWING_DASH} className={INDICATOR} />
    </PictogramSvg>
  );
}
