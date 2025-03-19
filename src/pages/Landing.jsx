import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnalyzeImageModal from '../components/AnalyzeImageModal';

export default function Landing() {
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm w-full fixed top-0 z-50 py-4">
        <div className="w-full h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative transform transition-transform duration-200 group-hover:scale-105">
                  <svg className="h-10 w-10 text-blue-600" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M8 8H28V28H8V8Z" 
                      className="stroke-current" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M7 18H29" 
                      className="stroke-current" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      strokeDasharray="2 2"
                    />
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
                  </svg>
                  <div className="absolute inset-0 animate-ping-slow opacity-25 bg-blue-400 rounded-lg"></div>
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-gray-900 font-mono bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    DockLens
                  </h1>
                  <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 font-mono">Container Analytics</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="px-4 py-2 text-sm font-mono font-bold tracking-widest text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Add padding-top to account for fixed nav */}
      <div className="pt-16 w-full">
        {/* Hero Section */}
        <div className="w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold">
                <span className="text-gray-900">Optimize your Docker images</span>
                <br />
                <span className="text-blue-600">to improve security and performance</span>
              </h2>
              <p className="mt-8 text-xl xl:text-2xl text-gray-500 max-w-4xl mx-auto">
                DockLens helps you analyze and optimize your Docker images, highlighting security vulnerabilities, performance bottlenecks, and optimization opportunities.
              </p>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowAnalyzeModal(true)}
                  className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span>Analyze Environment</span>
                  <svg className="w-5 h-5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="w-full bg-gradient-to-br from-blue-50 to-blue-100 py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                Start optimizing your Docker environment today
              </span>
            </h2>
            
            {/* Free and Premium Features Section */}
            <div className="mb-16">
              <div className="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-lg">
                <div className="md:w-1/2 bg-white p-8">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Available Now
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Features</h3>
                  <ul className="space-y-3 mb-6 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Container environment overview</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Basic resource usage monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Container and image listings</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Layer analysis visualization</span>
                    </li>
                  </ul>
                  <Link 
                    to="/dashboard" 
                    className="px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <span>Launch Free Dashboard</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
                <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-100 mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Coming Soon
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Premium Features</h3>
                  <ul className="space-y-3 mb-6 text-blue-100">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-300 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Advanced security vulnerability scanning</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-300 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>AI-powered optimization recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-300 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <span>Vulnerability alerts and notifications</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-300 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>Compliance reporting and documentation</span>
                    </li>
                  </ul>
                  <Link 
                    to="/premium" 
                    className="px-6 py-3 text-base font-medium bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <span>View Premium Features</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Security Analysis</h3>
                <p className="text-gray-600">Identify vulnerabilities and security risks in your Docker images and containers.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Optimization</h3>
                <p className="text-gray-600">Get insights and recommendations to improve your container performance.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Resource Monitoring</h3>
                <p className="text-gray-600">Monitor resource usage and get real-time insights into your containers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnalyzeImageModal
        isOpen={showAnalyzeModal}
        onClose={() => setShowAnalyzeModal(false)}
        onAnalysisComplete={(results) => {
          setShowAnalyzeModal(false);
          // Log the full results object
          console.log('Analysis Results:', results);
          
          // Log specific sections
          console.log('Container Stats:', results.containerStats);
          console.log('Container Count:', results.containerCount);
          console.log('Running Containers:', results.runningContainers);
          console.log('Image Count:', results.imageCount);
          console.log('Optimization Score:', results.optimizationScore);
          console.log('Layer Analysis:', results.layers);
          console.log('Security Vulnerabilities:', results.securityScan.vulnerabilities);
          
          // Navigate to dashboard with results
          window.location.href = '/dashboard';
        }}
      />
    </div>
  );
} 