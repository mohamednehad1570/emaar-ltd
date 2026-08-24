'use client';

// Single source of truth for every CTA across the site.
// Renders as <motion.a> when href is provided, <motion.button> otherwise.
// variant: primary (red, any bg) | ghost (glass, dark/red bg only) | outline (bordered, light bg)
// size:    sm (header compact) | md (default) | lg (hero / full-section CTAs)
// icon:    rendered after children; caller adds rotate-180 for RTL arrows as needed —
//          parent dir="rtl" from section wrapper reverses flex automatically.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

export interface ButtonProps {
  variant:    'primary' | 'ghost' | 'outline';
  size?:      'sm' | 'md' | 'lg';
  href?:      string;
  target?:    '_blank' | '_self';
  rel?:       string;
  onClick?:   () => void;
  children:   React.ReactNode;
  className?: string;
  icon?:      React.ReactNode;      // follows children; caller owns RTL rotation
  disabled?:  boolean;
  type?:      'button' | 'submit' | 'reset';
}

// ── Structural base — shared by every variant ─────────────────────────────────
const BASE =
  'inline-flex items-center justify-center gap-2 rounded-none font-cairo cursor-pointer ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2';

// ── Size map ─────────────────────────────────────────────────────────────────
const SIZES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4   py-2   text-xs   min-h-[36px]', // header compact — always desktop
  md: 'px-6   py-3.5 text-sm   min-h-[44px]', // default touch target
  lg: 'px-10  py-5   text-base min-h-[44px]', // hero / full-section CTAs
};

// ── Variant map ──────────────────────────────────────────────────────────────
const VARIANTS: Record<ButtonProps['variant'], string> = {
  // Solid red — works on any background; warm CTA shadow deepens on hover
  primary: [
    'bg-brand-red hover:bg-brand-red-dark text-white font-bold',
    'shadow-[0_4px_15px_rgba(231,76,60,0.20)] hover:shadow-[0_8px_32px_rgba(231,76,60,0.40)]',
    'transition-[background-color,box-shadow] duration-200',
    'focus-visible:outline-brand-red',
  ].join(' '),
  // Glass / frosted — dark or coloured backgrounds only
  ghost: [
    'bg-white/10 hover:bg-white/[0.17] text-white font-semibold',
    'border border-white/25 hover:border-white/45 backdrop-blur-sm',
    'transition-[background-color,border-color] duration-200',
    'focus-visible:outline-white',
  ].join(' '),
  // Bordered transparent — light backgrounds only (white, off-white, cream)
  outline: [
    'bg-transparent text-brand-dark font-bold',
    'border border-border-medium hover:border-brand-dark',
    'transition-[border-color,color] duration-200',
    'focus-visible:outline-brand-red',
  ].join(' '),
};

// Disabled overlay — applied on top of any variant
const DISABLED = 'opacity-50 cursor-not-allowed pointer-events-none';

// Spring for hover/tap — snappy, never floaty
const SPRING = { type: 'spring' as const, stiffness: 380, damping: 30 };

export default function Button({
  variant, size = 'md', href, target, rel, onClick,
  children, className, icon, disabled, type = 'button',
}: ButtonProps) {
  const shouldReduce = useReducedMotion();

  const classes = cn(BASE, SIZES[size], VARIANTS[variant], disabled && DISABLED, className);

  // Scale spring — suppressed when user has prefers-reduced-motion
  const motionProps = shouldReduce
    ? {}
    : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 }, transition: SPRING };

  // icon follows children; dir="rtl" on parent section reverses flex layout automatically
  const inner = (
    <>
      {children}
      {icon}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-disabled={disabled}
        className={classes}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
