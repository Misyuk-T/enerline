import {
  createSanityContentClient,
  getSanityConfiguration,
} from '@/services/content/sanity.client';
import { siteContentQuery } from '@/services/content/sanity.queries';

import type { SiteContent } from '@/types';

const assertSiteContent = (content: SiteContent | null): SiteContent => {
  if (
    !content ||
    !content.hero ||
    !content.advantages ||
    !content.tariffs ||
    !content.conditions ||
    !content.about ||
    !content.geography ||
    !content.contacts
  ) {
    throw new Error('Sanity returned incomplete published content.');
  }

  return content;
};

export const getSanitySiteContent = async (): Promise<SiteContent> => {
  const configuration = getSanityConfiguration();
  const client = createSanityContentClient();

  if (!configuration || !client) {
    throw new Error('Sanity environment variables are not configured.');
  }

  const content = await client.fetch<SiteContent | null>(siteContentQuery);

  return assertSiteContent(content);
};
