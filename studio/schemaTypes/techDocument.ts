import { defineArrayMember, defineField, defineType } from 'sanity'

// Technical Documents — PDFs, CAD files, guides, brochures, certs
// Displayed in the Technical Downloads page grid
export const techDocument = defineType({
  name: 'techDocument',
  title: 'Technical Document',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Document Name',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Product Specifications', value: 'Product Specifications' },
          { title: 'CAD Files',              value: 'CAD Files' },
          { title: 'Installation Guides',    value: 'Installation Guides' },
          { title: 'Maintenance Manuals',    value: 'Maintenance Manuals' },
          { title: 'Brochures & Catalogs',   value: 'Brochures & Catalogs' },
          { title: 'Certifications',         value: 'Certifications' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'format',
      title: 'File Format',
      type: 'string',
      options: {
        list: ['PDF', 'DWG', 'DXF', 'XLSX', 'ZIP'],
      },
    }),
    defineField({
      name: 'productType',
      title: 'Product Type Filter',
      type: 'string',
      options: {
        list: [
          { title: 'All Products',            value: 'All Products' },
          { title: 'uPVC Systems',             value: 'uPVC Systems' },
          { title: 'Aluminum Systems',         value: 'Aluminum Systems' },
          { title: 'Hardware & Accessories',   value: 'Hardware & Accessories' },
          { title: 'Glass & Glazing',          value: 'Glass & Glazing' },
        ],
      },
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      description: 'Upload the actual document file',
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Thumbnail shown in the document grid',
    }),
    defineField({
      name: 'fileSize',
      title: 'File Size (display only)',
      type: 'string',
      description: 'e.g. "2.4 MB" — enter manually',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this document prominently',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'category',
      media: 'previewImage',
    },
  },
})
