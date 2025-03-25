import { CheckIcon } from '@heroicons/react/24/outline';

export default function Features() {
  return (
    <div className="py-24 bg-gray-50 w-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdjJoLTF2LTJ6bS03LTNoNHYxaC00di0xem0wIDJoMXY0aC0xdi00em0tNy0xaDR2MWgtNHYtMXptMCAyaDF2NGgtMXYtNHptMzYtMTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em01LTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em0tNy0xaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bS0zNi0yaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMmgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTctMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=')] mix-blend-soft-light opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 animate-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
      
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <div className="animate-on-scroll opacity-0 text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600">Everything you need in one place</h3>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">DockLens provides comprehensive visibility into your Docker environment with zero setup required.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="animate-on-scroll opacity-0 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-green transition-all duration-300 hover:border-emerald-600 group">
            <div className="bg-emerald-900/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-2xl font-semibold mb-4 text-gray-900">Security Analysis</h4>
            <p className="text-gray-600 text-lg">Identify vulnerabilities and security risks in your Docker containers in real-time.</p>
          </div>
          
          <div className="animate-on-scroll opacity-0 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-green transition-all duration-300 hover:border-emerald-600 group">
            <div className="bg-emerald-900/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-2xl font-semibold mb-4 text-gray-900">Powerful Analytics</h4>
            <p className="text-gray-600 text-lg">Get detailed insights into container performance and resource usage.</p>
          </div>
          
          <div className="animate-on-scroll opacity-0 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-green transition-all duration-300 hover:border-emerald-600 group">
            <div className="bg-emerald-900/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-2xl font-semibold mb-4 text-gray-900">Optimization</h4>
            <p className="text-gray-600 text-lg">Smart recommendations to improve container performance and reduce resource usage.</p>
          </div>
        </div>
        
        <div className="animate-on-scroll opacity-0 max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mb-8"></div>
            <h3 className="text-3xl font-bold mb-8 text-gray-900">Key capabilities</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            <div className="flex items-start group">
              <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-gray-600 text-lg">Zero setup required</span>
            </div>
            <div className="flex items-start group">
              <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-gray-600 text-lg">Unlimited containers with no user-based licensing</span>
            </div>
            <div className="flex items-start group">
              <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-gray-600 text-lg">Embed analytics into applications</span>
            </div>
            <div className="flex items-start group">
              <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-gray-600 text-lg">Schedule dashboard reports</span>
            </div>
            <div className="flex items-start group">
              <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-gray-600 text-lg">Generate data visualizations from natural language</span>
            </div>
            <div className="flex items-start group">
              <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-gray-600 text-lg">Real-time monitoring and alerts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 