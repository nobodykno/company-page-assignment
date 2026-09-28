import { ICardProps } from '@/props/ui-props';



export default function Card({ children, className = '' }: ICardProps) {
  return (
    <div
      className={`rounded-[var(--border-radius)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 lg:p-6 ${className}`}
    >
      {children}
    </div>
  );
}