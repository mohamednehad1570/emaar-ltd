import { defineArrayMember, defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Villas', value: 'villas' },
          { title: 'Buildings', value: 'buildings' },
          { title: 'High-Rise / Towers', value: 'towers' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'materialsUsed',
      title: 'Materials Used',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          options: {
            list: [
              { title: 'uPVC', value: 'upvc' },
              { title: 'Aluminum', value: 'aluminum' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.min(2000).max(2100).integer(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'localizedString',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'localizedString',
    }),
    defineField({
      name: 'scope',
      title: 'Scope of Work',
      type: 'localizedString',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localizedString' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: {
            select: { title: 'label.en', subtitle: 'value' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'type', media: 'images.0' },
  },
})
