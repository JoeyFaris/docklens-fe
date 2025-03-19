import { useState } from 'react';
import { TrashIcon, MagnifyingGlassIcon, ArrowPathIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import PullImageModal from '../components/PullImageModal';
import SecurityScanButton from '../components/SecurityScanButton';

const mockImages = [
  {
    id: 'sha256:abc123',
    name: 'nginx',
    tag: 'latest',
    size: '142MB',
    created: '3 days ago',
    containers: 2,
    layers: 8,
    optimizationScore: 75,
    vulnerabilities: 3,
  },
  {
    id: 'sha256:def456',
    name: 'mongo',
    tag: 'latest',
    size: '498MB',
    created: '1 week ago',
    containers: 1,
    layers: 12,
    optimizationScore: 60,
    vulnerabilities: 5,
  },
  // Add more mock images as needed
];

export default function Images() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showPullModal, setShowPullModal] = useState(false);
  const [images, setImages] = useState(mockImages);

  const handlePullComplete = (newImage) => {
    // In a real implementation, we would fetch the updated image list
    // For now, we'll just add a mock entry
    const newImageEntry = {
      id: `sha256:${Math.random().toString(36).substr(2, 9)}`,
      name: newImage.split(':')[0],
      tag: newImage.split(':')[1] || 'latest',
      size: 'Calculating...',
      created: 'Just now',
      containers: 0,
      layers: 0,
      optimizationScore: 0,
      vulnerabilities: 0,
    };

    setImages([newImageEntry, ...images]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Docker Images</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and optimize your Docker images</p>
        </div>
        <div className="flex space-x-4">
          <button 
            className="btn-secondary flex items-center space-x-2"
            onClick={() => setShowPullModal(true)}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span>Pull Image</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <ArrowPathIcon className="h-5 w-5" />
            <span>Build Image</span>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Repository
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tag
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size / Layers
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Optimization Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Security
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
                    {images.map((image) => (
                      <tr
                        key={image.id}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedImage?.id === image.id ? 'bg-primary-50' : ''
                        }`}
                        onClick={() => setSelectedImage(image)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <img src={`https://www.gravatar.com/avatar/${image.id}?s=40&d=identicon`} alt="" className="h-8 w-8" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{image.name}</div>
                              <div className="text-sm text-gray-500">{image.tag}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full">
                            {image.tag}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{image.size}</div>
                          <div className="text-sm text-gray-500">{image.layers} layers</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  image.optimizationScore >= 80
                                    ? 'bg-green-500'
                                    : image.optimizationScore >= 60
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${image.optimizationScore}%` }}
                              />
                            </div>
                            <span className="ml-2 text-sm text-gray-500">{image.optimizationScore}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {image.vulnerabilities > 0 ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                {image.vulnerabilities} issues
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Secure
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {image.created}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <SecurityScanButton 
                              imageId={`${image.name}:${image.tag}`} 
                              buttonText="Quick Scan"
                              useModal={true}
                            />
                            <SecurityScanButton 
                              imageId={`${image.name}:${image.tag}`} 
                              buttonText="Full Scan"
                              variant="secondary"
                              useModal={false}
                            />
                            <button
                              onClick={() => {
                                setSelectedImage(image);
                                setShowAnalysis(true);
                              }}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                            >
                              <ChartBarIcon className="h-4 w-4 mr-1" />
                              Analyze
                            </button>
                            <button
                              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center"
                            >
                              <TrashIcon className="h-4 w-4 mr-1" />
                              Remove
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

      <PullImageModal
        isOpen={showPullModal}
        onClose={() => setShowPullModal(false)}
        onPullComplete={handlePullComplete}
      />

      {selectedImage && showAnalysis && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Image Analysis: {selectedImage.name}:{selectedImage.tag}
                </h2>
                <button
                  onClick={() => setShowAnalysis(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Layer Analysis</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Base Image</span>
                        <span className="text-sm font-medium">85MB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Dependencies</span>
                        <span className="text-sm font-medium">45MB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Application Code</span>
                        <span className="text-sm font-medium">12MB</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="text-sm font-medium text-yellow-900 mb-2">Optimization Suggestions</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-yellow-800">Use multi-stage builds to reduce final image size</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-yellow-800">Remove unnecessary development dependencies</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h3 className="text-sm font-medium text-red-900 mb-2">Security Vulnerabilities</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <span className="text-sm font-medium text-red-800">CVE-2023-1234</span>
                          <p className="text-sm text-red-700">Critical vulnerability in base image</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="text-sm font-medium text-green-900 mb-2">Best Practices</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-green-800">Using .dockerignore file</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-green-800">Non-root user configured</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button className="btn-secondary">Download Report</button>
                <button className="btn-primary">Apply Optimizations</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 