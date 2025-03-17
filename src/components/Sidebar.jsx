import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CubeIcon,
  PhotoIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Containers', href: '/containers', icon: CubeIcon },
  { name: 'Images', href: '/images', icon: PhotoIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 shadow-lg">
      <div className="flex items-center h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-primary-700">
        <h1 className="text-xl font-bold text-white">Docker Analysis</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-102 ${
                isActive
                  ? 'bg-primary-50 text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                  isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600'
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-50">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm text-gray-600">System Online</span>
        </div>
      </div>
    </div>
  );
} 