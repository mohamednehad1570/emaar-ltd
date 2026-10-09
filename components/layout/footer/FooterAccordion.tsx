'use client';

/**
 * components/layout/footer/FooterAccordion.tsx
 * Mobile-only accordion section. Each instance manages its own open/closed state
 * so multiple can be open simultaneously.
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CaretDown } from '@phosphor-icons/react';

function ColHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-silver-dark mb-5 select-none">
      {children}
    </h3>
  );
}

interface FooterAccordionProps {
  title:    string;
  children: React.ReactNode;
}

export default function FooterAccordion({ title, children }: FooterAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-light last:border-b-0">
      {/* Accordion trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 min-h-[52px] text-left"
        aria-expanded={open}
      >
        <ColHeader>{title}</ColHeader>
        <CaretDown
          size={16}
          className={`text-text-muted shrink-0 transition-transform duration-250 ${open ? 'rotate-180' : ''}`}
          style={{ marginBottom: 0 }} /* cancel ColHeader's mb-5 inside the button row */
        />
      </button>

      {/* Animated body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
