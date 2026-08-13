import { defineArrayMember, defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'uPVC', value: 'upvc' },
          { title: 'Aluminum', value: 'aluminum' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'spec',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localizedString' }),
            defineField({ name: 'value', title: 'Value', type: 'localizedString' }),
          ],
          preview: {
            select: { title: 'label.en', subtitle: 'value.en' },
          },
        }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({
      name: 'cadFileUrl',
      title: 'CAD File URL',
      type: 'url',
    }),
    // ── Detail-page fields (added Batch 2) ────────────────────────────────
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({ name: 'icon',  title: 'Phosphor Icon Name', type: 'string' }),
            defineField({ name: 'label', title: 'Label',              type: 'localizedString' }),
            defineField({ name: 'value', title: 'Value',              type: 'localizedString' }),
          ],
          preview: { select: { title: 'label.en', subtitle: 'icon' } },
        }),
      ],
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'product' }] })],
    }),
    defineField({ name: 'thermalValue',    title: 'Thermal Value',    type: 'string', description: 'e.g. 1.1 W/m²K' }),
    defineField({ name: 'acousticRating',  title: 'Acoustic Rating',  type: 'string', description: 'e.g. Rw 42 dB'   }),
    defineField({ name: 'warranty',        title: 'Warranty',         type: 'string', description: 'e.g. 10 Years'   }),
    defineField({ name: 'dimensions',      title: 'Dimensions',       type: 'string', description: 'e.g. Custom — up to 2400×2400 mm' }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'category', media: 'images.0' },
  },
})
