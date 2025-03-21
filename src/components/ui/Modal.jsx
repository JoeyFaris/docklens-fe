import React from 'react';

/**
 * A reusable modal component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when the modal is closed
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} props.className - Additional className for the modal
 * @param {boolean} props.showCloseButton - Whether to show the close button
 * @param {React.ReactNode} props.footer - Modal footer content
 */
export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className = "", 
  showCloseButton = true,
  footer = null 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-100/80 flex items-center justify-center p-4 backdrop-blur-sm z-50">
      <div className={`bg-white rounded-3xl shadow-xl max-w-md w-full border-2 border-blue-200 ${className}`}>
        <div className="p-8">
          <header className="flex items-center justify-between mb-8">
            {title && <h2 className="text-2xl font-bold text-blue-700">{title}</h2>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-blue-400 hover:text-blue-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </header>

          <div className="space-y-6">
            {children}
          </div>

          {footer && (
            <footer className="flex justify-between gap-4 pt-6">
              {footer}
            </footer>
          )}
        </div>
      </div>
    </div>
  );
} 