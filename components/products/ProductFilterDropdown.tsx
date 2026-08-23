'use client';

/**
 * components/products/ProductFilterDropdown.tsx
 *
 * Reusable filter pill + floating panel used by ProductFilterBar.
 * Parent controls open/close state; this component handles outside-click
 * and Escape-key dismissal internally via document listeners.
 *
 * Also exports RadioOption and CheckOption for panel content — they live
 * here so ProductFilterBar can compose them without a separate file.
 */

import React, { useRef, useEffect } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { cn } from '@/lib/cn';

// ── Dropdown ───────────────────────────────────────────────────────────────────

interface DropdownProps {
  label:        string;
  isOpen:       boolean;
  /** Filter has an active value — renders pill as filled brand-dark */
  isActive:     boolean;
  /** Optional count suffix: "Category (2)" */
  activeCount?: number;
  onToggle:     () => void;
  onClose:      () => void;
  isRTL:        boolean;
  children:     React.ReactNode;
}

export default function ProductFilterDropdown({
  label, isOpen, isActive, activeCount, onToggle, onClose, isRTL, children,
}: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click — checks contains() to avoid portal false-positives
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [isOpen, onClose]);

  // Close on Escape — fires on document so focus doesn't need to be inside panel
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [isOpen, onClose]);

  const displayLabel = activeCount && activeCount > 0 ? `${label} (${activeCount})` : label;

  return (
    <div ref={ref} className="relative">

      {/* ── Pill trigger ──────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          // Sharp corners — radius-button = 0px per design system
          'inline-flex items-center px-4 py-2 min-h-[44px] text-sm font-semibold border transition-colors duration-150',
          // Active + closed: filled brand-dark pill
          isActive && !isOpen  && 'bg-brand-dark text-white border-brand-dark',
          // Inactive + closed: white outline, muted border
          !isActive && !isOpen && 'bg-white text-text-body border-border-light hover:border-silver-material hover:text-brand-dark',
          // Open + active: keep filled pill
          isOpen && isActive   && 'bg-brand-dark text-white border-brand-dark',
          // Open + inactive: outline only switches to brand-dark border
          isOpen && !isActive  && 'bg-white text-text-body border-brand-dark',
        )}
      >
        {displayLabel}
        {/* Caret rotates 180° when panel is open to signal collapse direction */}
        <CaretDown
          size={14}
          weight="bold"
          className={cn('ms-1 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {/* ── Floating panel ────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-30 mt-1 min-w-[200px] bg-white border border-border-light shadow-warm-md p-2',
            // Panel anchors to reading-start edge (left in LTR, right in RTL)
            isRTL ? 'right-0' : 'left-0',
          )}
        >
          {children}
        </div>
      )}

    </div>
  );
}

// ── Option row components ──────────────────────────────────────────────────────

/** Single-select radio-style option row — used in Material and Sort panels */
export function RadioOption({ label, isSelected, onClick }: {
  label: string; isSelected: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-start px-3 py-2 text-sm transition-colors duration-100',
        isSelected
          ? 'font-semibold text-brand-dark bg-cream'
          : 'text-text-body hover:bg-off-white',
      )}
    >
      {label}
    </button>
  );
}

/** Multi-select checkbox option row — used in Category and Specifications panels */
export function CheckOption({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: () => void;
}) {
  return (
    <label onClick={onChange} className="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-off-white">
      {/* Custom checkbox square — radius 0px matches button token */}
      <span className={cn(
        'flex-shrink-0 w-4 h-4 border transition-colors duration-100 flex items-center justify-center',
        checked ? 'bg-brand-red border-brand-red' : 'border-border-medium bg-white',
      )}>
        {checked && (
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="w-3 h-3">
            <polyline points="3,8 6.5,12 13,4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-sm text-text-body">{label}</span>
    </label>
  );
}
