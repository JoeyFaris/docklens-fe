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
  footer = null 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1e2c4c]/80 flex items-center justify-center p-4 backdrop-blur-sm z-50">
      <div className={`bg-[#1e2c4c] rounded-3xl shadow-xl max-w-md w-full border border-green-500/30 ${className}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            {title && <h2 className="text-2xl font-bold text-white">{title}</h2>}
            
          </div>

          <div className="space-y-6 text-gray-200">
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