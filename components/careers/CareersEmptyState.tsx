'use client'

/** Shown in place of the job list while JOBS is empty — routes candidates to email instead. */

import { Briefcase } from '@phosphor-icons/react'
import { useTranslation } from '@/contexts/LanguageContext'
import Button from '@/components/ui/Button'
import Container from '@/components/layout/Container'

interface Props {
  email: string
}

export default function CareersEmptyState({ email }: Props) {
  const t = useTranslation()

  return (
    <section className="py-20 bg-off-white">
      <Container className="flex flex-col items-center text-center gap-5">
        {/* text-ink-muted = #7F8C8D; light weight matches the line-icon empty-state spec */}
        <Briefcase size={24} weight="light" className="text-ink-muted" aria-hidden="true" />
        <p className="text-lg text-ink-body max-w-xl">
          {t(
            'No open positions right now — send us your CV',
            'لا توجد وظائف شاغرة حالياً — أرسل لنا سيرتك الذاتية',
          )}
        </p>
        {/* outline = the secondary button on light backgrounds */}
        <Button variant="outline" href={`mailto:${email}`}>
          {t('Send your CV', 'أرسل سيرتك الذاتية')}
        </Button>
      </Container>
    </section>
  )
}
