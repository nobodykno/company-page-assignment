import { IContainerProps } from '@/props/ui-props';




const maxWidths = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
};

export default function Container({
  children,
  className = '',
  maxWidth = 'lg',
}: IContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxWidths[maxWidth]} ${className}`}
    >
      {children}
    </div>
  );
}