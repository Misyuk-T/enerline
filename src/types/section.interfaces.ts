import type {
  AboutContent,
  AdvantagesContent,
  ConditionsContent,
  ContactsContent,
  GeographyContent,
  HeroContent,
  TariffsContent,
} from '@/types/content';

export interface HeroSectionProps {
  content: HeroContent;
}

export interface AdvantagesSectionProps {
  content: AdvantagesContent;
}

export interface TariffsSectionProps {
  content: TariffsContent;
}

export interface ConditionsSectionProps {
  content: ConditionsContent;
}

export interface AboutSectionProps {
  content: AboutContent;
}

export interface ContactsSectionProps {
  content: ContactsContent;
}

export interface GeographySectionProps {
  content: GeographyContent;
}

export interface ContactFormState {
  name: string;
  contact: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  contact?: string;
  message?: string;
}
