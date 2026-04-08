import type { SiteContent } from '@/types/content';

export interface SanityConfiguration {
  apiVersion: string;
  dataset: string;
  projectId: string;
  useCdn: boolean;
}

export interface SanitySiteContent extends SiteContent {}
