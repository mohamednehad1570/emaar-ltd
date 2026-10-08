'use client';

/**
 * components/catalog/type/HotspotFigure.tsx
 * The 4:3 diagram box + its pins. Drawing precedence: a real diagram file
 * (MECHANISM_DIAGRAMS) → the mechanism's SVG elevation → cream ImageSlot placeholder.
 * Pins render after the drawing in the same dir=ltr box, so their DOM / tab order,
 * events and focus styles are exactly what TypeHotspots had before the drawings landed.
 */

import { useTranslation } from '@/contexts/LanguageContext';
import { TYPE_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import ImageSlot from '@/components/ui/ImageSlot';
import type { Hotspot } from '@/lib/data/catalog';
import type { DrawnMechanism } from '../types';
import { getDiagram } from '../hotspotDiagrams';
import HotspotPin from './HotspotPin';

interface HotspotFigureProps {
  hotspots: Hotspot[];
  diagramImage: string | null;
  diagramMechanism?: DrawnMechanism;
  typeName: string;
  active: number | null;
  detailId: (n: number) => string;
  onActivate: (n: number, fromTap: boolean) => void;
}

export default function HotspotFigure({
  hotspots, diagramImage, diagramMechanism, typeName, active, detailId, onActivate,
}: HotspotFigureProps) {
  const t = useTranslation();
  // A real file wins over the drawing, so a client diagram can replace it with no code change
  const diagram = diagramImage || !diagramMechanism ? null : getDiagram(diagramMechanism, {
    label: t(COPY.diagramLabels[diagramMechanism].en, COPY.diagramLabels[diagramMechanism].ar),
  });

  return (
    // dir=ltr: pin x/y and the drawing are physical and must not mirror in Arabic
    <div dir="ltr" className="relative">
      {diagram ? (
        // outline (not border) keeps the SVG box identical to the pin box — no 1px offset
        <div className="relative aspect-4/3 rounded-card bg-surface-white outline outline-border-light -outline-offset-1">
          {diagram}
        </div>
      ) : (
        <ImageSlot
          src={diagramImage}
          alt={`${typeName} — ${t(COPY.diagramAlt.en, COPY.diagramAlt.ar)}`}
          ratio="4/3"
          className="rounded-card"
          sizes="(min-width:768px) 60vw, 100vw"
        />
      )}
      {hotspots.map((p) => (
        <HotspotPin
          key={p.n}
          point={p}
          label={t(p.label.en, p.label.ar)}
          active={active === p.n}
          detailId={detailId(p.n)}
          onActivate={onActivate}
        />
      ))}
    </div>
  );
}
