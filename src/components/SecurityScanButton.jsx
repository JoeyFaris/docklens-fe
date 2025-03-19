import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import SecurityScanModal from './SecurityScanModal';

export default function SecurityScanButton({ 
  imageId, 
  buttonText = 'Security Scan', 
  className = '', 
  iconClassName = '', 
  variant = 'primary',
  useModal = true
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    // Redirect to premium page instead of opening modal or security scan page
    navigate('/premium');
  };

  // Define button variants
  const getButtonClasses = () => {
    const baseClasses = 'flex items-center justify-center rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
    const sizeClasses = 'px-3 py-1.5 text-sm';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} ${sizeClasses} bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 ${className}`;
      case 'secondary':
        return `${baseClasses} ${sizeClasses} bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500 ${className}`;
      case 'outline':
        return `${baseClasses} ${sizeClasses} border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-gray-500 ${className}`;
      case 'danger':
        return `${baseClasses} ${sizeClasses} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 ${className}`;
      case 'minimal':
        return `${baseClasses} hover:bg-gray-100 text-gray-700 focus:ring-gray-500 ${className}`;
      default:
        return `${baseClasses} ${sizeClasses} bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 ${className}`;
    }
  };

  return (
    <>
      <button
        type="button"
        className={getButtonClasses()}
        onClick={handleClick}
      >
        <SparklesIcon className={`h-4 w-4 ${iconClassName} ${buttonText ? 'mr-1.5' : ''}`} />
        {buttonText} <span className="ml-1 text-xs font-bold opacity-75">(Premium)</span>
      </button>
    </>
  );
} 