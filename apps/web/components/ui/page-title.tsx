
import Container from './container';
import { IPageTitleProps } from '@/props/page-title-props';

export default function PageTitle({
  title,
  description,
  titleProps,
  descriptionProps,
}: IPageTitleProps) {
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