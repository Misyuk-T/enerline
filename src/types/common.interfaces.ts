import type { PropsWithChildren, ReactNode } from 'react';

import type { ButtonVariant } from '@/types/content';

export interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export interface LogoProps {
  className?: string;
  imageClassName?: string;
  isLight?: boolean;
}

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  invert?: boolean;
}

export interface RevealProps extends PropsWithChildren {
  className?: string;
}

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  onClick?: () => void;
  rel?: string;
  target?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
}

export interface ButtonStyleProps {
  className?: string;
  fullWidth?: boolean;
  variant?: ButtonVariant;
}
