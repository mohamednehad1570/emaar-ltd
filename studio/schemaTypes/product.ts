/**
 * studio/schemaTypes/product.ts
 *
 * Full product document schema with five Studio tabs:
 *  1. Identity   — title, slug, material, category, main image, badge
 *  2. Details    — descriptions, features (localized), applications
 *  3. Specs      — structured spec object, spec-tag chips
 *  4. Gallery    — image gallery, technical sheet, CAD file
 *  5. Relations  — cross-links to other products, SEO overrides
 *
 * Category validation enforces material→category taxonomy at save time.
 * The field group system renders these as tabs in Sanity Studio v3.
 */

import { defineArrayMember, defineField, defineType } from 'sanity'

// ── Taxonomy constants ────────────────────────────────────────────────────────

const UPVC_CATEGORIES = [
  { title: 'Windows',          value: 'windows'          },
  { title: 'Doors',            value: 'doors'            },
  { title: 'Doors & Windows',  value: 'doors-and-windows'},
  { title: 'Staircases',       value: 'staircases'       },
  { title: 'Stained Glass',    value: 'stained-glass'    },
  { title: 'Sandblast',        value: 'sandblast'        },
  { title: 'Hebeschibe',       value: 'hebeschibe'       },
]

const ALUMINUM_CATEGORIES = [
  { title: 'Windows',          value: 'windows'          },
  { title: 'Doors',            value: 'doors'            },
  { title: 'Doors & Windows',  value: 'doors-and-windows'},
  { title: 'Staircases',       value: 'staircases'       },
  { title: 'Skylights',        value: 'skylights'        },
  { title: 'Stained Glass',    value: 'stained-glass'    },
  { title: 'Sandblast',        value: 'sandblast'        },
]

// All unique category values across both materials
const ALL_CATEGORIES = [
  ...UPVC_CATEGORIES,
  { title: 'Skylights', value: 'skylights' }, // aluminum-only
]

const SPEC_TAGS = [
  { title: 'Double Glazed',       value: 'double-glazed'      },
  { title: 'Triple Glazed',       value: 'triple-glazed'      },
  { title: 'Thermal Insulated',   value: 'thermal-insulated'  },
  { title: 'Acoustic Insulated',  value: 'acoustic-insulated' },
  { title: 'UV Resistant',        value: 'uv-resistant'       },
]

// ── Schema ────────────────────────────────────────────────────────────────────

export const product = defineType({
  name:  'product',
  title: 'Product',
  type:  'document',

  // Tab definitions — renders as a tab bar at the top of the Studio editor
  groups: [
    { name: 'identity',      title: 'Identity',       default: true },
    { name: 'details',       title: 'Details'                       },
    { name: 'specifications', title: 'Specifications'               },
    { name: 'gallery',       title: 'Gallery & Docs'                },
    { name: 'relations',     title: 'Relations'                     },
  ],

  fields: [

    // ── Tab 1: Identity ────────────────────────────────────────────────────

    defineField({
      name:  'title',
      title: 'Title',
      type:  'localizedString',
      group: 'identity',
      validation: (rule) =>
        rule.required().custom((value) => {
          const v = value as { en?: string; ar?: string } | undefined
          if (!v?.en) return 'English title is required'
          if (!v?.ar) return 'Arabic title is required'
          return true
        }),
    }),

    defineField({
      name:  'slug',
      title: 'Slug',
      type:  'slug',
      group: 'identity',
      // Auto-generates from English title; editor can override before publish
      options: { source: 'title.en', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name:  'material',
      title: 'Material',
      type:  'string',
      group: 'identity',
      options: {
        list: [
          { title: 'uPVC',     value: 'upvc'     },
          { title: 'Aluminum', value: 'aluminum' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name:  'category',
      title: 'Category',
      type:  'string',
      group: 'identity',
      // All categories shown; validation below enforces material→category taxonomy
      options: { list: ALL_CATEGORIES },
      validation: (rule) =>
        rule.required().custom((value, context) => {
          const doc = context.document as { material?: string } | undefined
          const material = doc?.material
          if (!material || !value) return true // other fields will catch empties

          const validSet = (material === 'upvc' ? UPVC_CATEGORIES : ALUMINUM_CATEGORIES)
            .map((c) => c.value)

          if (!validSet.includes(value as string)) {
            return `"${value}" is not a valid category for ${material === 'upvc' ? 'uPVC' : 'Aluminum'} products`
          }
          return true
        }),
    }),

    defineField({
      name:  'mainImage',
      title: 'Main Image',
      type:  'image',
      group: 'identity',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name:  'badge',
      title: 'Badge Label',
      type:  'string',
      group: 'identity',
      description: 'Optional pill shown on product cards — e.g. "New", "Best Seller"',
    }),

    // ── Tab 2: Details ─────────────────────────────────────────────────────

    defineField({
      name:  'description',
      title: 'Description',
      type:  'localizedText',
      group: 'details',
      validation: (rule) =>
        rule.required().custom((value) => {
          const v = value as { en?: string; ar?: string } | undefined
          if (!v?.en) return 'English description is required'
          if (!v?.ar) return 'Arabic description is required'
          return true
        }),
    }),

    defineField({
      name:  'features',
      title: 'Features',
      type:  'array',
      group: 'details',
      of: [
        defineArrayMember({
          type:  'object',
          name:  'feature',
          // Each feature is a bilingual single-line label displayed as a bullet
          fields: [
            defineField({ name: 'en', title: 'English', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'ar', title: 'Arabic',  type: 'string', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'en', subtitle: 'ar' } },
        }),
      ],
      // At least one feature must exist before the document can be published
      validation: (rule) => rule.required().min(1).error('Add at least one feature'),
    }),

    defineField({
      name:  'applications',
      title: 'Applications',
      type:  'array',
      group: 'details',
      of:    [defineArrayMember({ type: 'string' })],
      description: 'Usage contexts — e.g. "Residential villas", "Commercial towers"',
    }),

    // ── Tab 3: Specifications ──────────────────────────────────────────────

    defineField({
      name:  'specs',
      title: 'Specifications',
      type:  'object',
      group: 'specifications',
      fields: [
        // dimensions is required — it is the primary spec shown on the product card
        defineField({ name: 'dimensions',     title: 'Dimensions',     type: 'string', validation: (r) => r.required(), description: 'e.g. Custom — up to 2400×2400 mm' }),
        defineField({ name: 'thermalValue',   title: 'Thermal Value',  type: 'string', description: 'e.g. 1.1 W/m²K' }),
        defineField({ name: 'acousticRating', title: 'Acoustic Rating',type: 'string', description: 'e.g. Rw 42 dB'   }),
        defineField({ name: 'glassThickness', title: 'Glass Thickness',type: 'string', description: 'e.g. 6+12+6 mm'  }),
        defineField({
          name:  'colorOptions',
          title: 'Color Options',
          type:  'array',
          of:    [defineArrayMember({ type: 'string' })],
          description: 'One entry per available colour or finish',
        }),
      ],
    }),

    defineField({
      name:  'specTags',
      title: 'Spec Tags',
      type:  'array',
      group: 'specifications',
      of:    [defineArrayMember({ type: 'string' })],
      // Rendered as checkboxes in Studio; values appear as filter chips on the frontend
      options: { list: SPEC_TAGS, layout: 'grid' },
    }),

    // ── Tab 4: Gallery & Docs ──────────────────────────────────────────────

    defineField({
      name:  'gallery',
      title: 'Gallery',
      type:  'array',
      group: 'gallery',
      of:    [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),

    defineField({
      name:  'technicalSheet',
      title: 'Technical Sheet',
      type:  'file',
      group: 'gallery',
      options: { accept: '.pdf' },
      description: 'PDF datasheet displayed on the product detail page',
    }),

    defineField({
      name:  'cadFile',
      title: 'CAD File',
      type:  'file',
      group: 'gallery',
      description: 'DWG or DXF file for technical documentation section',
    }),

    // ── Tab 5: Relations ───────────────────────────────────────────────────

    defineField({
      name:  'relatedProducts',
      title: 'Related Products',
      type:  'array',
      group: 'relations',
      of:    [defineArrayMember({ type: 'reference', to: [{ type: 'product' }] })],
    }),

    defineField({
      name:  'seo',
      title: 'SEO Overrides',
      type:  'object',
      group: 'relations',
      description: 'Leave blank to inherit defaults from siteSettings',
      fields: [
        defineField({ name: 'titleEn',       title: 'Page Title (EN)',       type: 'string' }),
        defineField({ name: 'titleAr',       title: 'Page Title (AR)',       type: 'string' }),
        defineField({ name: 'descriptionEn', title: 'Meta Description (EN)', type: 'text', rows: 3 }),
        defineField({ name: 'descriptionAr', title: 'Meta Description (AR)', type: 'text', rows: 3 }),
      ],
    }),

  ],

  preview: {
    select: {
      title:    'title.en',
      subtitle: 'category',
      media:    'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title:    title ?? '(untitled)',
        subtitle: subtitle ?? '',
        media,
      }
    },
  },
})
