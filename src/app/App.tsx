import { Button, Container, Footer, Header } from '@/components';
import {
  AboutSection,
  AdvantagesSection,
  ConditionsSection,
  ContactsSection,
  HeroSection,
  TariffsSection,
} from '@/sections';

import { useSiteContent } from '@/hooks';

import { ButtonVariant, NavigationItem, SectionId } from '@/types';

const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: SectionId.Tariffs, label: 'Тарифи' },
  { id: SectionId.Conditions, label: 'Умови' },
  { id: SectionId.About, label: 'Про нас' },
  { id: SectionId.Contacts, label: 'Контакти' },
];

export const App = () => {
  const { data, error, isLoading } = useSiteContent();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="rounded-card border border-border bg-white px-6 py-5 shadow-soft">
          <p className="text-base font-medium text-text">Завантажуємо сайт Enerline...</p>
        </div>
      </div>
    );
  }

  if (!data || error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Container className="max-w-2xl">
          <div className="rounded-card border border-red-200 bg-white p-8 text-center shadow-soft">
            <h1 className="text-3xl font-semibold text-text">Не вдалося завантажити контент</h1>
            <p className="mt-4 text-base leading-7 text-muted">{error}</p>
            <div className="mt-8">
              <Button variant={ButtonVariant.Ghost} onClick={() => window.location.reload()}>
                Спробувати ще раз
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[720px] bg-gradient-to-b from-primary/5 to-transparent" />

      <Header sections={NAVIGATION_ITEMS} />

      <main>
        <HeroSection content={data.hero} />
        <AdvantagesSection content={data.advantages} />
        <TariffsSection content={data.tariffs} />
        <ConditionsSection content={data.conditions} />
        <AboutSection content={data.about} />
        {/* <GeographySection content={data.geography} /> */}
        <ContactsSection content={data.contacts} />
      </main>

      <Footer />
    </div>
  );
};
