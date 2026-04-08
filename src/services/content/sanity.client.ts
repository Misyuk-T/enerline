import { createClient } from '@sanity/client';

import { DEFAULT_SANITY_API_VERSION } from '@/services/content/content.constants';

import { ContentSource, SanityConfiguration } from '@/types';

const getBooleanEnvironmentValue = (value: string | undefined, fallbackValue: boolean): boolean => {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return fallbackValue;
};

export const getContentSource = (): ContentSource => {
  const rawSource = import.meta.env.VITE_CONTENT_SOURCE;

  if (rawSource === ContentSource.Local) {
    return ContentSource.Local;
  }

  if (rawSource === ContentSource.Sanity) {
    return ContentSource.Sanity;
  }

  return ContentSource.Auto;
};

export const getSanityConfiguration = (): SanityConfiguration | null => {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = import.meta.env.VITE_SANITY_DATASET;

  if (!projectId || !dataset) {
    return null;
  }

  return {
    projectId,
    dataset,
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION ?? DEFAULT_SANITY_API_VERSION,
    useCdn: getBooleanEnvironmentValue(import.meta.env.VITE_SANITY_USE_CDN, true),
  };
};

export const createSanityContentClient = () => {
  const configuration = getSanityConfiguration();

  if (!configuration) {
    return null;
  }

  return createClient({
    projectId: configuration.projectId,
    dataset: configuration.dataset,
    apiVersion: configuration.apiVersion,
    useCdn: configuration.useCdn,
  });
};
