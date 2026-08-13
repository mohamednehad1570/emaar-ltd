import { getJobPostings } from '@/lib/sanity/fetch'
import CareersPageClient from '@/components/careers/CareersPageClient'
import { careersData } from '@/lib/data/careers'

export const revalidate = 3600

export default async function CareersPage() {
  const jobPostings = await getJobPostings()
  return (
    <CareersPageClient
      jobPostings={jobPostings}
      staticData={careersData}
    />
  )
}
