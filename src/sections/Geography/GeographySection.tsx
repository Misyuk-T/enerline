import { useState } from 'react';
import ukraineMap from '@svg-maps/ukraine';
import { MapPin } from 'lucide-react';

import { Container, Reveal, SectionHeading } from '@/components';

import { GeographyLocationKind, GeographySectionProps, SectionId, SvgMapRegion } from '@/types';

const getLocationStyles = (kind: GeographyLocationKind) =>
  kind === GeographyLocationKind.Headquarters
    ? {
        dotClassName: 'border-primary bg-primary',
        pulseClassName: 'bg-primary/20',
      }
    : {
        dotClassName: 'border-secondary bg-secondary',
        pulseClassName: 'bg-secondary/20',
      };

export const GeographySection = ({ content }: GeographySectionProps) => {
  const headquartersIndex = content.locations.findIndex(
    (location) => location.kind === GeographyLocationKind.Headquarters,
  );
  const [activeLocationIndex, setActiveLocationIndex] = useState<number>(
    headquartersIndex >= 0 ? headquartersIndex : 0,
  );

  return (
    <section id={SectionId.Geography} className="section-shell bg-white">
      <Container>
        <SectionHeading
          eyebrow="Географія"
          title={content.title}
          description={content.description}
          centered
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <Reveal className="h-full">
            <div className="h-full rounded-[24px] border border-border bg-white p-3 shadow-soft md:h-[620px] md:p-4">
              <div className="scrollbar-soft h-full space-y-3 md:overflow-y-auto md:pr-2">
                {content.locations.map((location, index) => (
                  <button
                    key={`${location.city}-${location.address}`}
                    className={[
                      'w-full rounded-[20px] border bg-surface p-4 text-left transition-all duration-200',
                      index === activeLocationIndex
                        ? 'border-primary/30 bg-primary/5 shadow-soft'
                        : 'border-transparent hover:border-primary/15 hover:bg-white',
                    ].join(' ')}
                    type="button"
                    onClick={() => setActiveLocationIndex(index)}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-text">{location.label}</h3>
                      <p className="mt-1 text-sm font-medium text-text">{location.city}</p>
                    </div>

                    <div className="mt-4 flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                      <div>
                        <p className="text-sm leading-6 text-muted">{location.address}</p>
                        <p className="mt-1 text-sm leading-6 text-muted">{location.note}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-[24px] border border-border bg-white p-3 shadow-soft md:h-[620px] md:p-4">
              <div className="relative flex-1 overflow-hidden rounded-[20px] bg-slate-50">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox={ukraineMap.viewBox}
                  aria-hidden="true"
                >
                  {ukraineMap.locations.map((region: SvgMapRegion) => (
                    <path
                      key={region.id}
                      d={region.path}
                      fill="#DCEBFA"
                      stroke="#1565C0"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      className="transition-colors duration-200 hover:fill-[#c8def8]"
                    />
                  ))}
                </svg>

                {content.locations.map((location, index) => {
                  const styles = getLocationStyles(location.kind);
                  const isActive = index === activeLocationIndex;

                  return (
                    <div
                      key={`${location.city}-${location.address}-marker`}
                      className="absolute h-10 w-10"
                      style={{
                        left: `${location.x}%`,
                        top: `${location.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {isActive ? (
                        <span
                          className={`absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full ${styles.pulseClassName}`}
                        />
                      ) : null}
                      <span
                        className={`absolute left-1/2 top-1/2 block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 ${styles.dotClassName}`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 px-1">
                <p className="text-sm leading-6 text-muted">{content.mapCaption}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
