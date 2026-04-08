import { LogoProps, SectionId } from '@/types';

export const Logo = ({ className = '', imageClassName = '', isLight = false }: LogoProps) => (
  <a className={`inline-flex items-center ${className}`.trim()} href={`#${SectionId.Hero}`}>
    <img
      className={[
        'h-14 w-auto object-contain transition-transform duration-200',
        imageClassName,
        isLight ? 'drop-shadow-[0_2px_6px_rgba(255,255,255,0.18)]' : '',
      ].join(' ')}
      src="/assets/logo-no-bg.png"
      alt="Enerline"
    />
  </a>
);
