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

export default function HeaderDropdown({
  items,
  language,
  isRTL,
  onEnter,
  onLeave,
}: HeaderDropdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'absolute top-full z-50',
        'bg-white border border-border-light',
        'min-w-[200px] max-w-[280px] w-max',
        'py-2',
        isRTL ? 'right-0' : 'left-0',
      )}
      style={{ boxShadow: '0 15px 60px rgba(45,41,38,0.16)' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {items.map((item) => (
        <React.Fragment key={item.href}>
          {item.dividerBefore && (
            <div className="h-px bg-border-light mx-4 my-1" aria-hidden="true" />
          )}
          <Link
            href={item.href}
            className={cn(
              'flex items-center h-11 px-5',
              'text-sm font-normal text-text-body',
              'hover:bg-cream hover:text-text-heading',
              'transition-colors duration-150',
            )}
          >
            {item[language]}
          </Link>
        </React.Fragment>
      ))}
    </motion.div>
  );
}
