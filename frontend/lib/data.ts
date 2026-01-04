// ===============================
// API & UI SHARED TYPES
// ===============================

/**
 * Field of expertise returned by backend
 * (Keep as string union if backend enums are fixed)
 */
export type FieldOfExpertise =
  | "WEB_DEVELOPEMENT"
  | "AIML"
  | "OPERATING_SYSTEM"
  | "ANDROID_DEVELOPEMENT"
  | "DATA_STRUCTURES"
  | "SYSTEM_DESIGN"
  | "SOFT_SKILLS"
  | "ACADEMICS"

/**
 * Mentor type EXACTLY as backend sends (minus sensitive fields)
 */
// API Mentor (runtime data)
export interface Mentor {
  id: string
  name: string
  avatar: string | null
  location: string
  fieldOfExpertise: string   // ✅ string, NOT union
  description: string
  about: string
  materialLinks?: string[]
  linkedIn?: string | null
  instagram?: string | null
}

export type FieldOfExpertiseUI =
  | "WEB_DEVELOPEMENT"
  | "AIML"
  | "OPERATING_SYSTEM"
  | "ANDROID_DEVELOPEMENT"
  | "DATA_STRUCTURES"
  | "SYSTEM_DESIGN"
  | "SOFT_SKILLS"
  | "ACADEMICS"


/**
 * Optional: Student type (if needed later)
 */
export interface Student {
  id: string
  name: string
  email: string
  collegeName: string
  fieldRequested: FieldOfExpertise
}
