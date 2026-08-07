// Skeleton loading component
import { HTMLAttributes } from 'react';
import { borderRadius, animation } from '../constants/design';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

const baseStyles = 'animate-pulse bg-gray-200';

const variantStyles = {
  text: 'rounded',
  rectangular: 'rounded-md',
  circular: 'rounded-full',
};

export function Skeleton({ 
  variant = 'rectangular', 
  width = '100%', 
  height = '1rem', 
  className = '',
  ...props 
}: SkeletonProps) {
  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={{ 
        width: widthStyle, 
        height: heightStyle,
        animationDuration: animation.slow 
      }}
      {...props}
    />
  );
}