import { SectionId } from '../types/content';

export const singletonDocumentTypes: string[] = [
  SectionId.Hero,
  SectionId.Advantages,
  SectionId.Tariffs,
  SectionId.Conditions,
  SectionId.About,
  SectionId.Geography,
  SectionId.Contacts,
];

export const singletonDocumentTitles: Record<string, string> = {
  [SectionId.Hero]: 'Головний екран',
  [SectionId.Advantages]: 'Переваги',
  [SectionId.Tariffs]: 'Тарифи',
  [SectionId.Conditions]: 'Умови',
  [SectionId.About]: 'Про компанію',
  [SectionId.Geography]: 'Географія клієнтів',
  [SectionId.Contacts]: 'Контакти',
};

export const singletonDocumentActions = new Set<string>(['publish', 'discardChanges', 'restore']);
