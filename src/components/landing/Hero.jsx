import { ArrowRightIcon, ShieldCheckIcon, ChartBarIcon, CpuChipIcon } from '@heroicons/react/24/outline';

export default function Hero({ onConnectClick, animatedElements }) {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 w-screen min-h-screen flex items-center justify-center text-white">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.2),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.2),transparent_40%)]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10 flex flex-col lg:flex-row items-center gap-12">
        {/* Left content */}
        <div className={`lg:w-1/2 ${animatedElements.hero ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center mb-6">
            <div className="p-2 bg-emerald-500/20 rounded-lg mr-3">
              <CpuChipIcon className="h-6 w-6 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
              DockLens
            </h1>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Intelligent <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">Docker</span> monitoring & optimization
          </h2>
          
          <p className="text-lg text-slate-300 mb-8 max-w-xl">
            Get real-time insights, powerful visualizations, and automated recommendations to optimize your container environment.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 p-1 bg-emerald-500/20 rounded-full mr-3">
                <ShieldCheckIcon className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-slate-300">100% local processing - your container data never leaves your system</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 p-1 bg-emerald-500/20 rounded-full mr-3">
                <ChartBarIcon className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-slate-300">Advanced analytics to identify performance bottlenecks</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onConnectClick}
              className="group px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 text-white flex items-center justify-center"
            >
              Connect to Docker
              <ArrowRightIcon className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a
              href="/dashboard"
              className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg font-medium transition-all duration-300 text-white flex items-center justify-center"
            >
              View Dashboard
            </a>
          </div>
        </div>
        
        {/* Right content - illustration */}
        <div className={`lg:w-1/2 ${animatedElements.hero ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-slate-800/80 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs text-slate-400">DockLens Terminal</div>
              </div>
              
              <div className="space-y-2 font-mono text-sm">
                <div className="text-emerald-400">$ docklens analyze</div>
                <div className="text-slate-300">Scanning container environment...</div>
                <div className="text-slate-300">Found 8 active containers</div>
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="text-emerald-400">Analyzing performance metrics</span>
                </div>
                <div className="h-32 bg-slate-700/50 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-emerald-400 mb-2">Container Visualization</div>
                    <div className="flex justify-center space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-8 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-slate-300">Optimization recommendations ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}