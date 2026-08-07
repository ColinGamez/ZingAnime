// Empty state component
import { HTMLAttributes } from 'react';

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action, 
  className = '',
  ...props 
}: EmptyStateProps) {
  return (
    <div 
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-gray-400">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-500 mb-4 max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}