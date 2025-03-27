import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">DockLens</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link to="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
          </nav>

          {/* Sign In Button */}
          <div>
            <Link
              to="/dashboard"
              className="group px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-sm transition-all duration-300 shadow-green-lg hover:shadow-glow text-white flex items-center justify-center border-2 border-green-500"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 