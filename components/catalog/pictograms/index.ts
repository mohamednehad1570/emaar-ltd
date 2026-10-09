/**
 * components/catalog/pictograms — one opening pictogram per catalog mechanism, plus the
 * type-specific variants (top-hung, tilt-turn, lift-slide, tilt-slide) that refine one.
 * 'unspecified' has no entry on purpose: no fallback icon, no guessed mechanism.
 */

import { createElement, type ComponentType, type ReactElement } from 'react';
import type { PictogramId } from '../types';
import type { PictogramProps } from './PictogramSvg';
import SlidingPictogram from './SlidingPictogram';
import CasementPictogram from './CasementPictogram';
import HingedDoorPictogram from './HingedDoorPictogram';
import FoldingPictogram from './FoldingPictogram';
import FixedPictogram from './FixedPictogram';
import TopHungPictogram from './TopHungPictogram';
import TiltTurnPictogram from './TiltTurnPictogram';
import LiftSlidePictogram from './LiftSlidePictogram';
import TiltSlidePictogram from './TiltSlidePictogram';

export type { PictogramProps };

// Record over PictogramId: a new catalog mechanism or variant fails tsc until it is drawn
const PICTOGRAMS: Record<PictogramId, ComponentType<PictogramProps>> = {
  'sliding': SlidingPictogram,
  'casement': CasementPictogram,
  'hinged-door': HingedDoorPictogram,
  'folding': FoldingPictogram,
  'fixed': FixedPictogram,
  'top-hung': TopHungPictogram,
  'tilt-turn': TiltTurnPictogram,
  'lift-slide': LiftSlidePictogram,
  'tilt-slide': TiltSlidePictogram,
};

// Returns the element, not the component: a component picked during render trips
// react-hooks/static-components (it would remount on every render)
export function getPictogram(id: PictogramId, props: PictogramProps): ReactElement {
  return createElement(PICTOGRAMS[id], props);
}
