'use client';

/**
 * components/layout/NavLabel.tsx
 * Both language strings stacked in one grid cell: the cell keeps the wider width, so
 * toggling EN↔AR never reflows the fixed-order header. Each span carries its own dir
 * so Arabic shapes and orders correctly inside the dir="ltr" header row.
 */

import { cn } from '@/lib/cn';
import type { Localized } from '@/lib/data/nav';

export default function NavLabel({ label, language }: { label: Localized; language: 'en' | 'ar' }) {
  return (
    <span className="inline-grid justify-items-center">
      {(['en', 'ar'] as const).map(l => (
        <span
          key={l}
          dir={l === 'ar' ? 'rtl' : 'ltr'}
          aria-hidden={language !== l}
          className={cn('col-start-1 row-start-1 whitespace-nowrap', language !== l && 'invisible')}
        >
          {label[l]}
        </span>
      ))}
    </span>
  );
}
