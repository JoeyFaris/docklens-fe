import React from 'react';

/**
 * A reusable card component
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional className for the card
 * @param {React.ReactNode} props.headerRight - Element to render on the right side of the header
 * @param {React.ReactNode} props.footer - Footer content
 */
export default function Card({ 
  title, 
  children, 
  className = "", 
  headerRight = null,
  footer = null 
}) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {headerRight && (
            <div className="flex items-center">{headerRight}</div>
          )}
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
} 