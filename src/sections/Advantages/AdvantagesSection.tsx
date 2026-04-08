import { Factory, FileText, Zap } from 'lucide-react';

import { Container, Reveal, SectionHeading } from '@/components';

import { AdvantageIcon, AdvantagesSectionProps, SectionId } from '@/types';

const ICON_MAP: Record<AdvantageIcon, typeof Zap> = {
  [AdvantageIcon.Factory]: Factory,
  [AdvantageIcon.FileText]: FileText,
  [AdvantageIcon.Zap]: Zap,
};

export const AdvantagesSection = ({ content }: AdvantagesSectionProps) => (
  <section id={SectionId.Advantages} className="section-shell bg-white">
    <Container>
      <SectionHeading
        eyebrow="Переваги"
        title={content.title}
        description={content.description}
        centered
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {content.items.map((item) => {
          const Icon = ICON_MAP[item.icon];

          return (
            <Reveal key={item.title} className="h-full">
              <article className="section-card group h-full p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_18px_35px_rgba(21,101,192,0.12)]">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-card bg-primary/10 text-primary transition duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-text transition duration-300 group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-muted">{item.text}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Container>
  </section>
);
