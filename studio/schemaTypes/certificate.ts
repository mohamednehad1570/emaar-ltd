import { defineField, defineType } from 'sanity'

export const certificate = defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.min(2000).max(2100).integer(),
    }),
    defineField({
      name: 'issuedBy',
      title: 'Issued By',
      type: 'localizedString',
      description: 'Organisation that issued the certificate',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'year', media: 'image' },
  },
})
