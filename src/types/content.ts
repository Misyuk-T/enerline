export enum SectionId {
  Hero = 'hero',
  Advantages = 'advantages',
  Tariffs = 'tariffs',
  Conditions = 'conditions',
  About = 'about',
  Contacts = 'contacts',
}

export enum AdvantageIcon {
  Zap = 'Zap',
  Factory = 'Factory',
  FileText = 'FileText',
}

export enum AboutFactIcon {
  MapPin = 'MapPin',
  Cog = 'Cog',
  SunMedium = 'SunMedium',
}

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Outline = 'outline',
  Ghost = 'ghost',
}

export interface ImageContent {
  src: string;
  alt: string;
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  highlights: string[];
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  image: ImageContent;
}

export interface AdvantageItem {
  icon: AdvantageIcon;
  title: string;
  text: string;
}

export interface AdvantagesContent {
  title: string;
  description: string;
  items: AdvantageItem[];
}

export interface TariffRow {
  category: string;
  price: string;
  conditions: string;
}

export interface TariffsContent {
  title: string;
  subtitle: string;
  rows: TariffRow[];
  note: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ConditionsContent {
  title: string;
  description: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
  image: ImageContent;
}

export interface AboutFact {
  icon: AboutFactIcon;
  title: string;
  text: string;
}

export interface AboutContent {
  title: string;
  description: string;
  image: ImageContent;
  facts: AboutFact[];
}

export interface ContactsContent {
  title: string;
  description: string;
  email: string;
  phone: string;
  region: string;
  formNote: string;
  submitLabel: string;
}

export interface SiteContent {
  hero: HeroContent;
  advantages: AdvantagesContent;
  tariffs: TariffsContent;
  conditions: ConditionsContent;
  about: AboutContent;
  contacts: ContactsContent;
}

export interface NavigationItem {
  id: SectionId;
  label: string;
}
