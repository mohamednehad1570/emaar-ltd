'use client';

import React, { useState, useMemo } from 'react';
import { motion , useReducedMotion } from 'framer-motion';
import {
  FileText, DownloadSimple as Download, MagnifyingGlass as Search, Funnel as Filter, Eye,
  FolderOpen, Package, Wrench, BookOpen,
  Medal as Award, Stack as Layers, CheckCircle, Archive,
  GridFour as Grid, List, ArrowSquareOut as ExternalLink, Calendar
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { techData, DownloadFile } from '@/lib/data/tech';

export default function TechnicalDownloadsPage() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterProduct, setFilterProduct] = useState('all');
  /* Per-file downloading flag — shows spinner on the clicked button for 2s */
  const [downloadingIds, setDownloadingIds] = useState<Record<number, boolean>>({});
  /* Which file ID just showed the "not available" notice — clears after 3s */
  const [unavailableId, setUnavailableId] = useState<number | null>(null);

  const t = techData[language];


  // Category icons
  const categoryIcons = {
    specs: FileText,
    cad: Layers,
    installation: Wrench,
    maintenance: Package,
    brochures: BookOpen,
    certifications: Award
  };

  // Filter files
  const filteredFiles = useMemo(() => {
    let filtered = t.files;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(file => file.category === activeCategory);
    }

    // Filter by product type
    if (filterProduct !== 'all') {
      filtered = filtered.filter(file => file.productType === filterProduct);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(file =>
        file.name.toLowerCase().includes(query) ||
        file.type.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeCategory, filterProduct, searchQuery, t.files]);

  const handleDownload = (file: DownloadFile) => {
    if (!file.downloadUrl) {
      /* File pending — show inline notice, auto-clear after 3s */
      setUnavailableId(file.id);
      setTimeout(
        () => setUnavailableId(prev => (prev === file.id ? null : prev)),
        3000
      );
      return;
    }

    /* Mark this file as downloading — resets after browser dialog opens (~2s) */
    setDownloadingIds(prev => ({ ...prev, [file.id]: true }));

    /* Programmatic anchor click — the only cross-browser way to force a download */
    const anchor = document.createElement('a');
    anchor.href = file.downloadUrl;
    anchor.download = file.name;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    setTimeout(() => {
      setDownloadingIds(prev => {
        const next = { ...prev };
        delete next[file.id];
        return next;
      });
    }, 2000);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-brand-bg via-white to-brand-bg ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-brand-silver/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-br from-brand-red/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-silver via-brand-dark to-brand-silver bg-clip-text text-transparent">
                {t.hero.title}
              </span>
            </h1>
            <p className="text-3xl font-semibold text-brand-red mb-4">
              {t.hero.subtitle}
            </p>
            <p className="text-lg text-text-body max-w-3xl mx-auto">
              {t.hero.description}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {t.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-red to-brand-silver bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-text-body font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filters & Search — sticky below 52px header ───────────────── */}
      {/* top-[52px] offsets the fixed 52px header exactly */}
      <section className="bg-white sticky top-[52px] z-40 border-b border-border-light">
        <div className="max-w-7xl mx-auto">

          {/* ── Category tabs ─────────────────────────────────────────────
              border-b on this row is the separator; active tab's motion.div
              sits flush at bottom-0, overlapping that border with brand-red. */}
          <div
            className={`border-b border-border-light flex overflow-x-auto ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
          >
            {Object.entries(t.categories).map(([key, label]) => {
              const Icon = key === 'all'
                ? FolderOpen
                : categoryIcons[key as keyof typeof categoryIcons];
              const isActive = activeCategory === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`
                    group relative flex items-center gap-2
                    px-5 py-3 text-sm font-cairo whitespace-nowrap
                    transition-colors duration-150
                    ${isActive
                      ? 'text-brand-dark font-bold'
                      : 'text-text-muted font-semibold hover:text-brand-dark'}
                  `}
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
                  <span>{label}</span>

                  {/* Hover underline — silver, only rendered when tab is inactive */}
                  {!isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-silver opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      aria-hidden="true"
                    />
                  )}

                  {/* Active underline — layoutId slides it between tabs smoothly */}
                  {isActive && (
                    <motion.div
                      layoutId="tab-underline"
                      /* stiffness 400 / damping 30 — snappy but not jarring */
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Secondary row: search + product chips + view toggle ────── */}
          <div
            className={`flex flex-col md:flex-row md:items-center gap-3 px-4 py-3 ${
              isRTL ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Search — 48px (h-12), 0px radius, focus → border-brand-silver */}
            <div className="relative flex-1 min-w-0">
              <Search
                className={`absolute top-1/2 -translate-y-1/2 ${
                  isRTL ? 'right-4' : 'left-4'
                } w-4 h-4 text-text-muted pointer-events-none`}
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search.placeholder}
                className={`
                  w-full h-12 bg-white text-sm text-text-body
                  border border-border-light
                  focus:border-brand-silver focus:outline-none
                  placeholder:text-dim
                  transition-colors duration-150
                  ${isRTL ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4'}
                `}
              />
            </div>

            {/* Product filter chips */}
            <div
              className={`flex items-center gap-2 overflow-x-auto ${
                isRTL ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Label — text-text-muted; no Tailwind default grays */}
              <span
                className={`text-xs font-semibold text-text-muted uppercase tracking-wide shrink-0 flex items-center gap-1 ${
                  isRTL ? 'flex-row-reverse' : ''
                }`}
              >
                <Filter className="w-3.5 h-3.5" aria-hidden="true" />
                {t.productFilter.title}
              </span>

              {Object.entries(t.productFilter).slice(1).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilterProduct(key)}
                  className={`
                    px-4 py-2 text-sm font-cairo whitespace-nowrap
                    border transition-colors duration-150
                    ${filterProduct === key
                      ? 'bg-cream border-brand-silver text-brand-dark font-semibold'
                      : 'bg-white border-border-light text-text-muted hover:border-brand-silver hover:text-brand-dark'}
                  `}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Grid / List toggle — 36×36px square, border, sharp */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                aria-label={language === 'en' ? 'Grid view' : 'عرض الشبكة'}
                aria-pressed={viewMode === 'grid'}
                className={`
                  w-9 h-9 flex items-center justify-center
                  border transition-colors duration-150
                  ${viewMode === 'grid'
                    ? 'bg-cream border-brand-silver text-text-heading'
                    : 'bg-white border-border-light text-text-muted hover:border-brand-silver hover:text-text-heading'}
                `}
              >
                <Grid className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label={language === 'en' ? 'List view' : 'عرض القائمة'}
                aria-pressed={viewMode === 'list'}
                className={`
                  w-9 h-9 flex items-center justify-center
                  border transition-colors duration-150
                  ${viewMode === 'list'
                    ? 'bg-cream border-brand-silver text-text-heading'
                    : 'bg-white border-border-light text-text-muted hover:border-brand-silver hover:text-text-heading'}
                `}
              >
                <List className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Files Grid/List */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-text-body">
              {language === 'en'
                ? `${filteredFiles.length} documents found`
                : `تم العثور على ${filteredFiles.length} وثيقة`
              }
            </p>
            <button className="flex items-center gap-2 px-6 py-3 rounded-none bg-gradient-to-r from-brand-silver to-brand-silver text-white font-semibold transition-all">
              <Archive className="w-5 h-5" />
              {t.actions.downloadAll}
            </button>
          </div>

          {filteredFiles.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 mx-auto mb-4 text-dim" />
              <p className="text-xl text-text-muted">{t.search.noResults}</p>
            </div>
          ) : viewMode === 'grid' ? (
            // Grid View
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFiles.map((file, idx) => {
                const Icon = categoryIcons[file.category as keyof typeof categoryIcons];
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-sm overflow-hidden border-2 border-transparent hover:border-brand-silver transition-all"
                  >
                    {/* Preview Image */}
                    {file.preview && (
                      <div className="relative h-48 overflow-hidden bg-off-white">
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 right-4 flex gap-2">
                          {/* format badge: rounded-none */}
                          <span className="px-3 py-1 rounded-none bg-white/90 backdrop-blur-sm text-xs font-bold text-brand-red">
                            {file.format}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-brand-red/10 to-brand-silver/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-brand-red" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-brand-dark mb-1 line-clamp-2">
                            {file.name}
                          </h3>
                          <p className="text-sm text-text-muted">{file.type}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {file.downloads}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDownload(file)}
                          disabled={downloadingIds[file.id]}
                          className="flex-1 px-4 py-2 rounded-none bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                        >
                          {downloadingIds[file.id] ? (
                            <>
                              {/* Spinner reuses the border-t-white pattern from the contact form */}
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              {language === 'en' ? 'Downloading…' : 'جارٍ التحميل…'}
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              {t.actions.download}
                            </>
                          )}
                        </button>
                        <button className="px-4 py-2 rounded-none border-2 border-border-light hover:border-brand-red transition-colors">
                          <Eye className="w-4 h-4 text-text-body" />
                        </button>
                      </div>

                      {/* ── Unavailable notice — shown when downloadUrl is absent ── */}
                      {unavailableId === file.id && (
                        <p className="mt-2 text-xs font-semibold text-brand-red" role="alert">
                          {language === 'en' ? 'File not available yet.' : 'الملف غير متاح بعد.'}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            // List View
            <div className="space-y-4">
              {filteredFiles.map((file, idx) => {
                const Icon = categoryIcons[file.category as keyof typeof categoryIcons];
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-sm p-6 border-2 border-transparent hover:border-brand-silver transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-brand-red/10 to-brand-silver/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-brand-red" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-brand-dark mb-1">
                          {file.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-text-muted">
                          <span>{file.type}</span>
                          <span>•</span>
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{file.format}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {file.downloads}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownload(file)}
                            disabled={downloadingIds[file.id]}
                            className="px-6 py-2 rounded-none bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-semibold transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                          >
                            {downloadingIds[file.id] ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                {language === 'en' ? 'Downloading…' : 'جارٍ التحميل…'}
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4" />
                                {t.actions.download}
                              </>
                            )}
                          </button>
                          <button className="px-4 py-2 rounded-none border-2 border-border-light hover:border-brand-red transition-colors">
                            <Eye className="w-4 h-4 text-text-body" />
                          </button>
                        </div>
                        {/* Unavailable notice — right-aligned to stay near the button */}
                        {unavailableId === file.id && (
                          <p className="text-xs font-semibold text-brand-red" role="alert">
                            {language === 'en' ? 'File not available yet.' : 'الملف غير متاح بعد.'}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-brand-dark to-brand-dark-mid text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={shouldReduce ? undefined : { once: true }}
          >
            <FileText className="w-16 h-16 mx-auto mb-6 text-brand-silver" />
            <h2 className="text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-xl text-dim mb-8">{t.cta.description}</p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-none bg-white text-brand-red font-semibold text-lg shadow-warm-xl"
              >
                {t.cta.button}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
