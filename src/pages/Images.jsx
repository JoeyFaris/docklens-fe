import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { TrashIcon, ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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
  const { images, setImages } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showPullModal, setShowPullModal] = useState(false);
  const [newImageName, setNewImageName] = useState('');
  const [newImageTag, setNewImageTag] = useState('latest');

  const filteredImages = images?.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (imageId) => {
    setImages(images?.filter(img => img.id !== imageId));
  };

  const handlePull = () => {
    if (newImageName) {
      const newImage = {
        id: Date.now(),
        name: newImageName,
        tag: newImageTag,
        size: '1.2GB',
        created: new Date().toISOString(),
        status: 'Downloading...'
      };
      setImages([...images, newImage]);
      setShowPullModal(false);
      setNewImageName('');
      setNewImageTag('latest');
    }
  };

  const handlePullComplete = (newImage) => {
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
    <div className="min-w-0 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-96">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-green-700"
          />
        </div>
        <button
          onClick={() => setShowPullModal(true)}
          className="group w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 shadow-green-lg hover:shadow-glow flex items-center justify-center gap-2 border-2 border-green-500"
        >
          <ArrowPathIcon className="h-5 w-5" />
          Pull New Image
        </button>
      </div>

      <div className="min-w-0 flex-1 bg-white rounded-lg shadow-green-lg border-2 border-green-500">
        <div className="min-w-0 overflow-x-auto">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-green-50">
                <th className="w-1/4 px-4 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Name</th>
                <th className="w-1/6 px-4 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Tag</th>
                <th className="w-1/6 px-4 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Size</th>
                <th className="w-1/5 px-4 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Created</th>
                <th className="w-1/6 px-4 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Status</th>
                <th className="w-20 px-4 mx-4 py-3 text-right text-xs font-medium text-green-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-100">
              {filteredImages?.length > 0 ? (
                filteredImages?.map((image) => (
                  <tr key={image.id} className="hover:bg-green-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">{image.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{image.tag}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{image.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {new Date(image.created).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        {image.status || 'Ready'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="text-green-600 hover:text-green-800 transition-colors"
                        aria-label="Delete image"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-sm text-green-500">
                    No images found. Pull a new image to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pull Image Modal */}
      {showPullModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-green-700 mb-4">Pull New Image</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">Image Name</label>
                <input
                  type="text"
                  value={newImageName}
                  onChange={(e) => setNewImageName(e.target.value)}
                  className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-green-700"
                  placeholder="e.g., nginx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">Tag</label>
                <input
                  type="text"
                  value={newImageTag}
                  onChange={(e) => setNewImageTag(e.target.value)}
                  className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-green-700"
                  placeholder="e.g., latest"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowPullModal(false)}
                className="px-4 py-2 text-green-700 hover:text-green-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePull}
                className="group px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 shadow-green-lg hover:shadow-glow border-2 border-green-500"
              >
                Pull
              </button>
            </div>
          </div>
        </div>
      )}

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