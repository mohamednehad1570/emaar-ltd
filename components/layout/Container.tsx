import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  /** Extra Tailwind classes — e.g. py-24, relative z-10. Applied after base classes. */
  className?: string;
}

/** Standard max-width container with responsive horizontal padding. */
export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
