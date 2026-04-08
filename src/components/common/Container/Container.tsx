import { ContainerProps } from '@/types';

export const Container = ({ children, className = '' }: ContainerProps) => (
  <div className={`mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 ${className}`.trim()}>
    {children}
  </div>
);
