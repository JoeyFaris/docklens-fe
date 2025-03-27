import { CheckIcon } from '@heroicons/react/24/outline';

export default function Features() {
  return (
    <div className="py-24 bg-white w-screen relative overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <div className="animate-on-scroll opacity-0 text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Everything you need in one place</h3>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">DockLens provides comprehensive visibility into your Docker environment with zero setup required.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 ">
          <div className="animate-on-scroll opacity-0 bg-white border border-gray-100 rounded-2xl p-8 shadow-prominent hover:shadow-prominent-hover transition-all duration-300 hover:border-green-500 group">
            <div className="bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-2xl font-semibold mb-4 text-gray-900">Security Analysis</h4>
            <p className="text-gray-600 text-lg">Identify vulnerabilities and security risks in your Docker containers in real-time.</p>
          </div>
          
          <div className="animate-on-scroll opacity-0 bg-white border border-gray-100 rounded-2xl p-8 shadow-prominent hover:shadow-prominent-hover transition-all duration-300 hover:border-green-500 group">
            <div className="bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-2xl font-semibold mb-4 text-gray-900">Powerful Analytics</h4>
            <p className="text-gray-600 text-lg">Get detailed insights into container performance and resource usage.</p>
          </div>
          
          <div className="animate-on-scroll opacity-0 bg-white border border-gray-100 rounded-2xl p-8 shadow-prominent hover:shadow-prominent-hover transition-all duration-300 hover:border-green-500 group">
            <div className="bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-2xl font-semibold mb-4 text-gray-900">Optimization</h4>
            <p className="text-gray-600 text-lg">Smart recommendations to improve container performance and reduce resource usage.</p>
          </div>
        </div>
        
        <div className="animate-on-scroll opacity-0 max-w-5xl mx-auto bg-gradient-to-br from-white to-green-50 rounded-3xl p-12 shadow-prominent hover:shadow-prominent-hover transition-all duration-300">
          <div className="mb-12 text-center">
            <div className="h-1.5 w-32 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-8"></div>
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Powerful Features at Your Fingertips</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Everything you need to manage and optimize your Docker environment, with enterprise-grade capabilities built right in.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            <div className="flex items-start group hover:transform hover:translate-y-[-2px] transition-all duration-300">
              <div className="bg-white p-2 rounded-lg shadow-sm mr-4 group-hover:shadow-md group-hover:bg-green-50 transition-all duration-300">
                <CheckIcon className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="text-gray-800 text-lg font-medium">Zero Configuration</span>
                <p className="text-gray-600 mt-1 text-sm">Get started immediately with no setup required</p>
              </div>
            </div>
            
            <div className="flex items-start group hover:transform hover:translate-y-[-2px] transition-all duration-300">
              <div className="bg-white p-2 rounded-lg shadow-sm mr-4 group-hover:shadow-md group-hover:bg-green-50 transition-all duration-300">
                <CheckIcon className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="text-gray-800 text-lg font-medium">Unlimited Containers</span>
                <p className="text-gray-600 mt-1 text-sm">No user-based licensing restrictions</p>
              </div>
            </div>
            
            <div className="flex items-start group hover:transform hover:translate-y-[-2px] transition-all duration-300">
              <div className="bg-white p-2 rounded-lg shadow-sm mr-4 group-hover:shadow-md group-hover:bg-green-50 transition-all duration-300">
                <CheckIcon className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="text-gray-800 text-lg font-medium">Embeddable Analytics</span>
                <p className="text-gray-600 mt-1 text-sm">Integrate insights into your applications</p>
              </div>
            </div>
            
            <div className="flex items-start group hover:transform hover:translate-y-[-2px] transition-all duration-300">
              <div className="bg-white p-2 rounded-lg shadow-sm mr-4 group-hover:shadow-md group-hover:bg-green-50 transition-all duration-300">
                <CheckIcon className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="text-gray-800 text-lg font-medium">Automated Reports</span>
                <p className="text-gray-600 mt-1 text-sm">Schedule and receive dashboard insights</p>
              </div>
            </div>
            
            <div className="flex items-start group hover:transform hover:translate-y-[-2px] transition-all duration-300">
              <div className="bg-white p-2 rounded-lg shadow-sm mr-4 group-hover:shadow-md group-hover:bg-green-50 transition-all duration-300">
                <CheckIcon className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="text-gray-800 text-lg font-medium">AI-Powered Insights</span>
                <p className="text-gray-600 mt-1 text-sm">Natural language data visualization</p>
              </div>
            </div>
            
            <div className="flex items-start group hover:transform hover:translate-y-[-2px] transition-all duration-300">
              <div className="bg-white p-2 rounded-lg shadow-sm mr-4 group-hover:shadow-md group-hover:bg-green-50 transition-all duration-300">
                <CheckIcon className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="text-gray-800 text-lg font-medium">Real-time Monitoring</span>
                <p className="text-gray-600 mt-1 text-sm">Live alerts and performance tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 