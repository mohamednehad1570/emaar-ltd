/**
 * components/catalog/hotspotDiagrams — one elevation per catalog mechanism, drawn to the
 * pins in lib/data/catalog/hotspots.ts (move a pin there → redraw here, never the reverse).
 * 'unspecified' has no hotspots and no drawing.
 */

import { createElement, type ComponentType, type ReactElement } from 'react';
import type { DrawnMechanism } from '../types';
import SlidingDiagram from './SlidingDiagram';
import CasementDiagram from './CasementDiagram';
import HingedDoorDiagram from './HingedDoorDiagram';
import FoldingDiagram from './FoldingDiagram';
import FixedDiagram from './FixedDiagram';

export interface DiagramProps {
  label: string;
}

// Record over DrawnMechanism: a new catalog mechanism fails tsc until it is drawn
const DIAGRAMS: Record<DrawnMechanism, ComponentType<DiagramProps>> = {
  'sliding': SlidingDiagram,
  'casement': CasementDiagram,
  'hinged-door': HingedDoorDiagram,
  'folding': FoldingDiagram,
  'fixed': FixedDiagram,
};

// Element, not component — see getPictogram (react-hooks/static-components)
export function getDiagram(id: DrawnMechanism | undefined, props: DiagramProps): ReactElement | null {
  return id ? createElement(DIAGRAMS[id], props) : null;
}
