import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const baseStyles = 'font-semibold rounded-full transition-colors';

  const variants = {
    primary: 'bg-brand text-cream hover:bg-brand-dark',
    secondary: 'bg-cream-deep text-ink hover:bg-brand/10',
    outline: 'border-2 border-brand text-brand hover:bg-brand/5',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
  );
}
