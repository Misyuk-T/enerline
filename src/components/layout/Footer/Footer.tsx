import { ChevronUp } from 'lucide-react';

import { Container, Logo } from '@/components/common';

import { SectionId } from '@/types';

export const Footer = () => (
  <footer className="border-t border-border bg-white">
    <Container className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <Logo imageClassName="h-[6.5rem]" />
      <p className="text-sm text-muted">
        © {new Date().getFullYear()} ENERLINE. Всі права захищені.
      </p>
      <a
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-secondary"
        href={`#${SectionId.Hero}`}
      >
        <ChevronUp className="h-4 w-4" />
        Вгору
      </a>
    </Container>
  </footer>
);
