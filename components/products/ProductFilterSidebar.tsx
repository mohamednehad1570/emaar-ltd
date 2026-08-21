'use client';

/**
 * components/products/ProductFilterSidebar.tsx
 *
 * Controlled filter sidebar used by ProductCategoryPage (L3) and the
 * unified /products catalog. Supports two lock modes:
 *   - lockedMaterial: shows material as a read-only chip, hides the radio group
 *   - lockedCategory: shows category as a read-only chip, hides the category list
 *
 * Parent owns all filter state; sidebar is a pure controlled component.
 */

import React from 'react';
import { X } from '@phosphor-icons/react';
import { cn } from '@/lib/cn';

// ── Category options — static taxonomy; survives deletion of lib/data/products.ts ──

const CATEGORY_OPTIONS: Record<'upvc' | 'aluminum', Array<{ value: string; label: { en: string; ar: string } }>> = {
  upvc: [
    { value: 'windows',           label: { en: 'Windows',         ar: 'نوافذ'          } },
    { value: 'doors',             label: { en: 'Doors',           ar: 'أبواب'          } },
    { value: 'doors-and-windows', label: { en: 'Doors & Windows', ar: 'أبواب ونوافذ'   } },
    { value: 'staircases',        label: { en: 'Staircases',      ar: 'سلالم'          } },
    { value: 'stained-glass',     label: { en: 'Stained Glass',   ar: 'زجاج ملون'      } },
    { value: 'sandblast',         label: { en: 'Sandblast',       ar: 'سندبلاست'       } },
    { value: 'hebeschibe',        label: { en: 'Hebeschibe',      ar: 'هيبيشيبه'       } },
  ],
  aluminum: [
    { value: 'windows',           label: { en: 'Windows',         ar: 'نوافذ'          } },
    { value: 'doors',             label: { en: 'Doors',           ar: 'أبواب'          } },
    { value: 'doors-and-windows', label: { en: 'Doors & Windows', ar: 'أبواب ونوافذ'   } },
    { value: 'staircases',        label: { en: 'Staircases',      ar: 'سلالم'          } },
    { value: 'skylights',         label: { en: 'Skylights',       ar: 'مناور'          } },
    { value: 'stained-glass',     label: { en: 'Stained Glass',   ar: 'زجاج ملون'      } },
    { value: 'sandblast',         label: { en: 'Sandblast',       ar: 'سندبلاست'       } },
  ],
}

// ── Types ─────────────────────────────────────────────────────────────────────

const SPEC_TAGS = [
  { value: 'double-glazed',      label: { en: 'Double Glazed',      ar: 'زجاج مزدوج'             } },
  { value: 'triple-glazed',      label: { en: 'Triple Glazed',      ar: 'زجاج ثلاثي'             } },
  { value: 'thermal-insulated',  label: { en: 'Thermal Insulated',  ar: 'عازل حراري'             } },
  { value: 'acoustic-insulated', label: { en: 'Acoustic Insulated', ar: 'عازل صوتي'              } },
  { value: 'uv-resistant',       label: { en: 'UV Resistant',       ar: 'مقاوم للأشعة فوق البنفسجية' } },
] as const;

export interface FilterState {
  material:    'upvc' | 'aluminum' | null;
  categories:  string[];
  specTags:    string[];
}

interface Props {
  filters:          FilterState;
  onChange:         (next: FilterState) => void;
  /** When set, material section shows as read-only chip and radio is hidden */
  lockedMaterial?:  string;
  /** When set, category section is hidden entirely */
  lockedCategory?:  string;
  isRTL:            boolean;
  language:         'en' | 'ar';
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-ink-muted mb-3">
      {children}
    </span>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductFilterSidebar({ filters, onChange, lockedMaterial, lockedCategory, isRTL, language }: Props) {

  const hasActiveFilters = filters.categories.length > 0 || filters.specTags.length > 0 ||
    (filters.material !== null && !lockedMaterial);

  // Category options depend on the active material selection
  const activeMaterial = lockedMaterial ?? filters.material
  const categoryOptions = (activeMaterial === 'upvc' || activeMaterial === 'aluminum')
    ? CATEGORY_OPTIONS[activeMaterial].map((c) => ({ value: c.value, label: c.label[language] }))
    : []

  function toggleCategory(slug: string) {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((s) => s !== slug)
      : [...filters.categories, slug]
    onChange({ ...filters, categories: next })
  }

  function toggleSpecTag(tag: string) {
    const next = filters.specTags.includes(tag)
      ? filters.specTags.filter((t) => t !== tag)
      : [...filters.specTags, tag]
    onChange({ ...filters, specTags: next })
  }

  function setMaterial(m: 'upvc' | 'aluminum' | null) {
    // Reset categories when material changes — they belong to the previous material
    onChange({ ...filters, material: m, categories: [] })
  }

  function clearAll() {
    onChange({ material: lockedMaterial ? (filters.material) : null, categories: [], specTags: [] })
  }

  const labels = {
    material:    { en: 'Material',       ar: 'المادة'         },
    category:    { en: 'Category',       ar: 'الفئة'          },
    specTags:    { en: 'Specifications', ar: 'المواصفات'      },
    clearAll:    { en: 'Clear All',      ar: 'مسح الكل'       },
    upvc:        { en: 'uPVC',           ar: 'uPVC'           },
    aluminum:    { en: 'Aluminium',      ar: 'ألومنيوم'       },
  }

  const t = (key: keyof typeof labels) => labels[key][language]

  return (
    <aside className={cn('space-y-8 sticky top-24', isRTL ? 'text-right' : 'text-left')} aria-label="Product filters">

      {/* ── Clear all ───────────────────────────────────────────────────── */}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className={cn('flex items-center gap-1.5 text-xs font-semibold text-brand-red hover:text-brand-red-dark transition-colors', isRTL ? 'mr-auto flex-row-reverse' : '')}
        >
          <X size={14} />
          {t('clearAll')}
        </button>
      )}

      {/* ── Material ────────────────────────────────────────────────────── */}
      {!lockedMaterial ? (
        <div>
          <SectionLabel>{t('material')}</SectionLabel>
          {(['upvc', 'aluminum'] as const).map((m) => (
            <label key={m} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
              <input
                type="radio"
                name="material"
                value={m}
                checked={filters.material === m}
                onChange={() => setMaterial(m)}
                className="accent-brand-red"
              />
              <span className="text-sm text-ink-body group-hover:text-ink-heading transition-colors">{t(m)}</span>
            </label>
          ))}
        </div>
      ) : (
        /* Read-only chip when material is locked by the route */
        <div>
          <SectionLabel>{t('material')}</SectionLabel>
          <span className="inline-block px-3 py-1 text-xs font-semibold border border-silver-material text-ink-body">
            {lockedMaterial === 'upvc' ? t('upvc') : t('aluminum')}
          </span>
        </div>
      )}

      {/* ── Category — hidden when both locked ──────────────────────────── */}
      {!lockedCategory && categoryOptions.length > 0 && (
        <div>
          <SectionLabel>{t('category')}</SectionLabel>
          {categoryOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(opt.value)}
                onChange={() => toggleCategory(opt.value)}
                className="accent-brand-red"
              />
              <span className="text-sm text-ink-body group-hover:text-ink-heading transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* ── Spec tags ────────────────────────────────────────────────────── */}
      <div>
        <SectionLabel>{t('specTags')}</SectionLabel>
        {SPEC_TAGS.map((tag) => (
          <label key={tag.value} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.specTags.includes(tag.value)}
              onChange={() => toggleSpecTag(tag.value)}
              className="accent-brand-red"
            />
            <span className="text-sm text-ink-body group-hover:text-ink-heading transition-colors">
              {tag.label[language]}
            </span>
          </label>
        ))}
      </div>

    </aside>
  );
}
