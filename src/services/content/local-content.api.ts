import { normalizeLocalSiteContent, resolvePublicPath } from '@/services/content/content.utils';

import type { SiteContent } from '@/types';

const fetchContentFile = async <T>(path: string): Promise<T> => {
  const resolvedPath = resolvePublicPath(path);
  const response = await fetch(resolvedPath);

  if (!response.ok) {
    throw new Error(`Failed to load content from ${resolvedPath}`);
  }

  return response.json() as Promise<T>;
};

export const getLocalSiteContent = async (): Promise<SiteContent> => {
  const [hero, advantages, tariffs, conditions, about, geography, contacts] = await Promise.all([
    fetchContentFile<SiteContent['hero']>('content/hero.json'),
    fetchContentFile<SiteContent['advantages']>('content/advantages.json'),
    fetchContentFile<SiteContent['tariffs']>('content/tariffs.json'),
    fetchContentFile<SiteContent['conditions']>('content/conditions.json'),
    fetchContentFile<SiteContent['about']>('content/about.json'),
    fetchContentFile<SiteContent['geography']>('content/geography.json'),
    fetchContentFile<SiteContent['contacts']>('content/contacts.json'),
  ]);

  return normalizeLocalSiteContent({
    hero,
    advantages,
    tariffs,
    conditions,
    about,
    geography,
    contacts,
  });
};
