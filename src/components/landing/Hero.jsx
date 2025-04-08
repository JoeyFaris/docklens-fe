import { ArrowRightIcon, ShieldCheckIcon, ChartBarIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { SparklesIcon, BoltIcon } from '@heroicons/react/24/solid';

export default function Hero({ onConnectClick, animatedElements }) {
  return (
    <div className="relative w-full h-[calc(100dvh)] flex items-center text-white overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/iStock-1432962983.jpg")',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-[90%] lg:max-w-[60%] space-y-8">
          {/* Headline section */}
          <div className={`${animatedElements.hero ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#1e2c4c]/60 backdrop-blur-sm mb-6">
              <SparklesIcon className="h-4 w-4 md:h-5 md:w-5 text-green-400 mr-2" />
              <span className="text-sm md:text-base font-semibold text-white">Next-Gen Container Management</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              DockLens
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-medium">
              Visualize, monitor, and optimize your Docker containers with powerful AI-driven insights
            </p>
          </div>

          
          
          {/* Terminal illustration */}
          <div className={`${animatedElements.hero ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'}`}>
            <div className="relative bg-[#1e2c4c]/60 backdrop-blur-sm border border-white/10 rounded-xl p-4 py-5 shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:border-green-500/30 group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-300 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-300 transition-colors"></div>
                </div>
                <div className="text-xs text-gray-400 font-medium px-2 py-1 rounded-md bg-black/20">DockLens Terminal</div>
              </div>
              
              <div className="space-y-3 font-mono text-xs md:text-sm">
                <div className="flex items-center">
                  <span className="text-blue-400 mr-2">$</span>
                  <span className="text-green-400 font-medium">docklens analyze</span>
                </div>
                <div className="text-gray-300 pl-4 border-l border-gray-700">Scanning container environment...</div>
                <div className="text-gray-300 pl-4 border-l border-gray-700">Found <span className="text-yellow-400 font-bold">8</span> active containers</div>
                <div className="flex items-center pl-4 border-l border-gray-700">
                  <div className="w-3 h-3 border-2 border-green-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="text-green-400 font-medium">Analyzing performance metrics</span>
                </div>
                <div className="text-gray-300 pl-4 border-l border-gray-700">
                  <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-md">SUCCESS</span> Optimization recommendations ready
                </div>
                <div className="text-gray-300 pl-4 border-l border-gray-700 animate-pulse">
                  <span className="text-blue-400 mr-2">$</span>
                  <span className="text-white">_</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA buttons */}
          <div className={`${animatedElements.hero ? 'animate-fade-in-up animate-delay-500' : 'opacity-0'}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onConnectClick}
                className="group px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold text-base transition-all duration-300 text-white flex items-center justify-center"
              >
                Connect to Docker
                <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="/dashboard"
                className="px-6 py-3 bg-[#1e2c4c]/60 hover:bg-[#1e2c4c]/80 backdrop-blur-sm rounded-lg font-semibold text-base transition-all duration-300 text-white flex items-center justify-center"
              >
                View Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}