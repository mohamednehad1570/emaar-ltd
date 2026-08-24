'use client';

import { useState, useMemo } from 'react'; // useMemo retained for filteredDocuments
import { motion, useReducedMotion } from 'framer-motion';
import { FileText, Archive } from '@phosphor-icons/react';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppURL } from '@/lib/whatsapp';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { useTechDocuments } from '@/lib/hooks/useTechDocuments';
import type { TechDocument } from '@/lib/sanity/types';
import type { TechContent } from '@/lib/data/uiStrings';
import TechFilters from './TechFilters';
import TechDocumentGrid from './TechDocumentGrid';
import type { DisplayDocument } from './TechDocumentCard';

interface TechnicalPageClientProps {
  cmsDocs: TechDocument[];
  staticData: Record<'en' | 'ar', TechContent>;
}

export default function TechnicalPageClient({ cmsDocs, staticData }: TechnicalPageClientProps) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const sd = staticData[language];

  const [activeCategory, setActiveCategory]       = useState('all');
  const [searchQuery, setSearchQuery]             = useState('');
  const [viewMode, setViewMode]                   = useState<'grid' | 'list'>('grid');
  const [filterProductType, setFilterProductType] = useState('all');
  const [downloadingIds, setDownloadingIds]       = useState<Record<string, boolean>>({});
  const [unavailableId, setUnavailableId]         = useState<string | null>(null);

  // Normalisation + filter-option derivation extracted to hook to stay under 150 lines
  const { allDocuments, categoryOptions, productTypeOptions } = useTechDocuments(cmsDocs, sd, language);

  const filteredDocuments = useMemo(() => {
    let docs = allDocuments;
    if (activeCategory !== 'all')   docs = docs.filter(d => d.category === activeCategory);
    if (filterProductType !== 'all') docs = docs.filter(d => d.productType === filterProductType);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      docs = docs.filter(d => d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q));
    }
    return docs;
  }, [allDocuments, activeCategory, filterProductType, searchQuery]);

  const handleDownload = (doc: DisplayDocument) => {
    if (!doc.fileUrl) {
      setUnavailableId(doc.id);
      setTimeout(() => setUnavailableId(prev => (prev === doc.id ? null : prev)), 3000);
      return;
    }
    setDownloadingIds(prev => ({ ...prev, [doc.id]: true }));
    // Programmatic anchor click — the only cross-browser way to force a download
    const a = document.createElement('a');
    a.href = doc.fileUrl;
    a.download = doc.name;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setDownloadingIds(prev => { const n = { ...prev }; delete n[doc.id]; return n; }), 2000);
  };

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-ink-heading mb-6">{sd.hero.title}</h1>
            <p className="text-2xl font-semibold text-brand-red mb-4">{sd.hero.subtitle}</p>
            <p className="text-lg text-ink-body max-w-3xl mx-auto">{sd.hero.description}</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={shouldReduce ? {} : staggerContainer}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
            {sd.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={shouldReduce ? {} : fadeUp}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-brand-red mb-2">{stat.number}</div>
                <div className="text-ink-body font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <TechFilters
        categoryOptions={categoryOptions} activeCategory={activeCategory} onCategoryChange={setActiveCategory}
        productTypeOptions={productTypeOptions} activeProductType={filterProductType} onProductTypeChange={setFilterProductType}
        searchQuery={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder={sd.search.placeholder}
        viewMode={viewMode} onViewModeChange={setViewMode} isRTL={isRTL} language={language}
      />

      {/* ── Documents ────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-ink-body">
              {language === 'en' ? `${filteredDocuments.length} documents found` : `تم العثور على ${filteredDocuments.length} وثيقة`}
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-silver-material text-white font-semibold">
              <Archive className="w-5 h-5" />
              {sd.actions.downloadAll}
            </button>
          </div>
          <TechDocumentGrid
            documents={filteredDocuments} viewMode={viewMode} language={language} isRTL={isRTL}
            downloadingIds={downloadingIds} unavailableId={unavailableId}
            onDownload={handleDownload} noResultsLabel={sd.search.noResults}
          />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <FileText className="w-16 h-16 mx-auto mb-6 text-silver-material" />
            <h2 className="text-4xl font-bold mb-4">{sd.cta.title}</h2>
            <p className="text-xl text-white/70 mb-8">{sd.cta.description}</p>
            {/* ghost on dark section bg */}
            <Button
              variant="ghost" size="lg"
              href={getWhatsAppURL({ page: 'technical' })}
              target="_blank" rel="noopener noreferrer"
            >
              {sd.cta.button}
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
