import { JOBS } from '@/lib/data/jobs'
import { SITE_SETTINGS } from '@/lib/data/siteSettings'
import CareersPageClient from '@/components/careers/CareersPageClient'
import PageHeader from '@/components/ui/PageHeader'
import { careersData } from '@/lib/data/uiStrings'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata = generatePageMetadata({
  title:       'Careers',
  description: 'Join Emaar International\'s growing team. Explore open positions in fenestration manufacturing, installation, and sales across the UAE.',
  path:        '/careers',
})

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join Us"
        title="Careers at Emaar"
        titleAr="وظائف في إعمار"
        description="Join a 26-year manufacturing leader in the UAE."
        chips={['Sharjah, UAE', 'SAIF Zone']}
      />
      <CareersPageClient
        jobs={JOBS}
        staticData={careersData}
        cvEmail={SITE_SETTINGS.emails.info}
      />
    </>
  )
}
