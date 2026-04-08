import { Zap } from 'lucide-react';

import { LogoProps, SectionId } from '@/types';

export const Logo = ({ isLight = false }: LogoProps) => (
  <a className="inline-flex items-center gap-3" href={`#${SectionId.Hero}`}>
    <span
      className={[
        'flex h-10 w-10 items-center justify-center rounded-card border',
        isLight
          ? 'border-white/20 bg-white/10 text-white'
          : 'border-primary/10 bg-primary/5 text-primary',
      ].join(' ')}
    >
      <Zap className="h-5 w-5" />
    </span>
    <span className="flex flex-col">
      <span
        className={`text-lg font-extrabold tracking-[0.18em] ${isLight ? 'text-white' : 'text-text'}`}
      >
        ENERLINE
      </span>
      <span className={`text-xs ${isLight ? 'text-white/70' : 'text-muted'}`}>energy supply</span>
    </span>
  </a>
);
