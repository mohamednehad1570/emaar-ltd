import { getJobPostings } from '@/lib/sanity/fetch'
import CareersPageClient from '@/components/careers/CareersPageClient'
import PageHeader from '@/components/ui/PageHeader'
import { careersData } from '@/lib/data/uiStrings'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata = generatePageMetadata({
  title:       'Careers',
  description: 'Join Emaar International\'s growing team. Explore open positions in fenestration manufacturing, installation, and sales across the UAE.',
  path:        '/careers',
})

export default async function CareersPage() {
  const jobPostings = await getJobPostings()
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
        jobPostings={jobPostings}
        staticData={careersData}
      />
    </>
  )
}
