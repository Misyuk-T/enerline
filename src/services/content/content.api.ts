import { getLocalSiteContent } from '@/services/content/local-content.api';
import { createSanityContentClient, getContentSource } from '@/services/content/sanity.client';
import { getSanitySiteContent } from '@/services/content/sanity-content.api';

import type { SiteContent } from '@/types';
import { ContentSource } from '@/types';

const getContentFromAutoSource = async (): Promise<SiteContent> => {
  const sanityClient = createSanityContentClient();

  if (!sanityClient) {
    return getLocalSiteContent();
  }

  try {
    return await getSanitySiteContent();
  } catch (error) {
    console.error(
      'Failed to load published content from Sanity. Falling back to local JSON.',
      error,
    );

    return getLocalSiteContent();
  }
};

export const getSiteContent = async (): Promise<SiteContent> => {
  const contentSource = getContentSource();

  if (contentSource === ContentSource.Local) {
    return getLocalSiteContent();
  }

  if (contentSource === ContentSource.Sanity) {
    return getSanitySiteContent();
  }

  return getContentFromAutoSource();
};
