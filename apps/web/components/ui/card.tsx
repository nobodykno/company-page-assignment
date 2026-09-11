import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-[var(--border-radius)] border border-[var(--color-border)] bg-[var(--color-surface)] ${className}`}
    >
      {children}
    </div>
  );
}
