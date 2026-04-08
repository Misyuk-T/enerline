import { SectionHeadingProps } from '@/types';

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  centered = false,
  invert = false,
}: SectionHeadingProps) => (
  <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
    {eyebrow ? (
      <p
        className={`mb-3 text-sm font-semibold uppercase tracking-[0.2em] ${invert ? 'text-white/70' : 'text-primary'}`}
      >
        {eyebrow}
      </p>
    ) : null}
    <h2
      className={`text-3xl font-semibold leading-tight md:text-[32px] ${invert ? 'text-white' : 'text-text'}`}
    >
      {title}
    </h2>
    {description ? (
      <p className={`mt-4 text-base leading-7 ${invert ? 'text-white/75' : 'text-muted'}`}>
        {description}
      </p>
    ) : null}
  </div>
);
