import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // ── Hero content ───────────────────────────────────────────────────────
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'localizedString',
      description: 'Short overline in the hero — e.g. "German-Engineered Fenestration"',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localizedString',
      description: 'Body text below the hero headline',
    }),
    defineField({
      name: 'heroCTAPrimary',
      title: 'Hero Primary CTA Label',
      type: 'localizedString',
      description: 'Label for the WhatsApp/quote button — e.g. "Request a Quote"',
    }),
    defineField({
      name: 'heroCTASecondary',
      title: 'Hero Secondary CTA Label',
      type: 'localizedString',
      description: 'Label for the explore button — e.g. "Explore Products"',
    }),
    // ── Company identity ───────────────────────────────────────────────────
    defineField({
      name: 'companyBio',
      title: 'Company Bio',
      type: 'localizedText',
      description: 'Main about paragraph shown on the About page intro',
    }),
    defineField({
      name: 'foundedYear',
      title: 'Founded Year',
      type: 'number',
      description: 'Year the company was founded — e.g. 2004',
      validation: (rule) => rule.min(1900).max(2100).integer(),
    }),
    // ── Key statistics ─────────────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Key Statistics',
      type: 'array',
      description: 'Displayed on the homepage stats bar and About hero',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localizedString' }),
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. "500+"' }),
            defineField({ name: 'icon', title: 'Icon Name', type: 'string', description: 'Phosphor icon name — e.g. "Buildings"' }),
          ],
        },
      ],
    }),
    // ── Contact ────────────────────────────────────────────────────────────
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Include country code, digits only — e.g. 201012345678',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'localizedString',
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'localizedString',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'email' },
    prepare: () => ({ title: 'Site Settings' }),
  },
})
