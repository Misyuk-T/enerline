import type { SiteContent } from '@/types';

const fetchContentFile = async <T>(path: string): Promise<T> => {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load content from ${path}`);
  }

  return response.json() as Promise<T>;
};

export const getSiteContent = async (): Promise<SiteContent> => {
  const [hero, advantages, tariffs, conditions, about, geography, contacts] = await Promise.all([
    fetchContentFile<SiteContent['hero']>('/content/hero.json'),
    fetchContentFile<SiteContent['advantages']>('/content/advantages.json'),
    fetchContentFile<SiteContent['tariffs']>('/content/tariffs.json'),
    fetchContentFile<SiteContent['conditions']>('/content/conditions.json'),
    fetchContentFile<SiteContent['about']>('/content/about.json'),
    fetchContentFile<SiteContent['geography']>('/content/geography.json'),
    fetchContentFile<SiteContent['contacts']>('/content/contacts.json'),
  ]);

  return {
    hero,
    advantages,
    tariffs,
    conditions,
    about,
    geography,
    contacts,
  };
};
