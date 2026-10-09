/**
 * Lift & slide (variant of 'sliding'): the moving sash lifts off its seals, then slides.
 * Indicator = the sliding arrow (raised to y 27) plus a short up-arrow below it, both on
 * the moving (right) sash.
 */

import PictogramSvg, { INDICATOR, type PictogramProps } from './PictogramSvg';
import { SlidingSashes, slideArrow } from './SlidingPictogram';

export default function LiftSlidePictogram(props: PictogramProps) {
  return (
    <PictogramSvg {...props}>
      {/* ── Frame + sashes ────────────────────────────────── */}
      <SlidingSashes />
      {/* ── Slide arrow: right sash slides left ───────────── */}
      <path d={slideArrow(27)} className={INDICATOR} />
      {/* ── Lift mark: up-arrow centred on the moving sash (x 43) ─ */}
      <path d="M43 45v-9m-3.5 3.5L43 36l3.5 3.5" className={INDICATOR} />
    </PictogramSvg>
  );
}
