import { Button, Container, Reveal } from '@/components';

import { ButtonVariant, HeroSectionProps, SectionId } from '@/types';

export const HeroSection = ({ content }: HeroSectionProps) => (
  <section id={SectionId.Hero} className="relative isolate overflow-hidden bg-slate-950">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${content.image.src})` }}
    />
    <div className="absolute inset-0 bg-hero-overlay" />
    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/20 to-transparent" />

    <Container className="relative py-24 md:py-28 lg:py-32">
      <Reveal className="max-w-4xl">
        <div className="mb-6 flex flex-wrap gap-3">
          {content.highlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90"
            >
              {highlight}
            </span>
          ))}
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-[48px]">
          {content.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{content.subtitle}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href={content.primaryCta.href}>{content.primaryCta.label}</Button>
          <Button href={content.secondaryCta.href} variant={ButtonVariant.Outline}>
            {content.secondaryCta.label}
          </Button>
        </div>
      </Reveal>
    </Container>
  </section>
);
