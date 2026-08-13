'use client';

import { motion } from 'framer-motion';
import {
  MagnifyingGlass as Search, Funnel as Filter,
  GridFour as Grid, List,
  FileText, Stack as Layers, Wrench, Package, BookOpen, Medal, FolderOpen,
} from '@phosphor-icons/react';

interface FilterOption { key: string; label: string }

interface TechFiltersProps {
  categoryOptions: FilterOption[];
  activeCategory: string;
  onCategoryChange: (key: string) => void;
  productTypeOptions: FilterOption[];
  activeProductType: string;
  onProductTypeChange: (key: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchPlaceholder: string;
  viewMode: 'grid' | 'list';
  onViewModeChange: (m: 'grid' | 'list') => void;
  isRTL: boolean;
  language: 'en' | 'ar';
}

function getCategoryIcon(key: string) {
  const k = key.toLowerCase();
  if (k.includes('specification') || k === 'specs') return FileText;
  if (k.includes('cad'))                             return Layers;
  if (k.includes('installation'))                    return Wrench;
  if (k.includes('maintenance'))                     return Package;
  if (k.includes('brochure'))                        return BookOpen;
  if (k.includes('certification'))                   return Medal;
  return FolderOpen;
}

export default function TechFilters({
  categoryOptions, activeCategory, onCategoryChange,
  productTypeOptions, activeProductType, onProductTypeChange,
  searchQuery, onSearchChange, searchPlaceholder,
  viewMode, onViewModeChange, isRTL, language,
}: TechFiltersProps) {
  return (
    /* Sticky below 52px header — top-[52px] offsets the fixed nav exactly */
    <section className="bg-white sticky top-[52px] z-40 border-b border-border-light">
      <div className="max-w-7xl mx-auto">

        {/* ── Category tabs ──────────────────────────────────────── */}
        <div className="relative">
          <div className={`border-b border-border-light flex overflow-x-auto scrollbar-hide ${isRTL ? 'flex-row-reverse' : ''}`}>
            {categoryOptions.map(({ key, label }) => {
              const Icon = key === 'all' ? FolderOpen : getCategoryIcon(key);
              const isActive = activeCategory === key;
              return (
                <button key={key} onClick={() => onCategoryChange(key)}
                  className={`group relative flex items-center gap-2 px-5 py-3 text-sm whitespace-nowrap transition-colors duration-150 ${isActive ? 'text-ink-heading font-bold' : 'text-ink-muted font-semibold hover:text-ink-heading'}`}>
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                  {/* Hover underline — only when inactive */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-silver-material opacity-0 group-hover:opacity-100 transition-opacity duration-150" aria-hidden="true" />
                  )}
                  {/* Active underline slides between tabs via layoutId */}
                  {isActive && (
                    <motion.div layoutId="tech-tab-underline"
                      transition={{ type: 'spring', stiffness: 500, damping: 48 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
        </div>

        {/* ── Search + product filter chips + view toggle ─────────── */}
        <div className={`flex flex-col md:flex-row md:items-center gap-3 px-4 py-3 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className="relative flex-1 min-w-0">
            <Search className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} w-4 h-4 text-ink-muted pointer-events-none`} aria-hidden="true" />
            <input type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className={`w-full h-12 bg-white text-sm text-ink-body border border-border-light focus:border-silver-material focus:outline-none placeholder:text-ink-muted transition-colors duration-150 ${isRTL ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4'}`} />
          </div>

          <div className={`flex items-center gap-2 overflow-x-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className={`text-xs font-semibold text-ink-muted uppercase tracking-wide shrink-0 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Filter className="w-3.5 h-3.5" aria-hidden="true" />
              {language === 'en' ? 'Filter' : 'تصفية'}
            </span>
            {productTypeOptions.map(({ key, label }) => (
              <button key={key} onClick={() => onProductTypeChange(key)}
                className={`px-4 py-2 text-sm whitespace-nowrap border transition-colors duration-150 ${activeProductType === key ? 'bg-surface-cream border-silver-material text-ink-heading font-semibold' : 'bg-white border-border-light text-ink-muted hover:border-silver-material hover:text-ink-heading'}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 shrink-0">
            {(['grid', 'list'] as const).map(mode => (
              <button key={mode} onClick={() => onViewModeChange(mode)}
                aria-label={mode} aria-pressed={viewMode === mode}
                className={`w-9 h-9 flex items-center justify-center border transition-colors duration-150 ${viewMode === mode ? 'bg-surface-cream border-silver-material text-ink-heading' : 'bg-white border-border-light text-ink-muted hover:border-silver-material hover:text-ink-heading'}`}>
                {mode === 'grid' ? <Grid className="w-4 h-4" aria-hidden="true" /> : <List className="w-4 h-4" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
