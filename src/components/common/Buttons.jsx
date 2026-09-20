import React from 'react';

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  variant = 'primary', // 'primary' | 'gradient' | 'success' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  icon: Icon,
  fullWidth = true,
  type = 'button'
}) {
  const sizeClasses = {
    sm: 'py-2.5 px-4 text-sm min-h-[40px]',
    md: 'py-3.5 px-6 text-base font-semibold min-h-[48px]',
    lg: 'py-4 px-8 text-lg font-bold min-h-[56px]',
  };

  const variantClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow active:scale-[0.98]',
    gradient: 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:opacity-95 text-white shadow-md active:scale-[0.98]',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm active:scale-[0.98]',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm active:scale-[0.98]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center gap-2 rounded-2xl
        transition-all duration-150 select-none
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed transform-none hover:shadow-none' : 'cursor-pointer'}
        ${className}
      `}
    >
      {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
      <span>{children}</span>
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  disabled = false,
  className = '',
  icon: Icon,
  fullWidth = true,
  size = 'md',
  type = 'button'
}) {
  const sizeClasses = {
    sm: 'py-2 px-3 text-sm min-h-[38px]',
    md: 'py-3 px-5 text-base font-medium min-h-[48px]',
    lg: 'py-3.5 px-6 text-lg font-semibold min-h-[52px]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center gap-2 rounded-2xl
        bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50
        text-slate-700 active:scale-[0.98] transition-all duration-150 select-none
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {Icon && <Icon className="w-5 h-5 text-slate-500 flex-shrink-0" />}
      <span>{children}</span>
    </button>
  );
}
