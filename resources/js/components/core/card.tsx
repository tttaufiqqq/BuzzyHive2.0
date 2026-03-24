import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn('bg-white rounded-3xl p-6 shadow-sm border border-yellow-100', className)}
      {...props}
    >
      {children}
    </div>
  );
};
