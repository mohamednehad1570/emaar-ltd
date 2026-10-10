'use client';

/**
 * components/layout/HeaderDropdown.tsx
 * Compact desktop dropdown (About — the only header panel):
 * aligned to the trigger from its inline-start edge (left in EN, right in AR), 2px radius, warm shadow-md, 0.2s fade + 4px.
 */

import React, { useRef } from 'react';
import LocaleLink from '@/components/ui/LocaleLink';
import { motion } from 'framer-motion';
import type { NavLink } from '@/lib/data/nav';
import { usePanelClamp } from './usePanelClamp';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface HeaderDropdownProps {
  id:         string;
  items:      NavLink[];
  language:   'en' | 'ar';
  onEnter:    () => void;
  onLeave:    () => void;
  onNavigate: () => void;
}

export default function HeaderDropdown({ id, items, language, onEnter, onLeave, onNavigate }: HeaderDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  usePanelClamp(ref);

  return (
    <motion.div
      ref={ref}
      id={id}
      data-nav-panel
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4, transition: { duration: 0.12 } }}
      transition={{ duration: 0.2, ease: EASE }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className="absolute top-full z-50 py-2 min-w-[220px] max-w-[280px] w-max bg-white border border-border-light rounded-[2px] shadow-warm-md"
    >
      {items.map(item => (
        <React.Fragment key={item.href}>
          {item.dividerBefore && <div className="my-1 mx-3 border-t border-border-light" aria-hidden="true" />}
          <LocaleLink
            href={item.href}
            onClick={onNavigate}
            className="flex items-center h-11 px-5 text-sm text-ink-body hover:bg-surface-cream hover:text-ink-heading focus-visible:outline-none focus-visible:bg-surface-cream"
          >
            {item[language]}
          </LocaleLink>
        </React.Fragment>
      ))}
    </motion.div>
  );
}
