/**
 * components/catalog/pictograms — one opening pictogram per catalog mechanism.
 * 'unspecified' maps to null on purpose: no fallback icon, no guessed mechanism.
 */

import { createElement, type ComponentType, type ReactElement } from 'react';
import type { Mechanism } from '@/lib/data/catalog';
import type { DrawnMechanism } from '../types';
import type { PictogramProps } from './PictogramSvg';
import SlidingPictogram from './SlidingPictogram';
import CasementPictogram from './CasementPictogram';
import HingedDoorPictogram from './HingedDoorPictogram';
import FoldingPictogram from './FoldingPictogram';
import FixedPictogram from './FixedPictogram';

export type { PictogramProps };

// Record over DrawnMechanism: adding a mechanism to the catalog fails tsc until it is drawn
const PICTOGRAMS: Record<DrawnMechanism, ComponentType<PictogramProps>> = {
  'sliding': SlidingPictogram,
  'casement': CasementPictogram,
  'hinged-door': HingedDoorPictogram,
  'folding': FoldingPictogram,
  'fixed': FixedPictogram,
};

// Returns the element, not the component: a component picked during render trips
// react-hooks/static-components (it would remount on every render)
export function getPictogram(id: Mechanism | undefined, props: PictogramProps): ReactElement | null {
  return !id || id === 'unspecified' ? null : createElement(PICTOGRAMS[id], props);
}
