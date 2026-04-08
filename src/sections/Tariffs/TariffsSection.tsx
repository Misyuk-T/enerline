import { Info } from 'lucide-react';

import { Button, Container, Reveal, SectionHeading } from '@/components';

import { ButtonVariant, SectionId, TariffsSectionProps } from '@/types';

export const TariffsSection = ({ content }: TariffsSectionProps) => (
  <section id={SectionId.Tariffs} className="section-shell bg-surface">
    <Container>
      <SectionHeading eyebrow="Тарифи" title={content.title} description={content.subtitle} />

      <Reveal className="mt-10">
        <div className="overflow-hidden rounded-card border border-border bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-slate-50">
                  <th className="px-6 py-4 text-sm font-semibold text-text">Категорія</th>
                  <th className="px-6 py-4 text-sm font-semibold text-text">Тариф</th>
                  <th className="px-6 py-4 text-sm font-semibold text-text">Умови</th>
                </tr>
              </thead>
              <tbody>
                {content.rows.map((row) => (
                  <tr
                    key={row.category}
                    className="border-b border-border last:border-b-0 hover:bg-primary/5"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-text">{row.category}</td>
                    <td className="px-6 py-4 text-sm text-muted">{row.price}</td>
                    <td className="px-6 py-4 text-sm text-muted">{row.conditions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-card border border-primary/10 bg-white p-6 shadow-soft md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Info className="h-5 w-5" />
            </span>
            <p className="max-w-2xl text-sm leading-6 text-muted">{content.note}</p>
          </div>

          <Button href={content.ctaHref} variant={ButtonVariant.Ghost}>
            {content.ctaLabel}
          </Button>
        </div>
      </Reveal>
    </Container>
  </section>
);
