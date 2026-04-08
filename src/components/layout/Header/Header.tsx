import { useEffect, useState } from 'react';

import { Button, Container, Logo } from '@/components/common';

import { HeaderProps, SectionId } from '@/types';

export const Header = ({ sections }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-50 border-b border-transparent bg-white/95 backdrop-blur transition-all duration-200',
        isScrolled ? 'shadow-soft' : '',
      ].join(' ')}
    >
      <Container className="flex min-h-[84px] items-center justify-between gap-6">
        <Logo imageClassName="h-[6.5rem]" />

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-card border border-border text-text lg:hidden"
          type="button"
          aria-expanded={isMenuOpen}
          aria-label="Відкрити меню"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <span className="relative h-4 w-5">
            <span
              className={[
                'absolute left-0 top-0 h-0.5 w-full bg-current transition-transform',
                isMenuOpen ? 'translate-y-[7px] rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'absolute left-0 top-[7px] h-0.5 w-full bg-current transition-opacity',
                isMenuOpen ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            />
            <span
              className={[
                'absolute left-0 top-[14px] h-0.5 w-full bg-current transition-transform',
                isMenuOpen ? '-translate-y-[7px] -rotate-45' : '',
              ].join(' ')}
            />
          </span>
        </button>

        <div
          className={[
            'absolute left-0 right-0 top-full border-b border-border bg-white px-4 py-4 shadow-soft lg:static lg:flex lg:items-center lg:gap-8 lg:border-none lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none',
            isMenuOpen ? 'block' : 'hidden lg:flex',
          ].join(' ')}
        >
          <nav className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <a
              className="text-sm font-medium text-text transition hover:text-primary"
              href={`#${SectionId.Hero}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Головна
            </a>

            {sections.map((section) => (
              <a
                key={section.id}
                className="text-sm font-medium text-text transition hover:text-primary"
                href={`#${section.id}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {section.label}
              </a>
            ))}
          </nav>

          <div className="mt-5 lg:mt-0">
            <Button href={`#${SectionId.Contacts}`} fullWidth onClick={() => setIsMenuOpen(false)}>
              Зв&apos;язатись
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
