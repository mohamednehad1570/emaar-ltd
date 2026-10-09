/**
 * Tilt & slide (variant of 'sliding'): the moving sash tilts in from a bottom hinge for
 * ventilation, or slides. Indicator = the sliding arrow plus a dashed tilt triangle on the
 * moving (right) sash — top corners meeting at the bottom rail (apex on the hinge side).
 */

import PictogramSvg, { INDICATOR, SWING_DASH, type PictogramProps } from './PictogramSvg';
import { SlidingSashes, slideArrow } from './SlidingPictogram';

export default function TiltSlidePictogram(props: PictogramProps) {
  return (
    <PictogramSvg {...props}>
      {/* ── Frame + sashes ────────────────────────────────── */}
      <SlidingSashes />
      {/* ── Tilt indicator: apex on the moving sash's bottom rail ─ */}
      <path d="M31 15 43 49 55 15" strokeDasharray={SWING_DASH} className={INDICATOR} />
      {/* ── Slide arrow: right sash slides left ───────────── */}
      <path d={slideArrow(32)} className={INDICATOR} />
    </PictogramSvg>
  );
}
