/**
 * components/catalog/type/MaterialSwatch.tsx
 * 12px material chip shared by the hero legend and the specs column headers.
 * Aluminum = brushed-silver gradient from silver tokens only (no blue swatch exception here).
 */

import type { MaterialId } from '@/lib/data/catalog';
import { cn } from '@/lib/cn';

const SWATCH: Record<MaterialId, string> = {
  // White profile needs border-medium or it vanishes on the white legend plate
  upvc: 'bg-white',
  // 135° white → silver → warm border-medium reads as a brushed-metal sheen at 12px
  aluminum: 'bg-linear-135 from-white via-silver-material to-border-medium',
};

export default function MaterialSwatch({ id, className }: { id: MaterialId; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block size-3 shrink-0 border border-border-medium', SWATCH[id], className)}
    />
  );
}
