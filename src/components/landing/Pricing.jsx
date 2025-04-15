import { CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import emailjs from '@emailjs/browser';
import { useState } from 'react';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export default function Pricing({ onConnectClick }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleNotificationSignup = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubmitError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');

    try {
      console.log('Sending email with:', {
        serviceId,
        templateId,
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      });

      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          to_name: 'Joey',
          to_email: 'joeyfaris12@gmail.com',
          from_name: 'DockLens User',
          from_email: email,
          message: `New early access signup for DockLens Pro from: ${email}`
        }
      );

      console.log('Email sent successfully:', response);
      setSubmitSuccess(true);
      setEmail('');
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Detailed email error:', {
        error,
        message: error.message,
        status: error.status,
        text: error.text
      });
      setSubmitError('Failed to send email. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-gray-900 w-screen relative overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative">
        <div className="animate-on-scroll opacity-0 text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 mb-4">
            <SparklesIcon className="h-4 w-4 text-green-400 mr-2" />
            <span className="text-green-400 font-medium text-sm">Special Launch Pricing</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Start optimizing your containers</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">Choose the plan that fits your needs and start managing containers better.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Community Plan */}
          <div className="animate-on-scroll opacity-0 bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-green-500 transition-all duration-300 hover:bg-gray-800/70 group">
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xl font-bold mb-1 text-white">Community</h4>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-white">$0</p>
                    <span className="ml-2 text-sm text-gray-400">/forever</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">
                  Available Now
                </span>
              </div>
              <ul className="space-y-3 flex-grow">
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">Real-time container analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">Basic security scanning</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">Community support</span>
                </li>
              </ul>
              <button
                onClick={onConnectClick}
                className="w-full py-2 mt-6 text-center bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-all duration-300 text-white border border-green-400/50 hover:border-green-400"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="animate-on-scroll opacity-0 bg-gradient-to-b from-gray-800/50 to-green-900/30 backdrop-blur-sm border border-green-500/30 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-800/70 group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xl font-bold mb-1 text-white">Pro</h4>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-white">$19</p>
                    <span className="ml-2 text-sm text-gray-400">/month</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">
                  Coming Soon
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">Advanced security suite</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">AI-powered optimization</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">Custom reporting</span>
                </li>
              </ul>
              <form onSubmit={handleNotificationSignup} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email for early access & 20% off"
                  className={`w-full px-3 py-2 bg-gray-900/50 border ${
                    submitError ? 'border-red-500/50' : 'border-green-500/30'
                  } rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent`}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
                    isSubmitting ? 'bg-gray-800 text-gray-500' : 'bg-green-500 hover:bg-green-600 text-white border border-green-400/50 hover:border-green-400'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Early Access'}
                </button>
              </form>
              {submitSuccess && (
                <div className="mt-3 text-center text-sm text-green-400">
                  You're on the list! We'll be in touch soon.
                </div>
              )}
              {submitError && (
                <div className="mt-3 text-center text-sm text-red-400">
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