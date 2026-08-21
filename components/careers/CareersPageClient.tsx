'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users } from '@phosphor-icons/react'
import { useLanguage, useTranslation } from '@/contexts/LanguageContext'
import { fadeUp, viewportOnce } from '@/lib/motion'
import Container from '@/components/layout/Container'
import CareersHero from './CareersHero'
import CareersCulture from './CareersCulture'
import CareersJobList from './CareersJobList'
import type { DisplayJob } from './types'
import type { JobPosting } from '@/lib/sanity/types'
import { careersData, type CareersJob } from '@/lib/data/uiStrings'

interface Props {
  jobPostings: JobPosting[]
  staticData: typeof careersData
}

// Map a Sanity JobPosting to the normalized DisplayJob shape
function normalizeCmsJob(job: JobPosting, lang: 'en' | 'ar'): DisplayJob {
  return {
    id:            job._id,
    title:         job.title[lang] ?? job.title.en,
    department:    job.department ?? '',
    departmentKey: (job.department ?? '').toLowerCase(),
    location:      job.location?.[lang] ?? job.location?.en ?? 'Sharjah, UAE',
    type:          job.type ?? '',
    experience:    job.experience ?? '',
    salary:        job.salary ?? '',
    description:   job.description?.[lang] ?? job.description?.en ?? '',
    // Requirements is a multiline LocalizedText — split on newlines for bullets
    requirements:  (job.requirements?.[lang] ?? job.requirements?.en ?? '')
                     .split('\n').filter(Boolean),
    responsibilities: (job.responsibilities ?? []).map(r => r[lang] ?? r.en),
    benefits:         (job.benefits ?? []).map(b => b[lang] ?? b.en),
  }
}

// Map a static CareersJob; enDept carries the English department name for filtering
function normalizeStaticJob(job: CareersJob, enDept: string): DisplayJob {
  return {
    id:               job.id,
    title:            job.title,
    department:       job.department,
    departmentKey:    enDept.toLowerCase(),
    location:         job.location,
    type:             job.type,
    experience:       job.experience,
    salary:           job.salary,
    description:      job.description,
    responsibilities: job.responsibilities,
    requirements:     job.requirements,
    benefits:         job.benefits,
  }
}

export default function CareersPageClient({ jobPostings, staticData }: Props) {
  const { language, isRTL } = useLanguage()
  const t = useTranslation()

  const displayJobs = useMemo<DisplayJob[]>(() => {
    if (jobPostings.length > 0) {
      return jobPostings.map(job => normalizeCmsJob(job, language))
    }
    const locJobs = staticData[language].jobs
    const enJobs  = staticData.en.jobs
    return locJobs.map((job, i) =>
      normalizeStaticJob(job, enJobs[i]?.department ?? job.department),
    )
  }, [jobPostings, language, staticData])

  const td = staticData[language]

  return (
    <div className={`min-h-screen bg-off-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <CareersHero
        title={td.hero.title}
        subtitle={td.hero.subtitle}
        description={td.hero.description}
      />
      <CareersCulture
        title={td.culture.title}
        subtitle={td.culture.subtitle}
        values={td.culture.values}
        stats={td.culture.stats}
      />
      <CareersJobList
        jobs={displayJobs}
        filters={td.filters}
        applyEmail={td.application.email}
      />

      {/* CTA — dark background, no gradient */}
      <section className="py-24 bg-brand-dark text-white">
        <Container>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-4xl mx-auto text-center"
          >
            <Users className="w-16 h-16 mx-auto mb-6 text-silver-flat" />
            <h2 className="text-4xl font-bold mb-4">{td.cta.title}</h2>
            <p className="text-xl text-white/70 mb-8">{td.cta.description}</p>
            <a href={`mailto:${td.application.email}`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="px-8 py-4 bg-white hover:bg-surface-cream text-brand-red font-semibold text-lg transition-colors"
              >
                {t(td.cta.button, td.cta.button)}
              </motion.button>
            </a>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
