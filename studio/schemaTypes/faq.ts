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
          { title: 'Installation', value: 'installation' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Warranty', value: 'warranty' },
          { title: 'General', value: 'general' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'question.en', subtitle: 'category' },
  },
})
