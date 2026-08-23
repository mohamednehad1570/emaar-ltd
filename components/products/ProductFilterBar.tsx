'use client';

/**
 * components/products/ProductFilterBar.tsx
 *
 * Horizontal filter bar for the /products catalog.
 * Row 1: Material · Category · Specifications pills + "{n} Products" count + Sort pill.
 * Row 2: dismissible active-filter chips + "Clear all" (only when 2+ filters active).
 *
 * Parent owns all filter and sort state; this component is a pure controlled renderer.
 * RTL: flex-row-reverse flips pill order so Material is on the reading-start edge.
 */

import React, { useState, useCallback } from 'react';
import { X } from '@phosphor-icons/react';
import { cn } from '@/lib/cn';
import { type FilterState } from './ProductFilterSidebar';
import ProductFilterDropdown, { RadioOption, CheckOption } from './ProductFilterDropdown';

// ── Types ─────────────────────────────────────────────────────────────────────

export type SortOrder = 'relevance' | 'az' | 'za';
type Panel = 'material' | 'category' | 'specs' | 'sort' | null;

// ── Static option data ─────────────────────────────────────────────────────────

// Union of uPVC + Aluminium category taxonomies — horizontal bar shows all, unfiltered
const CATEGORIES = [
  { value: 'windows',           en: 'Windows',         ar: 'نوافذ'          },
  { value: 'doors',             en: 'Doors',           ar: 'أبواب'          },
  { value: 'doors-and-windows', en: 'Doors & Windows', ar: 'أبواب ونوافذ'   },
  { value: 'staircases',        en: 'Staircases',      ar: 'سلالم'          },
  { value: 'stained-glass',     en: 'Stained Glass',   ar: 'زجاج ملون'      },
  { value: 'sandblast',         en: 'Sandblast',       ar: 'سندبلاست'       },
  { value: 'skylights',         en: 'Skylights',       ar: 'مناور'          },
  { value: 'hebeschibe',        en: 'Hebeschibe',      ar: 'هيبيشيبه'       },
] as const;

const SPECS = [
  { value: 'double-glazed',      en: 'Double Glazed',      ar: 'زجاج مزدوج'                  },
  { value: 'triple-glazed',      en: 'Triple Glazed',      ar: 'زجاج ثلاثي'                  },
  { value: 'thermal-insulated',  en: 'Thermal Insulated',  ar: 'عازل حراري'                  },
  { value: 'acoustic-insulated', en: 'Acoustic Insulated', ar: 'عازل صوتي'                   },
  { value: 'uv-resistant',       en: 'UV Resistant',       ar: 'مقاوم للأشعة فوق البنفسجية'  },
] as const;

const SORTS: Array<{ value: SortOrder; en: string; ar: string }> = [
  { value: 'relevance', en: 'Relevance', ar: 'الأهمية'  },
  { value: 'az',        en: 'Name A–Z', ar: 'الاسم أ–ي' },
  { value: 'za',        en: 'Name Z–A', ar: 'الاسم ي–أ' },
];

const L = {
  material: { en: 'Material',       ar: 'المادة'     },
  category: { en: 'Category',       ar: 'الفئة'      },
  specs:    { en: 'Specifications', ar: 'المواصفات'  },
  sort:     { en: 'Sort',           ar: 'ترتيب'      },
  products: { en: 'Products',       ar: 'منتج'       },
  clearAll: { en: 'Clear all',      ar: 'مسح الكل'   },
  all:      { en: 'All',            ar: 'الكل'       },
  upvc:     { en: 'uPVC',           ar: 'uPVC'       },
  aluminum: { en: 'Aluminium',      ar: 'الألومنيوم' },
} as const;

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  filters:       FilterState;
  onChange:      (next: FilterState) => void;
  sort:          SortOrder;
  onSortChange:  (s: SortOrder) => void;
  filteredCount: number;
  isRTL:         boolean;
  language:      'en' | 'ar';
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductFilterBar({ filters, onChange, sort, onSortChange, filteredCount, isRTL, language }: Props) {
  const [open, setOpen] = useState<Panel>(null);
  const t = useCallback((k: keyof typeof L) => L[k][language], [language]);

  const toggle = (p: Panel) => setOpen((cur) => cur === p ? null : p);
  const close  = () => setOpen(null);

  const setMaterial = (m: 'upvc' | 'aluminum' | null) => {
    // Categories belong to the selected material — reset them on material change
    onChange({ ...filters, material: m, categories: [] });
    close();
  };
  const toggleCat  = (v: string) => onChange({ ...filters, categories: filters.categories.includes(v) ? filters.categories.filter((c) => c !== v) : [...filters.categories, v] });
  const toggleSpec = (v: string) => onChange({ ...filters, specTags:   filters.specTags.includes(v)   ? filters.specTags.filter((s) => s !== v)   : [...filters.specTags, v]   });
  const clearAll   = () => onChange({ material: null, categories: [], specTags: [] });

  // ── Active chips ──────────────────────────────────────────────────────────

  const chips: Array<{ key: string; label: string; onRemove: () => void }> = [];
  if (filters.material) {
    chips.push({ key: 'mat', label: L[filters.material][language], onRemove: () => onChange({ ...filters, material: null, categories: [] }) });
  }
  filters.categories.forEach((v) => {
    const opt = CATEGORIES.find((c) => c.value === v);
    if (opt) chips.push({ key: `cat-${v}`, label: opt[language], onRemove: () => toggleCat(v) });
  });
  filters.specTags.forEach((v) => {
    const opt = SPECS.find((s) => s.value === v);
    if (opt) chips.push({ key: `spec-${v}`, label: opt[language], onRemove: () => toggleSpec(v) });
  });

  const activeSortLabel = SORTS.find((o) => o.value === sort)?.[language] ?? t('sort');

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-3 mb-6">

      {/* ── Row 1: filter pills + count + sort ────────────────────────── */}
      {/* flex-row-reverse in RTL: Material pill lands on reading-start (right) edge */}
      <div className={cn('flex items-center gap-2 flex-wrap', isRTL && 'flex-row-reverse')}>

        <ProductFilterDropdown label={t('material')} isOpen={open === 'material'} isActive={filters.material !== null} onToggle={() => toggle('material')} onClose={close} isRTL={isRTL}>
          <RadioOption label={t('all')}      isSelected={!filters.material}                 onClick={() => setMaterial(null)} />
          <RadioOption label={t('upvc')}     isSelected={filters.material === 'upvc'}       onClick={() => setMaterial('upvc')} />
          <RadioOption label={t('aluminum')} isSelected={filters.material === 'aluminum'}   onClick={() => setMaterial('aluminum')} />
        </ProductFilterDropdown>

        <ProductFilterDropdown label={t('category')} isOpen={open === 'category'} isActive={filters.categories.length > 0} activeCount={filters.categories.length} onToggle={() => toggle('category')} onClose={close} isRTL={isRTL}>
          {CATEGORIES.map((c) => (
            <CheckOption key={c.value} label={c[language]} checked={filters.categories.includes(c.value)} onChange={() => toggleCat(c.value)} />
          ))}
        </ProductFilterDropdown>

        <ProductFilterDropdown label={t('specs')} isOpen={open === 'specs'} isActive={filters.specTags.length > 0} activeCount={filters.specTags.length} onToggle={() => toggle('specs')} onClose={close} isRTL={isRTL}>
          {SPECS.map((s) => (
            <CheckOption key={s.value} label={s[language]} checked={filters.specTags.includes(s.value)} onChange={() => toggleSpec(s.value)} />
          ))}
        </ProductFilterDropdown>

        {/* Count + Sort pushed to reading-end edge via margin */}
        {/* In flex-row-reverse (RTL), mr-auto pushes toward the left (reading end) */}
        <div className={cn('flex items-center gap-3', isRTL ? 'mr-auto' : 'ml-auto')}>
          {/* dir=ltr preserves digit order when parent container is RTL */}
          <span className="text-sm text-text-muted font-medium" dir="ltr">
            {filteredCount} {t('products')}
          </span>
          <ProductFilterDropdown label={`${t('sort')}: ${activeSortLabel}`} isOpen={open === 'sort'} isActive={sort !== 'relevance'} onToggle={() => toggle('sort')} onClose={close} isRTL={isRTL}>
            {SORTS.map((o) => (
              <RadioOption key={o.value} label={o[language]} isSelected={sort === o.value} onClick={() => { onSortChange(o.value); close(); }} />
            ))}
          </ProductFilterDropdown>
        </div>

      </div>

      {/* ── Row 2: active chips (only when filters are applied) ─────────── */}
      {chips.length > 0 && (
        <div className={cn('flex items-center gap-2 flex-wrap', isRTL && 'flex-row-reverse')}>
          {chips.map((chip) => (
            <span key={chip.key} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream border border-border-light text-text-body text-xs">
              {chip.label}
              <button
                type="button"
                onClick={chip.onRemove}
                aria-label={`Remove ${chip.label} filter`}
                className="text-text-muted hover:text-brand-red transition-colors"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          {/* "Clear all" only when 2+ chips are active */}
          {chips.length >= 2 && (
            <button type="button" onClick={clearAll} className="text-xs font-semibold text-brand-red hover:text-brand-red-dark transition-colors cursor-pointer">
              {t('clearAll')}
            </button>
          )}
        </div>
      )}

    </div>
  );
}
