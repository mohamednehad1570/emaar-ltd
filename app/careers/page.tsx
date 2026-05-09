'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, CurrencyDollar as DollarSign, Users, CheckCircle, CaretDown as ChevronDown, Buildings as Building2 } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { careersData, CareersJob } from '@/lib/data/careers';
import { resolveIcon } from '@/lib/iconMap';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function CareersPage() {
  const { language, isRTL } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const t = careersData[language];

  const filteredJobs = activeFilter === 'all'
    ? t.jobs
    : t.jobs.filter(job => {
        const deptMap: Record<string, string> = {
          engineering: language === 'en' ? 'Engineering' : 'الهندسة',
          production: language === 'en' ? 'Production' : 'الإنتاج',
          sales: language === 'en' ? 'Sales' : 'المبيعات',
          admin: language === 'en' ? 'Administration' : 'الإدارة',
        };
        return job.department === deptMap[activeFilter];
      });

  const handleApply = (job: CareersJob) => {
    window.location.href = `mailto:${t.application.email}?subject=${encodeURIComponent(job.title)}`;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-brand-bg via-white to-brand-bg ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-silver/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-red to-brand-silver bg-clip-text text-transparent">{t.hero.title}</span>
            </h1>
            <p className="text-3xl font-semibold text-brand-dark mb-4">{t.hero.subtitle}</p>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto">{t.hero.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t.culture.title}</h2>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto">{t.culture.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {t.culture.values.map((value, idx) => {
              const Icon = resolveIcon(value.icon);
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -5 }} className="bg-white rounded-2xl shadow-warm-lg p-8 hover:shadow-xl transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-brand-red" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">{value.title}</h3>
                  <p className="text-brand-gray">{value.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.culture.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-red to-brand-silver bg-clip-text text-transparent mb-2">{stat.number}</div>
                <div className="text-brand-gray font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 px-6 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">{language === 'en' ? 'Open Positions' : 'الوظائف المتاحة'}</h2>
            <p className="text-lg text-brand-gray">{language === 'en' ? 'Find your perfect role' : 'اعثر على دورك المثالي'}</p>
          </motion.div>

          <div className={`flex flex-wrap justify-center gap-3 mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {Object.entries(t.filters).map(([key, label]) => (
              <motion.button key={key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveFilter(key)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${activeFilter === key ? 'bg-brand-red text-white shadow-lg' : 'bg-white text-brand-gray hover:bg-brand-bg border border-brand-silver/20'}`}>
                {label}
              </motion.button>
            ))}
          </div>

          <div className="space-y-6">
            {filteredJobs.map((job, idx) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-3xl shadow-warm-lg overflow-hidden">
                <button onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)} className="w-full p-6 lg:p-8 text-left hover:bg-brand-bg transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-6 h-6 text-brand-red" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-brand-dark mb-2">{job.title}</h3>
                          <p className="text-brand-gray">{job.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1 text-brand-gray"><Building2 className="w-4 h-4 text-brand-red" />{job.department}</span>
                        <span className="flex items-center gap-1 text-brand-gray"><MapPin className="w-4 h-4 text-brand-red" />{job.location}</span>
                        <span className="flex items-center gap-1 text-brand-gray"><Clock className="w-4 h-4 text-brand-red" />{job.type}</span>
                        <span className="flex items-center gap-1 text-brand-gray"><Briefcase className="w-4 h-4 text-brand-red" />{job.experience}</span>
                        <span className="flex items-center gap-1 font-semibold text-brand-red"><DollarSign className="w-4 h-4" />{job.salary}</span>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: expandedJob === job.id ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
                      <ChevronDown className="w-6 h-6 text-brand-red" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedJob === job.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="px-6 lg:px-8 pb-8 border-t border-brand-silver/10">
                        <div className="grid md:grid-cols-3 gap-8 mt-6">
                          <div>
                            <h4 className="font-bold text-lg text-brand-dark mb-3">{language === 'en' ? 'Responsibilities' : 'المسؤوليات'}</h4>
                            <ul className="space-y-2">{job.responsibilities.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-brand-gray"><CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-brand-dark mb-3">{language === 'en' ? 'Requirements' : 'المتطلبات'}</h4>
                            <ul className="space-y-2">{job.requirements.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-brand-gray"><CheckCircle className="w-4 h-4 text-brand-silver flex-shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-brand-dark mb-3">{language === 'en' ? 'Benefits' : 'المزايا'}</h4>
                            <ul className="space-y-2">{job.benefits.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-brand-gray"><CheckCircle className="w-4 h-4 text-brand-silver flex-shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>
                          </div>
                        </div>
                        <div className="mt-8">
                          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleApply(job)} className="w-full px-8 py-4 rounded-xl bg-brand-red text-white font-bold text-lg shadow-warm-lg hover:bg-brand-red-dark transition-all">
                            {language === 'en' ? 'Apply Now' : 'تقدم الآن'}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-20">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-brand-silver" />
              <p className="text-xl text-brand-gray">{language === 'en' ? 'No positions found' : 'لم يتم العثور على وظائف'}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-brand-dark to-brand-dark-mid text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <Users className="w-16 h-16 mx-auto mb-6 text-brand-silver" />
            <h2 className="text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-xl text-white/70 mb-8">{t.cta.description}</p>
            <a href={`mailto:${t.application.email}`}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 rounded-full bg-white text-brand-red font-semibold text-lg shadow-xl">
                {t.cta.button}
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
