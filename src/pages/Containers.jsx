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
  // Add more mock containers as needed
];

export default function Containers() {
  const [selectedContainer, setSelectedContainer] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Containers</h1>
        <button className="btn-primary">New Container</button>
      </div>

      <div className="card overflow-hidden">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                        } hover:bg-gray-50 cursor-pointer`}
                        onClick={() => setSelectedContainer(container)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{container.name}</div>
                              <div className="text-sm text-gray-500">{container.image}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              container.status === 'running'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {container.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>CPU: {container.cpu}</div>
                          <div>Memory: {container.memory}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {container.ports}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {container.created}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            {container.status === 'running' ? (
                              <button className="text-red-600 hover:text-red-900">
                                <StopIcon className="h-5 w-5" />
                              </button>
                            ) : (
                              <button className="text-green-600 hover:text-green-900">
                                <PlayIcon className="h-5 w-5" />
                              </button>
                            )}
                            <button className="text-red-600 hover:text-red-900">
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