'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  MapPin,
  Clock,
  CurrencyDollar as DollarSign,
  CheckCircle,
  CaretDown as ChevronDown,
  Buildings as Building2,
} from '@phosphor-icons/react'
import { useTranslation } from '@/contexts/LanguageContext'
import type { DisplayJob } from './types'

interface Props {
  job: DisplayJob
  isExpanded: boolean
  isRTL: boolean
  onToggle: () => void
  onApply: () => void
}

// Single expandable job card — used by CareersJobList
export default function CareersJobCard({ job, isExpanded, isRTL, onToggle, onApply }: Props) {
  const t = useTranslation()

  return (
    <div className="bg-surface-white overflow-hidden border-2 border-transparent hover:border-silver-flat transition-colors">
      <button
        onClick={onToggle}
        className={`w-full p-6 lg:p-8 ${isRTL ? 'text-right' : 'text-left'} hover:bg-off-white transition-colors`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-brand-red" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-ink-heading mb-2">{job.title}</h3>
                <p className="text-ink-muted">{job.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1 text-ink-muted"><Building2 className="w-4 h-4 text-brand-red" />{job.department}</span>
              <span className="flex items-center gap-1 text-ink-muted"><MapPin className="w-4 h-4 text-brand-red" />{job.location}</span>
              <span className="flex items-center gap-1 text-ink-muted"><Clock className="w-4 h-4 text-brand-red" />{job.type}</span>
              <span className="flex items-center gap-1 text-ink-muted"><Briefcase className="w-4 h-4 text-brand-red" />{job.experience}</span>
              <span className="flex items-center gap-1 font-semibold text-brand-red"><DollarSign className="w-4 h-4" />{job.salary}</span>
            </div>
          </div>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
            <ChevronDown className="w-6 h-6 text-brand-red" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 lg:px-8 pb-8 border-t border-silver-flat/20">
              <div className="grid md:grid-cols-3 gap-8 mt-6">
                <div>
                  <h4 className="font-bold text-lg text-ink-heading mb-3">{t('Responsibilities', 'المسؤوليات')}</h4>
                  <ul className="space-y-2">
                    {job.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
                        <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" /><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-ink-heading mb-3">{t('Requirements', 'المتطلبات')}</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
                        <CheckCircle className="w-4 h-4 text-silver-flat flex-shrink-0 mt-0.5" /><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-ink-heading mb-3">{t('Benefits', 'المزايا')}</h4>
                  <ul className="space-y-2">
                    {job.benefits.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
                        <CheckCircle className="w-4 h-4 text-silver-flat flex-shrink-0 mt-0.5" /><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onApply}
                  className="w-full px-8 py-4 bg-brand-red text-white font-bold text-lg hover:bg-brand-red-deep transition-colors"
                >
                  {t('Apply Now', 'تقدم الآن')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
