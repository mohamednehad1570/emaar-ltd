import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import type { StructureResolver } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

const SINGLETON_TYPES = ['siteSettings'] as const

const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.includes(item.getId() as (typeof SINGLETON_TYPES)[number]),
      ),
    ])

export default defineConfig({
  name: 'default',
  title: 'Emaar International Website',

  projectId: 'wv4sqx1y',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
# updated Thu Sep  3 08:53:11 PM EEST 2026
