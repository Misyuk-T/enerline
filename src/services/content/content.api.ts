import type { SiteContent } from '@/types';

const PUBLIC_BASE_PATH = import.meta.env.BASE_URL;

const resolvePublicPath = (path: string): string => {
  if (/^(?:https?:)?\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  return `${PUBLIC_BASE_PATH}${normalizedPath}`;
};

const fetchContentFile = async <T>(path: string): Promise<T> => {
  const resolvedPath = resolvePublicPath(path);
  const response = await fetch(resolvedPath);

  if (!response.ok) {
    throw new Error(`Failed to load content from ${resolvedPath}`);
  }

  return response.json() as Promise<T>;
};

const normalizeImage = <T extends { src: string }>(image: T): T => ({
  ...image,
  src: resolvePublicPath(image.src),
});

export const getSiteContent = async (): Promise<SiteContent> => {
  const [hero, advantages, tariffs, conditions, about, geography, contacts] = await Promise.all([
    fetchContentFile<SiteContent['hero']>('content/hero.json'),
    fetchContentFile<SiteContent['advantages']>('content/advantages.json'),
    fetchContentFile<SiteContent['tariffs']>('content/tariffs.json'),
    fetchContentFile<SiteContent['conditions']>('content/conditions.json'),
    fetchContentFile<SiteContent['about']>('content/about.json'),
    fetchContentFile<SiteContent['geography']>('content/geography.json'),
    fetchContentFile<SiteContent['contacts']>('content/contacts.json'),
  ]);

  return {
    hero: {
      ...hero,
      image: normalizeImage(hero.image),
    },
    advantages,
    tariffs,
    conditions: {
      ...conditions,
      image: normalizeImage(conditions.image),
    },
    about: {
      ...about,
      images: about.images.map((image) => normalizeImage(image)),
    },
    geography,
    contacts,
  };
};
