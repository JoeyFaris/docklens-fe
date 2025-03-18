import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CubeIcon,
  PhotoIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const location = useLocation();

  const getLinkClasses = (path) => {
    const baseClasses = "flex items-center px-4 py-3 rounded-xl transition-all duration-200 w-full group hover:shadow-soft";
    return location.pathname === path
      ? `${baseClasses} bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-soft`
      : `${baseClasses} text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100`;
  };

  const getIconClasses = (isActive) => {
    return `h-5 w-5 mr-3 transition-transform duration-200 group-hover:scale-110 ${
      isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'
    }`;
  };

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen shadow-xl">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-b from-white to-gray-50">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative transform transition-transform duration-200 group-hover:scale-105">
            <svg className="h-10 w-10 text-blue-600" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Main Container */}
              <path 
                d="M8 8H28V28H8V8Z" 
                className="stroke-current" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              {/* Scanning line animation */}
              <path 
                d="M7 18H29" 
                className="stroke-current" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                strokeDasharray="2 2"
              />
              {/* Top scanning bracket */}
              <path 
                d="M12 6H10C8.89543 6 8 6.89543 8 8V10" 
                className="stroke-current" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M24 6H26C27.1046 6 28 6.89543 28 8V10" 
                className="stroke-current" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              {/* Bottom scanning bracket */}
              <path 
                d="M12 30H10C8.89543 30 8 29.1046 8 28V26" 
                className="stroke-current" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M24 30H26C27.1046 30 28 29.1046 28 28V26" 
                className="stroke-current" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              {/* Inner container elements */}
              <path 
                d="M12 13H24M12 18H24M12 23H20" 
                className="stroke-current" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            {/* Pulse effect */}
            <div className="absolute inset-0 animate-ping-slow opacity-25 bg-blue-400 rounded-lg" style={{ animationDuration: '3s' }}></div>
          </div>
          <div className="transform transition-transform duration-200 group-hover:scale-105">
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              DockScan
            </h1>
            <p className="text-xs text-gray-500">Container Analytics</p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-4">
        <div className="flex flex-col space-y-2">
          <Link to="/" className={getLinkClasses('/')}>
            <HomeIcon className={getIconClasses(location.pathname === '/')} />
            Dashboard
          </Link>
          <Link to="/containers" className={getLinkClasses('/containers')}>
            <CubeIcon className={getIconClasses(location.pathname === '/containers')} />
            Containers
          </Link>
          <Link to="/images" className={getLinkClasses('/images')}>
            <PhotoIcon className={getIconClasses(location.pathname === '/images')} />
            Images
          </Link>
          <Link to="/settings" className={getLinkClasses('/settings')}>
            <Cog6ToothIcon className={getIconClasses(location.pathname === '/settings')} />
            Settings
          </Link>
        </div>
      </nav>
      <div className="p-4 border-t border-gray-200 bg-gradient-to-t from-gray-50 to-white">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 shadow-soft">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm text-gray-600">System Online</span>
        </div>
      </div>
    </div>
  );
}
