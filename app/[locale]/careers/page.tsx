import { JOBS } from '@/lib/data/jobs'
import { SITE_SETTINGS } from '@/lib/data/siteSettings'
import CareersPageClient from '@/components/careers/CareersPageClient'
import PageHeader from '@/components/ui/PageHeader'
import { careersData, PAGE_HEADERS } from '@/lib/data/uiStrings'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import { routeLocale, type LocaleParams } from '@/lib/i18n/routeLocale'

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return pageMetadata('careers', await routeLocale(params), '/careers')
}

export default function CareersPage() {
  return (
    <>
      <PageHeader copy={PAGE_HEADERS.careers} />
      <CareersPageClient
        jobs={JOBS}
        staticData={careersData}
        cvEmail={SITE_SETTINGS.emails.info}
      />
    </>
  )
}
