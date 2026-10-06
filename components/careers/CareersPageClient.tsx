'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users } from '@phosphor-icons/react'
import { useLanguage, useTranslation } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import { fadeUp, viewportOnce } from '@/lib/motion'
import Container from '@/components/layout/Container'
import CareersCulture from './CareersCulture'
import CareersJobList from './CareersJobList'
import CareersEmptyState from './CareersEmptyState'
import type { DisplayJob } from './types'
import type { Job } from '@/lib/types'
import type { careersData } from '@/lib/data/uiStrings'

interface Props {
  jobs: Job[]
  // Culture, filters, and CTA copy — vacancies come from the jobs prop
  staticData: typeof careersData
  cvEmail: string
}

// Flatten a bilingual Job to the active language; departmentKey stays English for filter matching
function toDisplayJob(job: Job, lang: 'en' | 'ar'): DisplayJob {
  return {
    id:               job.id,
    title:            job.title[lang],
    department:       job.department[lang],
    departmentKey:    job.department.en.toLowerCase(),
    location:         job.location[lang],
    type:             job.type,
    experience:       job.experience?.[lang] ?? '',
    salary:           '',
    description:      job.description[lang],
    responsibilities: job.responsibilities[lang],
    requirements:     job.requirements[lang],
    benefits:         job.benefits?.[lang] ?? [],
  }
}

export default function CareersPageClient({ jobs, staticData, cvEmail }: Props) {
  const { language, isRTL } = useLanguage()
  const t = useTranslation()

  const displayJobs = useMemo<DisplayJob[]>(
    () => jobs.map(job => toDisplayJob(job, language)),
    [jobs, language],
  )

  const td = staticData[language]

  return (
    <div className={`min-h-screen bg-off-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero replaced by PageHeader in page.tsx */}
      <CareersCulture
        title={td.culture.title}
        subtitle={td.culture.subtitle}
        values={td.culture.values}
        stats={td.culture.stats}
      />
      {/* ── Openings — empty state until JOBS has entries ────────── */}
      {displayJobs.length > 0 ? (
        <CareersJobList
          jobs={displayJobs}
          filters={td.filters}
          applyEmail={td.application.email}
        />
      ) : (
        <CareersEmptyState email={cvEmail} />
      )}

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
            {/* ghost variant on dark section bg-brand-dark */}
            <Button variant="ghost" size="lg" href={`mailto:${td.application.email}`}>
              {t(td.cta.button, td.cta.button)}
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
