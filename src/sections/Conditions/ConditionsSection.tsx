import { CheckCircle2 } from 'lucide-react';

import { Button, Container, Reveal, SectionHeading } from '@/components';

import { ConditionsSectionProps, SectionId } from '@/types';

export const ConditionsSection = ({ content }: ConditionsSectionProps) => (
  <section id={SectionId.Conditions} className="section-shell bg-white">
    <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <Reveal>
        <SectionHeading eyebrow="Умови" title={content.title} description={content.description} />

        <div className="mt-8 space-y-4">
          {content.items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-card border border-border bg-surface px-4 py-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-base leading-7 text-text">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button href={content.ctaHref}>{content.ctaLabel}</Button>
        </div>
      </Reveal>

      <Reveal>
        <div className="overflow-hidden rounded-card border border-border bg-surface p-3 shadow-soft">
          <img
            className="h-full w-full rounded-card object-cover"
            src={content.image.src}
            alt={content.image.alt}
          />
        </div>
      </Reveal>
    </Container>
  </section>
);
