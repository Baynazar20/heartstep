/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// CMS collection types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  photoUrl: string;
  alt: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  logoUrl: string;
  alt: string;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  alt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
