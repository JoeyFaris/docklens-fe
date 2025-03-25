import { CheckIcon } from '@heroicons/react/24/outline';

export default function Pricing({ onConnectClick, email, setEmail, isSubmitting, submitSuccess, handleNotificationSignup }) {
  return (
    <div className="py-24 bg-white w-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdjJoLTF2LTJ6bS03LTNoNHYxaC00di0xem0wIDJoMXY0aC0xdi00em0tNy0xaDR2MWgtNHYtMXptMCAyaDF2NGgtMXYtNHptMzYtMTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em01LTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em0tNy0xaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bS0zNi0yaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMmgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTctMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=')] mix-blend-soft-light opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 animate-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
      
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <div className="animate-on-scroll opacity-0 text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600">Simple, transparent pricing</h3>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">Choose the plan that's right for you, with no hidden fees.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="animate-on-scroll opacity-0 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 hover:border-emerald-600 transition-all duration-300 hover:shadow-green h-full group">
            <div className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-2xl font-bold mb-2 text-gray-900">Free</h4>
                  <p className="text-4xl font-bold text-gray-900">$0</p>
                </div>
                <span className="px-4 py-2 bg-emerald-900/40 text-emerald-400 text-sm rounded-full">
                  Available Now
                </span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start group/item">
                  <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                  <span className="text-gray-600 text-lg">Basic container analytics</span>
                </li>
                <li className="flex items-start group/item">
                  <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                  <span className="text-gray-600 text-lg">Container status monitoring</span>
                </li>
                <li className="flex items-start group/item">
                  <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                  <span className="text-gray-600 text-lg">Image information</span>
                </li>
              </ul>
              <button
                onClick={onConnectClick}
                className="w-full py-4 text-center bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg font-medium transition-all duration-300 text-white mt-auto group relative overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="animate-on-scroll opacity-0 bg-gradient-to-b from-emerald-900/20 to-white/50 backdrop-blur-sm rounded-2xl border border-emerald-800/50 overflow-hidden transition-all duration-300 hover:shadow-green-lg h-full group">
            <div className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-2xl font-bold mb-2 text-gray-900">Premium</h4>
                  <p className="text-4xl font-bold text-gray-900">$19<span className="text-lg font-normal text-gray-600">/month</span></p>
                </div>
                <span className="px-4 py-2 bg-emerald-900/40 text-emerald-400 text-sm rounded-full">
                  Coming Soon
                </span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start group/item">
                  <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                  <span className="text-gray-600 text-lg">Advanced security scanning</span>
                </li>
                <li className="flex items-start group/item">
                  <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                  <span className="text-gray-600 text-lg">Performance optimization</span>
                </li>
                <li className="flex items-start group/item">
                  <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                  <span className="text-gray-600 text-lg">AI-powered recommendations</span>
                </li>
                <li className="flex items-start group/item">
                  <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                  <span className="text-gray-600 text-lg">Custom report generation</span>
                </li>
              </ul>
              <div className="mt-auto">
                <form onSubmit={handleNotificationSignup} className="flex flex-col space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-white placeholder-gray-500 backdrop-blur-sm"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden group ${
                      isSubmitting ? 'bg-gray-700 text-gray-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800'
                    }`}
                  >
                    <span className="relative z-10">{isSubmitting ? 'Submitting...' : 'Notify Me'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </button>
                </form>
                {submitSuccess && (
                  <div className="mt-4 text-emerald-400 text-sm animate-fade-in">
                    Thank you! We'll notify you when Premium is available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 