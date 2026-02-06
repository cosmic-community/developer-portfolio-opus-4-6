// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

// Proficiency select-dropdown type - matches exact content model values
export type ProficiencyKey = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export interface ProficiencyValue {
  key: ProficiencyKey
  value: string
}

// Skill type
export interface Skill extends CosmicObject {
  type: 'skills'
  metadata: {
    name: string
    proficiency?: ProficiencyValue
    icon?: {
      url: string
      imgix_url: string
    }
  }
}

// Project type
export interface Project extends CosmicObject {
  type: 'projects'
  metadata: {
    description: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    project_url?: string
    github_url?: string
    skills_used?: Skill[]
  }
}

// Work Experience type
export interface WorkExperience extends CosmicObject {
  type: 'work-experience'
  metadata: {
    company: string
    role: string
    start_date?: string
    end_date?: string | null
    description?: string
    company_logo?: {
      url: string
      imgix_url: string
    }
  }
}

// Helper to check error status
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}