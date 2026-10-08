/**
 * Fixed glazing: frame + glass, no sash. European drafting draws no opening indicator
 * for a fixed light, so this is the one pictogram without red — the absence is the signal.
 */

import PictogramSvg, { GLASS, type PictogramProps } from './PictogramSvg';

export default function FixedPictogram(props: PictogramProps) {
  return (
    <PictogramSvg {...props}>
      {/* ── Frame ─────────────────────────────────────────── */}
      <rect x="10" y="8" width="44" height="48" />
      {/* ── Glass, held directly in the frame ─────────────── */}
      <rect x="14" y="12" width="36" height="40" className={GLASS} />
    </PictogramSvg>
  );
}
