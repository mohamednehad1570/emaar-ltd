'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { DropdownItem } from '@/lib/data/nav';
import { cn } from '@/lib/cn';

interface HeaderDropdownProps {
  items:    DropdownItem[];
  language: 'en' | 'ar';
  isRTL:    boolean;
  onEnter:  () => void;
  onLeave:  () => void;
}

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function HeaderDropdown({
  items, language, isRTL, onEnter, onLeave,
}: HeaderDropdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      transition={{ duration: 0.2, ease: EASE }}
      className={cn(
        'absolute top-full z-50 py-2',
        'bg-white border border-border-light',
        'min-w-[220px] max-w-[280px] w-max',
        isRTL ? 'right-0' : 'left-0',
      )}
      style={{ boxShadow: '0 15px 60px rgba(45,41,38,0.16)' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {items.map((item, idx) => (
        <React.Fragment key={item.href}>
          {item.dividerBefore && (
            <div className="h-px bg-border-light mx-4 my-1" aria-hidden="true" />
          )}
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.2, ease: EASE }}
          >
            <Link
              href={item.href}
              className="flex items-center h-11 px-5 text-sm font-normal text-text-body hover:bg-cream hover:text-text-heading transition-colors duration-150"
            >
              {item[language]}
            </Link>
          </motion.div>
        </React.Fragment>
      ))}
    </motion.div>
  );
}
