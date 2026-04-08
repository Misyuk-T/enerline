import { useEffect, useState } from 'react';
import { Cog, MapPin, SunMedium } from 'lucide-react';

import { Container, Reveal, SectionHeading } from '@/components';

import { AboutFactIcon, AboutSectionProps, SectionId } from '@/types';

const ICON_MAP: Record<AboutFactIcon, typeof Cog> = {
  [AboutFactIcon.Cog]: Cog,
  [AboutFactIcon.MapPin]: MapPin,
  [AboutFactIcon.SunMedium]: SunMedium,
};

export const AboutSection = ({ content }: AboutSectionProps) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    if (content.images.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlideIndex((currentIndex) => (currentIndex + 1) % content.images.length);
    }, 4500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [content.images.length]);

  return (
    <section id={SectionId.About} className="section-shell bg-surface">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <Reveal className="order-2 lg:order-1">
            <div className="max-w-xl">
              <SectionHeading
                eyebrow="Про компанію"
                title={content.title}
                description={content.description}
              />
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <div>
              <div className="relative h-[320px] overflow-hidden rounded-[20px] md:h-[420px]">
                {content.images.map((image, index) => (
                  <div
                    key={image.src}
                    className={[
                      'absolute inset-0 flex items-center justify-center bg-slate-100 transition-all duration-700',
                      index === activeSlideIndex
                        ? 'scale-100 opacity-100'
                        : 'pointer-events-none scale-[1.03] opacity-0',
                    ].join(' ')}
                  >
                    <img className="h-full w-full object-cover" src={image.src} alt={image.alt} />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 pt-5">
                {content.images.map((image, index) => (
                  <button
                    key={image.src}
                    className={[
                      'h-2.5 rounded-full transition-all duration-200',
                      index === activeSlideIndex
                        ? 'w-8 bg-primary'
                        : 'w-2.5 bg-border hover:bg-primary/50',
                    ].join(' ')}
                    type="button"
                    aria-label={`Перейти до слайда ${index + 1}`}
                    onClick={() => setActiveSlideIndex(index)}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {content.facts.map((fact) => {
            const Icon = ICON_MAP[fact.icon];

            return (
              <Reveal key={fact.title} className="h-full">
                <article className="section-card group h-full p-6 transition-all duration-300 hover:-translate-y-2 hover:border-secondary/20 hover:shadow-[0_18px_35px_rgba(46,125,50,0.12)]">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-card bg-secondary/10 text-secondary transition duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-text transition duration-300 group-hover:text-secondary">
                    {fact.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-muted">{fact.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
