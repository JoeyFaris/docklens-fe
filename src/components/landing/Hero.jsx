import { ArrowRightIcon, ShieldCheckIcon, ChartBarIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { SparklesIcon, BoltIcon } from '@heroicons/react/24/solid';

export default function Hero({ onConnectClick, animatedElements }) {
  return (
    <div className="relative bg-white w-full h-[calc(100dvh-4rem)] flex items-center justify-center text-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Centered headline with badge */}
        <div className={`text-center mb-5 ${animatedElements.hero ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white shadow-green border-2 border-green-200 mb-3 hover:shadow-green-lg transition-all duration-300">
            <SparklesIcon className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2" />
            <span className="text-sm md:text-base font-semibold text-gray-800">Next-Gen Container Management</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
            <span className="text-gray-900">DockLens</span>
          </h1>
          
          <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto font-medium">
            Visualize, monitor, and optimize your Docker containers with powerful AI-driven insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Left content - Features */}
          <div className={`lg:col-span-5 ${animatedElements.hero ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
            <div className="bg-white rounded-xl p-4 shadow-prominent hover:shadow-prominent-hover transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-start group">
                  <div className="flex-shrink-0 p-2.5 bg-green-50 rounded-lg mr-3 group-hover:bg-green-100 transition-colors duration-300 border-2 border-green-200">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1.5">100% Local Processing</h3>
                    <p className="text-xs md:text-sm text-gray-700">Your container data never leaves your system, ensuring complete privacy and security</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 p-2.5 bg-blue-50 rounded-lg mr-3 group-hover:bg-blue-100 transition-colors duration-300 border-2 border-blue-200">
                    <ChartBarIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1.5">Advanced Analytics</h3>
                    <p className="text-xs md:text-sm text-gray-700">Identify performance bottlenecks and resource usage patterns with real-time metrics</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 p-2.5 bg-purple-50 rounded-lg mr-3 group-hover:bg-purple-100 transition-colors duration-300 border-2 border-purple-200">
                    <BoltIcon className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1.5">Automated Optimization</h3>
                    <p className="text-xs md:text-sm text-gray-700">Get intelligent recommendations to improve container performance and resource allocation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right content - Terminal illustration */}
          <div className={`lg:col-span-7 ${animatedElements.hero ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'}`}>
            <div className="relative">
              <div className="relative bg-white border border-gray-100 rounded-xl p-4 py-5 shadow-prominent hover:shadow-prominent-hover">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">DockLens Terminal</div>
                </div>
                
                <div className="space-y-2 font-mono text-xs">
                  <div className="text-green-600 font-medium">$ docklens analyze</div>
                  <div className="text-gray-600">Scanning container environment...</div>
                  <div className="text-gray-600">Found 8 active containers</div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 border-2 border-green-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span className="text-green-600 font-medium">Analyzing performance metrics</span>
                  </div>
                  <div className="h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                    <div className="text-center">
                      <div className="text-green-600 font-medium mb-1.5 text-xs">Container Visualization</div>
                      <div className="flex justify-center space-x-1.5">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="w-4 h-5 bg-white border border-gray-200 rounded shadow-sm"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-600">Optimization recommendations ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA buttons */}
        <div className={`mt-5 text-center ${animatedElements.hero ? 'animate-fade-in-up animate-delay-500' : 'opacity-0'}`}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onConnectClick}
              className="group px-4 py-2.5 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-sm transition-all duration-300 shadow-green-lg hover:shadow-glow text-white flex items-center justify-center border-2 border-green-500"
            >
              Connect to Docker
              <ArrowRightIcon className="ml-2 h-3.5 w-3.5 transform group-hover:translate-x-2 transition-transform" />
            </button>
            
            <a
              href="/dashboard"
              className="px-4 py-2.5 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 rounded-lg font-bold text-sm transition-all duration-300 text-gray-700 flex items-center justify-center shadow-prominent hover:shadow-prominent-hover"
            >
              View Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}