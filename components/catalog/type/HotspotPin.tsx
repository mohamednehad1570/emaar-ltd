'use client';

/**
 * components/catalog/type/HotspotPin.tsx
 * One numbered pin on the feature diagram. Visible dot is 24px; the button itself is
 * 44px so the touch target meets the minimum without enlarging the marker.
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import type { Hotspot } from '@/lib/data/catalog';

interface HotspotPinProps {
  point: Hotspot;
  label: string;
  active: boolean;
  detailId: string;
  onActivate: (n: number, fromTap: boolean) => void;
}

export default function HotspotPin({ point, label, active, detailId, onActivate }: HotspotPinProps) {
  return (
    <button
      type="button"
      aria-label={`${point.n}. ${label}`}
      aria-describedby={detailId}
      aria-pressed={active}
      onMouseEnter={() => onActivate(point.n, false)}
      onFocus={() => onActivate(point.n, false)}
      onClick={() => onActivate(point.n, true)}
      // Physical left/top % — pins never mirror in Arabic; translate centres the 44px box on the point
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
      className="absolute size-11 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-brand-red"
    >
      {/* ── Pulse ring ─────────────────────────────────────── */}
      {/* Remounts on each activation (key) so the ring pulses exactly once per highlight */}
      {active && (
        <motion.span
          key={`ring-${point.n}`}
          aria-hidden="true"
          className="absolute size-6 rounded-full bg-brand-red/30"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 2, opacity: 0 }}
          // 0.7s — long enough to read as a pulse, short enough not to linger
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      )}

      {/* ── Dot ────────────────────────────────────────────── */}
      <motion.span
        aria-hidden="true"
        animate={{ scale: active ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        className={cn(
          'relative size-6 rounded-full border flex items-center justify-center text-xs font-bold shadow-warm-sm',
          active ? 'bg-brand-red border-brand-red text-white' : 'bg-white border-border-medium text-ink-heading',
        )}
      >
        {point.n}
      </motion.span>
    </button>
  );
}
