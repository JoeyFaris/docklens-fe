import { useState } from 'react';
import { PlayIcon, StopIcon, TrashIcon } from '@heroicons/react/24/outline';

const mockContainers = [
  {
    id: 'abc123',
    name: 'nginx-proxy',
    image: 'nginx:latest',
    status: 'running',
    cpu: '0.5%',
    memory: '128MB',
    ports: '80:80',
    created: '2 days ago',
  },
  {
    id: 'def456',
    name: 'mongodb',
    image: 'mongo:latest',
    status: 'stopped',
    cpu: '0%',
    memory: '0MB',
    ports: '27017:27017',
    created: '5 days ago',
  },
];

export default function Containers() {
  const [selectedContainer, setSelectedContainer] = useState(null);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Containers</h1>
        <button className="btn-primary flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>New Container</span>
        </button>
      </div>

      <div className="card overflow-hidden shadow-soft">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-soft rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Container
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resource Usage
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ports
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockContainers.map((container) => (
                      <tr
                        key={container.id}
                        className={`${
                          selectedContainer?.id === container.id ? 'bg-primary-50' : ''
                        } hover:bg-gray-50 cursor-pointer transition-colors duration-150`}
                        onClick={() => setSelectedContainer(container)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <CubeIcon className="h-6 w-6 text-gray-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{container.name}</div>
                              <div className="text-sm text-gray-500">{container.image}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              container.status === 'running'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <span className={`h-2 w-2 mr-2 rounded-full ${
                              container.status === 'running' ? 'bg-green-400' : 'bg-gray-400'
                            }`}></span>
                            {container.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 w-12">CPU:</span>
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                  style={{ width: container.cpu.replace('%', '') + '%' }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs text-gray-500">{container.cpu}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 w-12">RAM:</span>
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                                  style={{ width: '50%' }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs text-gray-500">{container.memory}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">{container.ports}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {container.created}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-3 justify-end">
                            {container.status === 'running' ? (
                              <button className="text-red-600 hover:text-red-900 transition-colors duration-150">
                                <StopIcon className="h-5 w-5" />
                              </button>
                            ) : (
                              <button className="text-green-600 hover:text-green-900 transition-colors duration-150">
                                <PlayIcon className="h-5 w-5" />
                              </button>
                            )}
                            <button className="text-red-600 hover:text-red-900 transition-colors duration-150">
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 