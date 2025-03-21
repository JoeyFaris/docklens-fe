import React from 'react';

/**
 * A reusable button component with different variants
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, outline, danger)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.isLoading - Whether the button is in loading state
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional className for the button
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  className = '',
  ...props
}) {
  // Base classes
  const baseClasses = 'rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center font-medium';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-2 border-blue-200',
    outline: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
} 