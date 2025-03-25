import { CheckIcon } from '@heroicons/react/24/outline';

export default function Hero({ onConnectClick, animatedElements }) {
  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white w-screen min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdjJoLTF2LTJ6bS03LTNoNHYxaC00di0xem0wIDJoMXY0aC0xdi00em0tNy0xaDR2MWgtNHYtMXptMCAyaDF2NGgtMXYtNHptMzYtMTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em01LTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em0tNy0xaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bS0zNi0yaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMmgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTctMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=')] mix-blend-soft-light opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 animate-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative w-full">
        <header className="flex items-center justify-between mb-12 max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-600 rounded-lg">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">DockLens</h1>
              <p className="text-gray-600 text-sm font-medium tracking-wide">Container Analytics</p>
            </div>
          </div>
          <a
            href="/dashboard"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-all duration-300 shadow-green hover:shadow-green-lg transform hover:translate-y-[-2px] text-white flex items-center group"
          >
            Dashboard
            <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </header>

        <div className={`max-w-7xl mx-auto ${animatedElements.hero ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600">
              Visualize your Docker environment like never before
            </h2>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl">
            DockLens is the best way to analyze, monitor, and optimize your Docker containers with powerful visualizations and intelligent insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <button
              onClick={onConnectClick}
              className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg font-medium text-lg transition-all duration-300 shadow-green hover:shadow-green-lg transform hover:translate-y-[-2px] text-white flex items-center justify-center relative overflow-hidden"
            >
              <span className="relative z-10">Connect to Docker</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <svg className="ml-2 h-5 w-5 relative z-10 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 max-w-2xl">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>All data is processed locally. We don't store any information about your containers.</span>
          </div>
        </div>
      </div>
    </div>
  );
} 