import { Cog, MapPin, SunMedium } from 'lucide-react';

import { Container, Reveal, SectionHeading } from '@/components';

import { AboutFactIcon, AboutSectionProps, SectionId } from '@/types';

const ICON_MAP: Record<AboutFactIcon, typeof Cog> = {
  [AboutFactIcon.Cog]: Cog,
  [AboutFactIcon.MapPin]: MapPin,
  [AboutFactIcon.SunMedium]: SunMedium,
};

export const AboutSection = ({ content }: AboutSectionProps) => (
  <section id={SectionId.About} className="section-shell bg-surface">
    <Container>
      <SectionHeading
        eyebrow="Про компанію"
        title={content.title}
        description={content.description}
        centered
      />

      <Reveal className="mt-10">
        <div className="overflow-hidden rounded-card border border-border bg-white p-3 shadow-soft">
          <img
            className="h-full w-full rounded-card object-cover"
            src={content.image.src}
            alt={content.image.alt}
          />
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {content.facts.map((fact) => {
          const Icon = ICON_MAP[fact.icon];

          return (
            <Reveal key={fact.title} className="h-full">
              <article className="section-card h-full p-6">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-card bg-secondary/10 text-secondary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-text">{fact.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{fact.text}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Container>
  </section>
);
