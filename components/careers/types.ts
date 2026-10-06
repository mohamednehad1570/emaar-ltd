// Normalized job shape — used by all careers sub-components.
// lib/types Job entries are flattened to the active language before rendering.

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
