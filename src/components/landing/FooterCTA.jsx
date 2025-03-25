export default function FooterCTA({ onConnectClick }) {
  return (
    <div className="py-24 bg-slate-900 w-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.2),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.2),transparent_40%)]"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
      </div>
      
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <div className="animate-on-scroll opacity-0 max-w-3xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">Ready to optimize your Docker environment?</h3>
          <button
            onClick={onConnectClick}
            className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg font-medium text-lg transition-all duration-300 shadow-green hover:shadow-green-lg transform hover:translate-y-[-2px] text-white relative overflow-hidden"
          >
            <span className="relative z-10">Connect to Docker</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          </button>
        </div>
      </div>
    </div>
  );
} 