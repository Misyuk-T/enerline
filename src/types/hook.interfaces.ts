import type { SiteContent } from '@/types/content';

export interface UseSiteContentState {
  data: SiteContent | null;
  isLoading: boolean;
  error: string | null;
}
