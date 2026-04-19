import { config } from './config';

// Data service for portfolio content
// Uses environment-aware configuration for API endpoints

export interface PortfolioData {
  layout: {
    title: string;
    description: string;
  };
  ui: {
    loading: string;
    menuOpen: string;
    menuClosed: string;
    systemStatusLabel: string;
    systemStatusDescription: string;
    sectionTitles: {
      about: string;
      skills: string;
      experience: string;
      projects: string;
      publications: string;
      openSource: string;
      contact: string;
    };
    sectionSubtitles: {
      skills: string;
      experience: string;
      projects: string;
      publications: string;
      openSource: string;
    };
    footerLabel: string;
    enterpriseTag: string;
    quickFacts: string;
    coreCapabilitiesTitle: string;
  };
  header: {
    title: string;
    navLinks: Array<{ label: string; href: string }>;
  };
  hero: {
    headline: string;
    subheading: string;
    status: string;
    cta: string;
    scroll: string;
  };
  about: {
    heading: string;
    description: string;
    highlights: Array<{ label: string; value: string }>;
    capabilities: string[];
  };
  skills: Array<{ title: string; items: string[] }>;
  experience: Array<{ period: string; title: string; company: string; bullets: string[] }>;
  projects: Array<{ number: string; title: string; description: string; image: string }>;
  publications: Array<{ title: string; source: string; year: string }>;
  openSource: Array<{ repo: string; contribution: string; link: string }>;
  contact: {
    heading: string;
    intro: string;
    details: Array<{ label: string; value: string; href: string }>;
    facts: Array<{ label: string; value: string }>;
  };
  footer: {
    note: string;
    links: Array<{ label: string; href: string }>;
  };
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
  console.log('Fetching portfolio data from API...');
  console.log('Mode: ', config.app.env);
  const baseUrl = config.api.baseUrl;
  if (!baseUrl) {
    throw new Error('API base URL not configured');
  }
  const response = await fetch(`${baseUrl}/portfolio-data`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch portfolio data');
  }
  return response.json();
}
