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
    // ── Contact page extras ────────────────────────────────────────────────
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'string',
      description: 'Full Google Maps embed src URL — used on the contact page iframe',
    }),
    defineField({
      name: 'officeLocations',
      title: 'Office Locations',
      type: 'array',
      description: 'Branch offices displayed on the contact page',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name',         title: 'Office Name',    type: 'localizedString' }),
            defineField({ name: 'address',      title: 'Address',        type: 'localizedString' }),
            defineField({ name: 'phone',        title: 'Phone',          type: 'string' }),
            defineField({ name: 'workingHours', title: 'Working Hours',  type: 'localizedString' }),
          ],
          preview: {
            select: { title: 'name.en' },
          },
        },
      ],
    }),

    // ── Warranty ───────────────────────────────────────────────────────────
    // Controls the WarrantyStrip component rendered on product pages.
    // showWarrantyBadge: false hides the strip entirely until client confirms terms.
    defineField({
      name:  'showWarrantyBadge',
      title: 'Show Warranty Badge',
      type:  'boolean',
      description: 'Enables the warranty strip on product pages. Off by default until client approves the wording.',
      initialValue: false,
    }),

    defineField({
      name:  'warranty',
      title: 'Warranty Details',
      type:  'object',
      description: 'Shown in the WarrantyStrip component when showWarrantyBadge is enabled',
      fields: [
        // Coverage years — displayed as pipe-separated points in the strip
        defineField({ name: 'upvcYears',         title: 'uPVC Coverage (years)',         type: 'number', initialValue: 25 }),
        defineField({ name: 'glassYears',        title: 'Glass Coverage (years)',        type: 'number', initialValue: 10 }),
        defineField({ name: 'accessoriesYears',  title: 'Accessories Coverage (years)',  type: 'number', initialValue:  1 }),
        defineField({ name: 'maintenanceYears',  title: 'Maintenance Coverage (years)',  type: 'number', initialValue:  1 }),

        // Legal jurisdiction — required for UAE compliance
        defineField({
          name: 'governingLaw',
          title: 'Governing Law',
          type: 'object',
          fields: [
            defineField({ name: 'en', title: 'English', type: 'string', initialValue: 'UAE Law'           }),
            defineField({ name: 'ar', title: 'Arabic',  type: 'string', initialValue: 'القانون الإماراتي' }),
          ],
        }),

        // Excluded products — fly-screens and roller shutters per standard UAE warranty
        defineField({
          name: 'exclusions',
          title: 'Exclusions',
          type: 'object',
          fields: [
            defineField({ name: 'en', title: 'English', type: 'text', rows: 2, initialValue: 'Fly-screens and roller shutters are not covered' }),
            defineField({ name: 'ar', title: 'Arabic',  type: 'text', rows: 2, initialValue: 'لا يشمل الضمان شبكات الذباب والستائر الدوارة'   }),
          ],
        }),

        // Collapsible footnote shown below the warranty terms
        defineField({
          name: 'footnote',
          title: 'Footnote',
          type: 'object',
          fields: [
            defineField({ name: 'en', title: 'English', type: 'text', rows: 2, initialValue: 'Warranty is subject to standard terms and conditions'     }),
            defineField({ name: 'ar', title: 'Arabic',  type: 'text', rows: 2, initialValue: 'الضمان خاضع للشروط والأحكام القياسية' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'email' },
    prepare: () => ({ title: 'Site Settings' }),
  },
})
