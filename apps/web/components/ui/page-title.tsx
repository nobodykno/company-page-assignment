import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import Container from './container';

interface PageTitleProps {
  title: ReactNode;
  description: ReactNode;
  titleProps?: ComponentPropsWithoutRef<'h1'>;
  descriptionProps?: ComponentPropsWithoutRef<'p'>;
}

export default function PageTitle({
  title,
  description,
  titleProps,
  descriptionProps,
}: PageTitleProps) {
  return (
    <Container className="py-16">
      <h1
        {...titleProps}
        className={`text-[var(--font-size-title)] font-bold ${
          titleProps?.className ?? ''
        }`}
      >
        {title}
      </h1>

      <p
        {...descriptionProps}
        className={`mt-3 max-w-2xl text-[var(--font-size-md)] text-[var(--color-text-secondary)] ${
          descriptionProps?.className ?? ''
        }`}
      >
        {description}
      </p>
    </Container>
  );
}