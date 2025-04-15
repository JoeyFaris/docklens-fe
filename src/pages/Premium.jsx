import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WrenchScrewdriverIcon, BuildingLibraryIcon, ShieldCheckIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import emailjs from '@emailjs/browser';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export default function Premium() {
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
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Premium Features
          </h1>
          <p className="mt-2 text-base text-gray-600">Advanced container security and optimization tools</p>
        </div>
      </div>

      {/* Maintenance Banner */}
      <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <WrenchScrewdriverIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-900">Under Maintenance</h3>
            <div className="mt-1 text-sm text-gray-600">
              <p>
                Our premium features are currently under development. We're working hard to bring you advanced container security and optimization tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-green-200 transition-all duration-300">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
            <ShieldCheckIcon className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Advanced Security Scanning</h3>
          <p className="text-gray-600 mb-3 leading-relaxed text-sm">Deep vulnerability scanning with remediation recommendations and compliance reporting.</p>
          <div className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
            Coming Soon
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-green-200 transition-all duration-300">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
            <RocketLaunchIcon className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Performance Optimization</h3>
          <p className="text-gray-600 mb-3 leading-relaxed text-sm">AI-powered recommendations to optimize your containers for speed and resource usage.</p>
          <div className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
            Coming Soon
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-green-200 transition-all duration-300">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
            <BuildingLibraryIcon className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Registry Integration</h3>
          <p className="text-gray-600 mb-3 leading-relaxed text-sm">Seamless integration with container registries for automated scanning and monitoring.</p>
          <div className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
            Coming Soon
          </div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Choose Your Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-green-200 transition-all duration-300">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Free</h4>
            <div className="text-2xl font-bold text-gray-900 mb-4">
              $0<span className="text-sm font-normal text-gray-500">/month</span>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 text-sm">Basic container diagnostics</span>
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 text-sm">Environment overview</span>
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 text-sm">Basic resource monitoring</span>
              </li>
            </ul>
            <Link to="/dashboard" className="block w-full text-center py-2 px-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm">
              Current Plan
            </Link>
          </div>

          <div className="bg-white border border-green-200 rounded-lg p-4 relative hover:border-green-300 transition-all duration-300">
            <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-xs font-medium">
              Popular
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Pro</h4>
            <div className="text-2xl font-bold text-gray-900 mb-4">
              $19<span className="text-sm font-normal text-gray-500">/month</span>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 text-sm">All Free features</span>
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 text-sm">Advanced security scanning</span>
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 text-sm">Performance optimizations</span>
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 text-sm">Email alerts</span>
              </li>
            </ul>
            <button disabled className="block w-full text-center py-2 px-4 bg-green-50 text-green-700 rounded-lg cursor-not-allowed font-medium text-sm">
              Coming Soon
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-green-200 transition-all duration-300">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Enterprise</h4>
            <div className="text-2xl font-bold text-gray-900 mb-4">
              $49<span className="text-sm font-normal text-gray-500">/month</span>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 text-sm">All Pro features</span>
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 text-sm">Custom integrations</span>
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 text-sm">Priority support</span>
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 text-sm">SLA guarantee</span>
              </li>
            </ul>
            <button disabled className="block w-full text-center py-2 px-4 bg-green-50 text-green-700 rounded-lg cursor-not-allowed font-medium text-sm">
              Coming Soon
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Get notified when we launch premium features</h3>
            <p className="text-gray-600 text-sm">Be the first to know when our premium features are available.</p>
          </div>
          <div className="w-full md:w-auto">
            <form onSubmit={handleNotificationSignup} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full md:w-64 px-3 py-2 rounded-l-lg text-gray-900 outline-none border ${
                  submitError ? 'border-red-500' : 'border-gray-300'
                } text-sm`}
                required
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-lg transition-colors font-medium text-sm text-white ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Notify Me'}
              </button>
            </form>
            {submitSuccess && (
              <div className="mt-2 text-sm text-green-600">
                You're on the list! We'll be in touch soon.
              </div>
            )}
            {submitError && (
              <div className="mt-2 text-sm text-red-600">
                {submitError}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pb-2"></div>
    </div>
  );
} 