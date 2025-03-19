export default function OptimizationOpportunities() {
  return (
    <div className="card">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Optimization Opportunities</h2>
      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Large Base Image</h3>
                <p className="text-sm text-yellow-700">Consider using a smaller base image like alpine</p>
              </div>
            </div>
            <button className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-lg hover:bg-yellow-300 transition-colors text-sm font-medium">
              Optimize Image
            </button>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-800">Unused Files</h3>
                <p className="text-sm text-blue-700">30MB of files haven't been accessed in 30 days</p>
              </div>
            </div>
            <button className="px-3 py-1 bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300 transition-colors text-sm font-medium">
              Clean Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 