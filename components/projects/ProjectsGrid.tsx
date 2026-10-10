'use client';

/**
 * components/projects/ProjectsGrid.tsx
 *
 * /projects portfolio: title, type + material filter rows, then either
 *  • "All" — grouped Residential / Commercial sections, each carrying its anchor id, or
 *  • a single type — flat grid whose wrapper carries that type's id.
 * Hash deep links (#residential / #commercial) are handled by useProjectHashFilter.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Container from '@/components/layout/Container';
import { revealOnce } from '@/lib/motion';
import ProjectCard from './ProjectCard';
import ProjectFilterBar from './ProjectFilterBar';
import { useProjectHashFilter, useMaterialParam, type MaterialFilter, type SectorFilter } from './useProjectHashFilter';
import { PROJECT_TYPES, PROJECT_TYPE_LABELS, type ProjectListItem } from '@/lib/data/projectContent';
import type { DisplayProject } from '@/lib/types';

const SECTORS: readonly { id: SectorFilter; label: { en: string; ar: string } }[] = [
  { id: 'all', label: { en: 'All', ar: 'الكل' } },
  ...PROJECT_TYPES.map((id) => ({ id, label: PROJECT_TYPE_LABELS[id].chip })),
];

const MATERIALS: readonly { id: MaterialFilter; label: { en: string; ar: string } }[] = [
  { id: 'all',      label: { en: 'All Materials', ar: 'جميع المواد' } },
  { id: 'upvc',     label: { en: 'uPVC',          ar: 'uPVC'        } },
  { id: 'aluminum', label: { en: 'Aluminum',      ar: 'ألومنيوم'    } },
];

const EMPTY = { en: 'No projects found matching these filters.', ar: 'لا توجد مشاريع تطابق معايير التصفية هذه.' };

interface Props {
  projects: ProjectListItem[];
}

export default function ProjectsGrid({ projects }: Props) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();

  // No useSearchParams: it bailed the whole grid out of SSR (empty HTML before JS).
  // ?category= / ?material= are read in the browser only (useProjectHashFilter.ts).
  const [sector, setSector] = useProjectHashFilter();
  // ?material= seeds the filter until the visitor picks one; then their pick wins
  const materialParam = useMaterialParam();
  const [picked, setMaterial] = useState<MaterialFilter | null>(null);
  const material = picked ?? materialParam ?? 'all';

  // Flatten the bilingual static projects to the active language
  const displayProjects: DisplayProject[] = projects.map((p) => ({
    id:       p.id,
    title:    p.title[language],
    category: PROJECT_TYPE_LABELS[p.type].chip[language],
    location: p.location[language],
    image:    p.image,
    year:     p.year,
    type:     p.type,
    // Material filter key — any uPVC chip makes it a uPVC project, otherwise aluminium
    material: p.materials.some((m) => m.en.includes('uPVC')) ? 'upvc' : 'aluminum',
  }));

  const filtered = displayProjects.filter((p) =>
    (sector === 'all' || p.type === sector) && (material === 'all' || p.material === material));

  // SSR-safe: the grid is server-rendered now, so the reduce branch must not change `initial`
  const reveal = revealOnce(shouldReduce);

  const grid = (items: DisplayProject[]) => (
    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence>
        {items.map((project) => <ProjectCard key={String(project.id)} project={project} />)}
      </AnimatePresence>
    </motion.div>
  );

  return (
    // Header height + 4rem breathing room above the page title
    <section className="pt-[calc(var(--header-h)+4rem)] pb-16 bg-off-white min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>

        {/* ── Title + filters ─────────────────────────────────── */}
        <div className="text-center mb-16">
          <motion.div {...reveal}>
            <h1
              className="font-extrabold text-ink-heading mb-6 tracking-[-0.02em] leading-[0.95] text-balance"
              style={{ fontSize: 'clamp(2.75rem, 5vw, 5rem)' }}
            >
              {language === 'en' ? 'Our Portfolio' : 'أعمالنا'}
            </h1>
            <p className="text-xl text-ink-body max-w-2xl mx-auto mb-10">
              {language === 'en'
                ? 'Residential and commercial projects across the UAE, each delivered to specification.'
                : 'مشاريع سكنية وتجارية في جميع أنحاء الإمارات، كل منها وفق المواصفات.'}
            </p>
          </motion.div>

          <motion.div className="space-y-6" {...reveal}>
            <ProjectFilterBar heading={{ en: 'Filter by Type', ar: 'تصفية حسب النوع' }} options={SECTORS} value={sector} onChange={setSector} />
            <ProjectFilterBar heading={{ en: 'Filter by Material', ar: 'تصفية حسب المادة' }} options={MATERIALS} value={material} onChange={setMaterial} />
          </motion.div>
        </div>

        {/* ── Results ─────────────────────────────────────────── */}
        {sector === 'all' ? (
          PROJECT_TYPES.map((type, i) => {
            const group = filtered.filter((p) => p.type === type);
            if (!group.length) return null;
            return (
              <React.Fragment key={type}>
                {i > 0 && <div className="border-t border-border-light my-10" />}
                {/* id doubles as the #residential / #commercial anchor target */}
                <div id={type}>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-ink-muted mb-6 text-start">
                    {PROJECT_TYPE_LABELS[type].heading[language]}
                  </h2>
                  {grid(group)}
                </div>
              </React.Fragment>
            );
          })
        ) : (
          /* Single-type mode keeps the anchor id on the wrapper so the jump
             still has a target once the grouped sections collapse */
          <div id={sector}>{grid(filtered)}</div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-ink-muted">{EMPTY[language]}</div>
        )}

      </Container>
    </section>
  );
}
