// Reusable Select component
import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, fullWidth = false, className = '', ...props }, ref) => {
    const selectStyles = `
      w-full
      px-4 py-2
      border border-gray-300 rounded-md
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
      transition-all duration-200
      ${error ? 'border-red-500 focus:ring-red-500' : ''}
    `;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`${selectStyles} ${className}`}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';