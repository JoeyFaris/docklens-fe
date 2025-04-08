import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-white">DockLens</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="#features" className="text-gray-300 hover:text-white transition-colors duration-200">
              Features
            </Link>
            <Link to="#pricing" className="text-gray-300 hover:text-white transition-colors duration-200">
              Pricing
            </Link>
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200">
              Dashboard
            </Link>
          </nav>

          {/* Sign In Button */}
          <div>
            <Link
              to="/signin"
              className="group px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-bold text-sm transition-all duration-300 text-white flex items-center justify-center border border-green-400/50 hover:border-green-400"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 