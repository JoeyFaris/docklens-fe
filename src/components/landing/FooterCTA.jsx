export default function FooterCTA({ onConnectClick }) {
  return (
    <div className="py-24 bg-gray-50 w-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdjJoLTF2LTJ6bS03LTNoNHYxaC00di0xem0wIDJoMXY0aC0xdi00em0tNy0xaDR2MWgtNHYtMXptMCAyaDF2NGgtMXYtNHptMzYtMTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em01LTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em0tNy0xaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bS0zNi0yaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMmgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTctMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=')] mix-blend-soft-light opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 animate-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
      </div>
      
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <div className="animate-on-scroll opacity-0 max-w-3xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600">Ready to optimize your Docker environment?</h3>
          <button
            onClick={onConnectClick}
            className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg font-medium text-lg transition-all duration-300 shadow-green hover:shadow-green-lg transform hover:translate-y-[-2px] text-white relative overflow-hidden"
          >
            <span className="relative z-10">Connect to Docker</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          </button>
        </div>
      </div>
    </div>
  );
} 