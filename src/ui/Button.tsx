// Reusable Button component with consistent styling
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { spacing, borderRadius, transition, fontSize } from '../constants/design';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const baseStyles = `
  inline-flex items-center justify-center
  font-medium
  transition-colors
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  disabled:opacity-50
  disabled:cursor-not-allowed
`;

const variantStyles = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizeStyles = {
  sm: `${fontSize.sm} ${spacing.sm} ${spacing.md} ${borderRadius.base}`,
  md: `${fontSize.base} ${spacing.md} ${spacing.lg} ${borderRadius.md}`,
  lg: `${fontSize.lg} ${spacing.lg} ${spacing.xl} ${borderRadius.lg}`,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, fullWidth, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${transition.base}
          ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';