'use client';

/**
 * components/catalog/material/MaterialOptions.tsx
 *
 * "Options & finishes" (section #options): main line tabs Colours · Designs · Glass ·
 * Accessories, a second row of "All" + that tab's groups, and the animated card grid.
 * Openable cards feed the shared Lightbox (swatch or photo + details panel); prev/next
 * walks only the cards currently shown. Deep links (#glass …) and hash rewriting live
 * in useOptionsHash. useReducedMotion() is needed for the cards' Tailwind hover zoom,
 * which MotionConfig can't reach.
 */

import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';
import { MATERIAL_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import Container from '@/components/layout/Container';
import Lightbox from '@/components/ui/Lightbox';
import type { OptionTabId, OptionTabView } from '../types';
import LineTabs from './LineTabs';
import OptionGrid from './OptionGrid';
import { isOpenable, toLightboxItem } from './optionLightbox';
import { useOptionsHash, writeOptionsHash } from './useOptionsHash';

const SECTION_ID = 'options';
const PANEL_ID = 'options-panel';

export default function MaterialOptions({ tabs }: { tabs: OptionTabView[] }) {
  const t = useTranslation();
  const reduceMotion = useReducedMotion() ?? false;
  const [tabId, setTabId] = useState<OptionTabId>('colours');
  const [sub, setSub] = useState('all');
  const [open, setOpen] = useState<number | null>(null);

  // A new main tab always starts on "All"
  const showTab = (id: OptionTabId) => { setTabId(id); setSub('all'); setOpen(null); };
  useOptionsHash(showTab, SECTION_ID);

  const tab = tabs.find((x) => x.id === tabId) ?? tabs[0];
  const items = sub === 'all' ? tab.items : tab.items.filter((c) => c.sub === sub);
  // Lightbox walks only the openable cards that are on screen, in grid order
  const openable = items.filter(isOpenable);
  const lightboxItems = openable.map(toLightboxItem);

  return (
    <section id={SECTION_ID} aria-labelledby="options-title" className="bg-off-white border-t border-border-light py-16 md:py-20">
      <Container>
        <h2 id="options-title" className="font-bold text-ink-heading text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.01em] mb-8 md:mb-10">
          {t(COPY.optionsTitle.en, COPY.optionsTitle.ar)}
        </h2>

        {/* ── Main tabs ─────────────────────────────────────── */}
        <LineTabs
          tabs={tabs.map((x) => ({ id: x.id, label: x.label }))}
          active={tabId}
          onSelect={(id) => {
            const next = tabs.find((x) => x.id === id)?.id;
            if (!next) return;
            showTab(next);
            writeOptionsHash(next);
          }}
          size="main"
          label={t(COPY.optionsTabs.en, COPY.optionsTabs.ar)}
          idPrefix="opt-tab"
          panelId={PANEL_ID}
        />

        {/* ── Sub tabs ("All" + groups) ─────────────────────── */}
        {/* key = main tab: a fresh row per tab, so its underline starts on "All" instead of gliding */}
        <div className="mt-2">
          <LineTabs
            key={tab.id}
            tabs={[{ id: 'all', label: COPY.all }, ...tab.subs]}
            active={sub}
            onSelect={(id) => { setSub(id); setOpen(null); }}
            size="sub"
            label={`${t(tab.label.en, tab.label.ar)} — ${t(COPY.optionsSub.en, COPY.optionsSub.ar)}`}
            idPrefix={`opt-sub-${tab.id}`}
            panelId={PANEL_ID}
          />
        </div>

        {/* ── Grid ──────────────────────────────────────────── */}
        <div className="mt-8 md:mt-10">
          <OptionGrid
            gridKey={`${tab.id}-${sub}`}
            items={items}
            reduceMotion={reduceMotion}
            lightboxIndex={(card) => { const i = openable.indexOf(card); return i < 0 ? null : i; }}
            onOpen={setOpen}
            panelId={PANEL_ID}
            labelledBy={`opt-tab-${tab.id}`}
          />
        </div>
      </Container>

      <Lightbox items={lightboxItems} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
