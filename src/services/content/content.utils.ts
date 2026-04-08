import { PUBLIC_BASE_PATH } from '@/services/content/content.constants';

import type {
  AboutContent,
  ConditionsContent,
  HeroContent,
  ImageContent,
  SiteContent,
} from '@/types';

export const resolvePublicPath = (path: string): string => {
  if (/^(?:https?:)?\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  return `${PUBLIC_BASE_PATH}${normalizedPath}`;
};

export const normalizeImage = <T extends ImageContent>(image: T): T => ({
  ...image,
  src: resolvePublicPath(image.src),
});

export const normalizeHeroContent = (hero: HeroContent): HeroContent => ({
  ...hero,
  image: normalizeImage(hero.image),
});

export const normalizeConditionsContent = (conditions: ConditionsContent): ConditionsContent => ({
  ...conditions,
  image: normalizeImage(conditions.image),
});

export const normalizeAboutContent = (about: AboutContent): AboutContent => ({
  ...about,
  images: about.images.map((image) => normalizeImage(image)),
});

export const normalizeLocalSiteContent = (content: SiteContent): SiteContent => ({
  ...content,
  hero: normalizeHeroContent(content.hero),
  conditions: normalizeConditionsContent(content.conditions),
  about: normalizeAboutContent(content.about),
});
