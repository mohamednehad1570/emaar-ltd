/**
 * app/[locale]/upvc/page.tsx
 * upvc material landing — static server route; data comes from lib/data/catalog.
 */

import type { Metadata } from 'next';
import MaterialPage from '@/components/catalog/material/MaterialPage';
import { pageMetadata } from '@/lib/seo/metadata';
import { routeLocale, type LocaleParams } from '@/lib/i18n/routeLocale';
import { materialPageProps } from '@/lib/catalogPageData';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return pageMetadata('upvc', await routeLocale(params), '/upvc');
}

export default function Page() {
  return <MaterialPage {...materialPageProps('upvc')} />;
}
