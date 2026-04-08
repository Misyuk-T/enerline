import { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';

import { Button, Container, Reveal, SectionHeading } from '@/components';

import { ButtonVariant, SectionId, TariffsSectionProps } from '@/types';

export const TariffsSection = ({ content }: TariffsSectionProps) => {
  const [activeTariffIndex, setActiveTariffIndex] = useState<number>(0);

  return (
    <section id={SectionId.Tariffs} className="section-shell bg-surface">
      <Container>
        <SectionHeading eyebrow="Тарифи" title={content.title} description={content.subtitle} />

        <Reveal className="mt-10">
          <div className="space-y-4">
            {content.rows.map((row, index) => {
              const isOpen = index === activeTariffIndex;

              return (
                <article
                  key={row.category}
                  className="overflow-hidden rounded-card border border-border bg-white shadow-soft transition duration-300 hover:border-primary/20"
                >
                  <button
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setActiveTariffIndex(isOpen ? -1 : index)}
                  >
                    <div className="grid flex-1 gap-3 md:grid-cols-[1.1fr_0.7fr_1.2fr] md:items-center">
                      <h3 className="text-base font-semibold text-text md:text-lg">
                        {row.category}
                      </h3>
                      <p className="text-sm font-semibold text-primary md:text-base">{row.price}</p>
                      <p className="text-sm leading-6 text-muted">{row.conditions}</p>
                    </div>

                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </span>
                  </button>

                  <div
                    className={[
                      'grid transition-all duration-300',
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    ].join(' ')}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-border bg-slate-50/70 px-6 py-5">
                        <div className="space-y-3">
                          {row.details.map((detail) => (
                            <div
                              key={detail}
                              className="flex items-start gap-3 rounded-card bg-white px-4 py-3"
                            >
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                              <p className="text-sm leading-6 text-muted">{detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-card border border-primary/10 bg-white p-6 shadow-soft md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Info className="h-5 w-5" />
              </span>
              <p className="max-w-2xl flex-1 text-sm leading-6 text-muted">{content.note}</p>
            </div>

            <Button href={content.ctaHref} variant={ButtonVariant.Ghost}>
              {content.ctaLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
