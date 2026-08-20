'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  children: React.ReactNode;
}

/**
 * Wraps <main> and crossfades page content on language switch.
 * The header sits above this wrapper and never participates in the fade,
 * so the LangToggle visual feedback is always immediate.
 */
export default function LanguageTransition({ children }: Props) {
  const { isTransitioning } = useLanguage();
  const r = useReducedMotion();

  return (
    <motion.main
      className="min-h-screen"
      // r=true: hold full opacity — the OS asked for no motion
      animate={{ opacity: r ? 1 : (isTransitioning ? 0 : 1) }}
      // 0.15s matches the 150 ms setTimeout in toggleLanguage exactly
      transition={{ duration: 0.15, ease: 'easeInOut' }}
    >
      {children}
    </motion.main>
  );
}
