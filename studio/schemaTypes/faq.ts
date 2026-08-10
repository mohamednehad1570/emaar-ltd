import { defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Products', value: 'products' },
          { title: 'Services', value: 'services' },
          { title: 'Technical', value: 'technical' },
          { title: 'Ordering', value: 'ordering' },
          { title: 'Installation', value: 'installation' },
          { title: 'Maintenance', value: 'maintenance' },
        ],
      },
    }),
    defineField({
      name: 'popular',
      title: 'Mark as Popular',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'question.en', subtitle: 'category' },
  },
})
