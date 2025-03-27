import { CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function Pricing({ onConnectClick, email, setEmail, isSubmitting, submitSuccess, submitError, handleNotificationSignup }) {
  return (
    <div className="py-16 bg-white w-screen relative overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative">
        <div className="animate-on-scroll opacity-0 text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 mb-4">
            <SparklesIcon className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-green-700 font-medium text-sm">Special Launch Pricing</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Start optimizing your containers</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">Choose the plan that fits your needs and start managing containers better.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Community Plan */}
          <div className="animate-on-scroll opacity-0 bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-green-500 transition-all duration-300 shadow-prominent hover:shadow-prominent-hover group">
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xl font-bold mb-1 text-gray-900">Community</h4>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-gray-900">$0</p>
                    <span className="ml-2 text-sm text-gray-500">/forever</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full font-medium">
                  Available Now
                </span>
              </div>
              <ul className="space-y-3 flex-grow">
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Real-time container analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Basic security scanning</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Community support</span>
                </li>
              </ul>
              <button
                onClick={onConnectClick}
                className="w-full py-2 mt-6 text-center bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-all duration-300 text-white shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="animate-on-scroll opacity-0 bg-gradient-to-b from-white to-green-50 border border-green-200 rounded-xl overflow-hidden transition-all duration-300 shadow-prominent hover:shadow-prominent-hover group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xl font-bold mb-1 text-gray-900">Pro</h4>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-gray-900">$19</p>
                    <span className="ml-2 text-sm text-gray-500">/month</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  Coming Soon
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Advanced security suite</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">AI-powered optimization</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Custom reporting</span>
                </li>
              </ul>
              <form onSubmit={handleNotificationSignup} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email for early access & 20% off"
                  className={`w-full px-3 py-2 bg-white border ${
                    submitError ? 'border-red-300' : 'border-green-200'
                  } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
                    isSubmitting ? 'bg-gray-100 text-gray-400' : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Early Access'}
                </button>
              </form>
              {submitSuccess && (
                <div className="mt-3 text-center text-sm text-green-600">
                  You're on the list! We'll be in touch soon.
                </div>
              )}
              {submitError && (
                <div className="mt-3 text-center text-sm text-red-600">
                  {submitError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}