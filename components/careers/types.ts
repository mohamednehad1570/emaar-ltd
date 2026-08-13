// Normalized job shape — used by all careers sub-components.
// Both CMS (JobPosting) and static (CareersJob) data map into this before rendering.

export interface DisplayJob {
  id: string | number
  title: string
  department: string
  departmentKey: string // lowercase English, used for filter matching
  location: string
  type: string
  experience: string
  salary: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
}
