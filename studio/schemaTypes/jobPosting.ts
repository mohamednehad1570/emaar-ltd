import { defineField, defineType } from 'sanity'

export const jobPosting = defineType({
  name: 'jobPosting',
  title: 'Job Posting',
  type: 'document',
  orderings: [
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-Time', value: 'full-time' },
          { title: 'Part-Time', value: 'part-time' },
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'localizedString',
    }),
    defineField({
      name: 'experience',
      title: 'Experience Required',
      type: 'string',
    }),
    defineField({
      name: 'salary',
      title: 'Salary',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'localizedText',
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'localizedString' }],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'localizedString' }],
    }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'department' },
  },
})
