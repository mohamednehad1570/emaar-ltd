/**
 * Tilt & turn (variant of 'casement'), European convention: two dashed triangles in one sash.
 * Turn = side-hung, apex on the left (hinge) stile; tilt = bottom-hinged, apex on the bottom rail.
 * Handle on the right stile, as on the plain casement.
 */

import PictogramSvg, { INDICATOR, SWING_DASH, type PictogramProps } from './PictogramSvg';
import { CasementSash, SIDE_HANDLE } from './CasementPictogram';

export default function TiltTurnPictogram(props: PictogramProps) {
  return (
    <PictogramSvg {...props}>
      {/* ── Frame + sash ──────────────────────────────────── */}
      <CasementSash />
      {/* ── Handle (right stile, mid-height) ──────────────── */}
      <path d={SIDE_HANDLE} />
      {/* ── Turn indicator: apex on the hinge side ────────── */}
      <path d="M50 12 14 32 50 52" strokeDasharray={SWING_DASH} className={INDICATOR} />
      {/* ── Tilt indicator: apex on the bottom (tilt hinge) ─ */}
      <path d="M14 12 32 52 50 12" strokeDasharray={SWING_DASH} className={INDICATOR} />
    </PictogramSvg>
  );
}
