import { defineArrayMember, defineField, defineType } from 'sanity'

export const project = defineType({
  name:  'project',
  title: 'Project',
  type:  'document',

  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'media',    title: 'Photos'                  },
    { name: 'content',  title: 'Details'                 },
  ],

  fields: [
    defineField({
      name:       'title',
      title:      'Title',
      type:       'localizedString',
      group:      'identity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name:       'slug',
      title:      'Slug',
      type:       'slug',
      group:      'identity',
      options:    { source: 'title.en', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name:        'type',
      title:       'Type',
      type:        'string',
      group:       'identity',
      description: 'Villas = residential villa projects | Buildings = commercial or industrial | Towers = high-rise',
      options: {
        list: [
          { title: 'Villas',             value: 'villas'    },
          { title: 'Buildings',          value: 'buildings' },
          { title: 'High-Rise / Towers', value: 'towers'    },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name:        'materialsUsed',
      title:       'Materials Used',
      type:        'array',
      group:       'identity',
      description: 'Check all materials used in this project',
      of: [
        defineArrayMember({
          type: 'string',
          options: {
            list: [
              { title: 'uPVC',     value: 'upvc'     },
              { title: 'Aluminum', value: 'aluminum' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name:       'year',
      title:      'Year',
      type:       'number',
      group:      'identity',
      validation: (rule) => rule.min(2000).max(2100).integer(),
    }),
    defineField({
      name:        'location',
      title:       'Location',
      type:        'localizedString',
      group:       'identity',
      description: 'City and country — e.g. Dubai, UAE',
    }),
    defineField({
      name:        'images',
      title:       'Images',
      type:        'array',
      group:       'media',
      description: 'First image is used as the cover card on the projects page — upload best photo first',
      of:          [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({
      name:  'description',
      title: 'Description',
      type:  'localizedText',
      group: 'content',
    }),
    defineField({
      name:  'client',
      title: 'Client',
      type:  'localizedString',
      group: 'content',
    }),
    defineField({
      name:  'scope',
      title: 'Scope of Work',
      type:  'localizedString',
      group: 'content',
    }),
    defineField({
      name:  'stats',
      title: 'Stats',
      type:  'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localizedString' }),
            defineField({ name: 'value', title: 'Value', type: 'string'          }),
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
