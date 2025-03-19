import React from 'react';
import { Link } from 'react-router-dom';
import { WrenchScrewdriverIcon, BuildingLibraryIcon, ShieldCheckIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function Premium() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Premium Features</h1>
          <p className="mt-1 text-sm text-gray-500">Advanced container security and optimization tools</p>
        </div>
      </div>

      {/* Maintenance Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <WrenchScrewdriverIcon className="h-5 w-5 text-amber-500" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">Under Maintenance</h3>
            <div className="mt-2 text-sm text-amber-700">
              <p>
                Our premium features are currently under development. We're working hard to bring you advanced container security and optimization tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-100 opacity-75">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Security Scanning</h3>
          <p className="text-gray-600 mb-4">Deep vulnerability scanning with remediation recommendations and compliance reporting.</p>
          <div className="text-sm font-medium text-blue-600 rounded-full bg-blue-50 px-3 py-1 inline-block">Coming Soon</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-100 opacity-75">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <RocketLaunchIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Optimization</h3>
          <p className="text-gray-600 mb-4">AI-powered recommendations to optimize your containers for speed and resource usage.</p>
          <div className="text-sm font-medium text-blue-600 rounded-full bg-blue-50 px-3 py-1 inline-block">Coming Soon</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-100 opacity-75">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <BuildingLibraryIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Registry Integration</h3>
          <p className="text-gray-600 mb-4">Seamless integration with container registries for automated scanning and monitoring.</p>
          <div className="text-sm font-medium text-blue-600 rounded-full bg-blue-50 px-3 py-1 inline-block">Coming Soon</div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Pricing Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Free</h4>
            <div className="text-3xl font-bold text-gray-900 mb-4">$0<span className="text-sm font-normal text-gray-500">/month</span></div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Basic container diagnostics</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Environment overview</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Basic resource monitoring</span>
              </li>
            </ul>
            <Link to="/dashboard" className="block w-full text-center py-2 px-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
              Current Plan
            </Link>
          </div>

          <div className="border-2 border-blue-400 rounded-lg p-6 relative">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
              Popular
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Pro</h4>
            <div className="text-3xl font-bold text-gray-900 mb-4">$19<span className="text-sm font-normal text-gray-500">/month</span></div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">All Free features</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Advanced security scanning</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Performance optimizations</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Email alerts</span>
              </li>
            </ul>
            <button disabled className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg opacity-50 cursor-not-allowed">
              Coming Soon
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h4>
            <div className="text-3xl font-bold text-gray-900 mb-4">$49<span className="text-sm font-normal text-gray-500">/month</span></div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">All Pro features</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Registry integrations</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Compliance reporting</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Priority support</span>
              </li>
            </ul>
            <button disabled className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg opacity-50 cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>
      </div>

      {/* Sign up for updates */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 shadow-soft">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Get notified when we launch premium features</h3>
            <p className="text-blue-100">Be the first to know when our premium features are available.</p>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-64 px-4 py-2 rounded-l-lg text-gray-800 outline-none"
              />
              <button className="bg-blue-900 hover:bg-blue-950 px-4 py-2 rounded-r-lg transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 