import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CubeIcon,
  PhotoIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const location = useLocation();

  const getLinkClasses = (path) => {
    const baseClasses = "flex items-center px-4 py-3 rounded-xl transition-all duration-200 w-full group hover:shadow-soft";
    return location.pathname === path
      ? `${baseClasses} bg-green-600 text-white shadow-soft`
      : `${baseClasses} text-gray-600 hover:bg-gray-50`;
  };

  const getIconClasses = (isActive) => {
    return `h-5 w-5 mr-3 transition-transform duration-200 group-hover:scale-110 ${
      isActive ? 'text-white' : 'text-gray-400'
    }`;
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: location.pathname === '/dashboard', premium: false },
    { name: 'Images', href: '/images', icon: DocumentDuplicateIcon, current: location.pathname === '/images', premium: false },
    { name: 'Premium Features', href: '/premium', icon: SparklesIcon, current: location.pathname === '/premium', premium: false, highlight: true },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, current: location.pathname === '/settings', premium: false },
  ];

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen shadow-xl">
      <div className="p-6 border-b border-gray-200 bg-white">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="p-3 bg-green-600 rounded-xl shadow-glow transform hover:scale-105 transition-all duration-300">
            <svg className="h-8 w-8 text-white filter drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">DockLens</h1>
            <p className="text-xs text-gray-500">Container Analytics</p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-4">
        <div className="flex flex-col space-y-2">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              to={item.href} 
              className={`${getLinkClasses(item.href)} ${item.highlight ? 'relative overflow-hidden' : ''}`}
            >
              <item.icon className={getIconClasses(item.current)} />
              <span className="flex-1">{item.name}</span>
              {item.premium && (
                <span className="ml-2 px-1.5 py-0.5 text-xs font-medium rounded bg-green-100 text-green-800">
                  Premium
                </span>
              )}
              {item.highlight && (
                <span className="absolute inset-0 -z-10 bg-green-50 opacity-50"></span>
              )}
            </Link>
          ))}
        </div>
      </nav>
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-green-50 shadow-soft">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm text-gray-600">System Online</span>
        </div>
      </div>
    </div>
  );
}
