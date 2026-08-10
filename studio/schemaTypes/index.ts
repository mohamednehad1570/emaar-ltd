import { localizedString } from './localizedString'
import { localizedText } from './localizedText'
import { product } from './product'
import { project } from './project'
import { teamMember } from './teamMember'
import { faq } from './faq'
import { jobPosting } from './jobPosting'
import { certificate } from './certificate'
import { siteSettings } from './siteSettings'

export const schemaTypes = [
  // Shared object types
  localizedString,
  localizedText,
  // Documents
  product,
  project,
  teamMember,
  faq,
  jobPosting,
  certificate,
  siteSettings,
]
