// Environment configuration
// This file provides typed access to environment variables

export const config = {
  // Application
  app: {
    env: process.env.NEXT_PUBLIC_APP_ENV || 'development',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // Analytics
  analytics: {
    gaTrackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },

  // Email Service
  email: {
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
  },

  // Social Media
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
  },

  // Features
  features: {
    emailContact: process.env.NEXT_PUBLIC_ENABLE_EMAIL_CONTACT === 'true',
  },

  // API
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
} as const;

// Type-safe environment variable access
export type Config = typeof config;