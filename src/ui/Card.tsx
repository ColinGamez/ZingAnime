// Reusable Card component
import { HTMLAttributes, forwardRef } from 'react';
import { spacing, borderRadius, shadows } from '../constants/design';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const baseStyles = 'rounded-lg';

const variantStyles = {
  default: 'bg-white border border-gray-200',
  elevated: 'bg-white shadow-md',
  flat: 'bg-gray-50',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${paddingStyles[padding]}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';