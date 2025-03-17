export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <button className="btn-primary">Save Changes</button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Docker Configuration</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="docker-host" className="block text-sm font-medium text-gray-700">
                Docker Host
              </label>
              <input
                type="text"
                name="docker-host"
                id="docker-host"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                defaultValue="unix:///var/run/docker.sock"
              />
            </div>
            <div>
              <label htmlFor="api-version" className="block text-sm font-medium text-gray-700">
                API Version
              </label>
              <input
                type="text"
                name="api-version"
                id="api-version"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                defaultValue="v1.41"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Interface Settings</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="refresh-interval" className="block text-sm font-medium text-gray-700">
                Auto-refresh Interval (seconds)
              </label>
              <input
                type="number"
                name="refresh-interval"
                id="refresh-interval"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                defaultValue="30"
              />
            </div>
            <div className="flex items-center">
              <input
                id="dark-mode"
                name="dark-mode"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="dark-mode" className="ml-2 block text-sm text-gray-900">
                Enable Dark Mode
              </label>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="container-notifications"
                name="container-notifications"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="container-notifications" className="ml-2 block text-sm text-gray-900">
                Container Status Changes
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="resource-notifications"
                name="resource-notifications"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="resource-notifications" className="ml-2 block text-sm text-gray-900">
                Resource Usage Alerts
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 