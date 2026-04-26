'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, Search, Filter, Eye,
  FolderOpen, Package, Wrench, BookOpen,
  Award, Layers, CheckCircle, Archive,
  Grid, List, ExternalLink, Calendar
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { techData, DownloadFile } from '@/lib/data/tech';

export default function TechnicalDownloadsPage() {
  const { language, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterProduct, setFilterProduct] = useState('all');

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
    // Simulate download
    console.log('Downloading:', file.name);
    // In production, trigger actual file download
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
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 px-6 bg-white/50 backdrop-blur-sm sticky top-20 z-40 border-y border-gray-200">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Search & View Toggle */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search.placeholder}
                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 rounded-xl border-2 border-gray-200 focus:border-brand-red focus:outline-none transition-colors`}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-colors ${viewMode === 'grid'
                  ? 'bg-brand-red text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-colors ${viewMode === 'list'
                  ? 'bg-brand-red text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className={`flex flex-wrap gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
            {Object.entries(t.categories).map(([key, label]) => {
              const Icon = key === 'all' ? FolderOpen : categoryIcons[key as keyof typeof categoryIcons];
              return (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${activeCategory === key
                    ? 'bg-gradient-to-r from-brand-silver to-brand-dark text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Product Type Filter */}
          <div className={`flex flex-wrap gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
            <span className="flex items-center gap-2 text-gray-700 font-semibold">
              <Filter className="w-4 h-4" />
              {t.productFilter.title}:
            </span>
            {Object.entries(t.productFilter).slice(1).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilterProduct(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filterProduct === key
                  ? 'bg-brand-red text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Files Grid/List */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              {language === 'en'
                ? `${filteredFiles.length} documents found`
                : `تم العثور على ${filteredFiles.length} وثيقة`
              }
            </p>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-silver to-brand-silver text-white font-semibold hover:shadow-lg transition-shadow">
              <Archive className="w-5 h-5" />
              {t.actions.downloadAll}
            </button>
          </div>

          {filteredFiles.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-xl text-gray-500">{t.search.noResults}</p>
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
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {/* Preview Image */}
                    {file.preview && (
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-brand-red">
                            {file.format}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-red/10 to-brand-silver/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-brand-red" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">
                            {file.name}
                          </h3>
                          <p className="text-sm text-gray-500">{file.type}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
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
                          className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          {t.actions.download}
                        </button>
                        <button className="px-4 py-2 rounded-xl border-2 border-gray-200 hover:border-brand-red transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
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
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-red/10 to-brand-silver/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-brand-red" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 mb-1">
                          {file.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
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

                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleDownload(file)}
                          className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-semibold hover:shadow-lg transition-shadow flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          {t.actions.download}
                        </button>
                        <button className="px-4 py-2 rounded-xl border-2 border-gray-200 hover:border-brand-red transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
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
      <section className="py-20 px-6 bg-gradient-to-br from-brand-dark to-[#333333] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FileText className="w-16 h-16 mx-auto mb-6 text-brand-silver" />
            <h2 className="text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-xl text-gray-300 mb-8">{t.cta.description}</p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-white text-brand-red font-semibold text-lg shadow-xl"
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
