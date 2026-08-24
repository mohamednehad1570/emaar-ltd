'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase } from '@phosphor-icons/react'
import { useLanguage, useTranslation } from '@/contexts/LanguageContext'
import { fadeUp, viewportOnce } from '@/lib/motion'
import Container from '@/components/layout/Container'
import CareersJobCard from './CareersJobCard'
import type { DisplayJob } from './types'

// Maps filter keys to possible department string variants (en + ar)
const FILTER_KEYWORDS: Record<string, string[]> = {
  engineering:  ['engineering', 'الهندسة'],
  production:   ['production', 'الإنتاج'],
  sales:        ['sales', 'المبيعات', 'marketing', 'التسويق'],
  admin:        ['administration', 'الإدارة', 'admin'],
}

interface Props {
  jobs: DisplayJob[]
  filters: Record<string, string>
  applyEmail: string
}

// Job listing grid: filter bar + expandable job cards
export default function CareersJobList({ jobs, filters, applyEmail }: Props) {
  const { isRTL } = useLanguage()
  const t = useTranslation()
  const shouldReduce = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState('all')
  const [expandedId, setExpandedId] = useState<string | number | null>(null)

  const filteredJobs = activeFilter === 'all'
    ? jobs
    : jobs.filter(job => {
        const keywords = FILTER_KEYWORDS[activeFilter] ?? []
        return keywords.some(kw => job.departmentKey.includes(kw.toLowerCase()))
      })

  const handleApply = (job: DisplayJob) => {
    window.location.href = `mailto:${applyEmail}?subject=${encodeURIComponent(job.title)}`
  }

  return (
    <section className="py-24 bg-off-white">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-ink-heading mb-4">
            {t('Open Positions', 'الوظائف المتاحة')}
          </h2>
          <div className="h-px w-12 bg-brand-red mx-auto mt-3 mb-5" />
          <p className="text-lg text-ink-muted">{t('Find your perfect role', 'اعثر على دورك المثالي')}</p>
        </motion.div>

        {/* Filter buttons */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {Object.entries(filters).map(([key, label]) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
              onClick={() => setActiveFilter(key)}
              className={`px-6 py-2.5 font-medium transition-all ${
                activeFilter === key
                  ? 'bg-brand-red text-white'
                  : 'bg-surface-white text-ink-muted hover:bg-surface-cream border border-silver-flat/20'
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>

        {/* Job cards */}
        <div className="space-y-6">
          {filteredJobs.map((job, idx) => (
            <motion.div
              key={job.id}
              variants={fadeUp}
              initial={shouldReduce ? {} : 'hidden'}
              whileInView={shouldReduce ? undefined : 'visible'}
              viewport={shouldReduce ? undefined : viewportOnce}
              custom={idx}
            >
              <CareersJobCard
                job={job}
                isExpanded={expandedId === job.id}
                isRTL={isRTL}
                onToggle={() => setExpandedId(expandedId === job.id ? null : job.id)}
                onApply={() => handleApply(job)}
              />
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-20">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-silver-flat" />
            <p className="text-xl text-ink-muted">{t('No positions found', 'لم يتم العثور على وظائف')}</p>
          </div>
        )}
      </Container>
    </section>
  )
}
