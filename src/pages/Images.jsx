import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { TrashIcon, ArrowPathIcon, MagnifyingGlassIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
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
  {
    id: 'sha256:ghi789',
    name: 'postgres',
    tag: '14-alpine',
    size: '78MB',
    created: '2 days ago',
    containers: 0,
    layers: 6,
    optimizationScore: 85,
    vulnerabilities: 1,
  },
  {
    id: 'sha256:jkl012',
    name: 'redis',
    tag: '6.2',
    size: '105MB',
    created: '5 days ago',
    containers: 3,
    layers: 7,
    optimizationScore: 70,
    vulnerabilities: 2,
  },
  {
    id: 'sha256:mno345',
    name: 'node',
    tag: '16-slim',
    size: '178MB',
    created: '1 day ago',
    containers: 1,
    layers: 9,
    optimizationScore: 80,
    vulnerabilities: 4,
  },
  {
    id: 'sha256:pqr678',
    name: 'python',
    tag: '3.9-slim',
    size: '92MB',
    created: '4 days ago',
    containers: 0,
    layers: 5,
    optimizationScore: 90,
    vulnerabilities: 0,
  },
  {
    id: 'sha256:stu901',
    name: 'mysql',
    tag: '8.0',
    size: '456MB',
    created: '2 weeks ago',
    containers: 1,
    layers: 11,
    optimizationScore: 65,
    vulnerabilities: 6,
  },
  {
    id: 'sha256:vwx234',
    name: 'elasticsearch',
    tag: '7.17.0',
    size: '789MB',
    created: '3 days ago',
    containers: 1,
    layers: 15,
    optimizationScore: 55,
    vulnerabilities: 8,
  }
];

export default function Images() {
  const { images, setImages } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showPullModal, setShowPullModal] = useState(false);
  const [newImageName, setNewImageName] = useState('');
  const [newImageTag, setNewImageTag] = useState('latest');

  // Use mock data if no images are available
  const displayImages = images?.length > 0 ? images : mockImages;

  const filteredImages = displayImages?.filter(image => {
    const searchLower = searchTerm.toLowerCase();
    return (
      image.name.toLowerCase().includes(searchLower) ||
      image.tag.toLowerCase().includes(searchLower) ||
      image.size.toLowerCase().includes(searchLower) ||
      image.created.toLowerCase().includes(searchLower) ||
      image.containers.toString().includes(searchLower) ||
      image.layers.toString().includes(searchLower) ||
      image.optimizationScore.toString().includes(searchLower) ||
      image.vulnerabilities.toString().includes(searchLower) ||
      (image.containers > 0 ? 'in use' : 'available').includes(searchLower)
    );
  });

  const handleDelete = (imageId) => {
    if (images?.length > 0) {
      setImages(images.filter(img => img.id !== imageId));
    }
  };

  const handlePull = () => {
    if (newImageName) {
      const newImage = {
        id: `sha256:${Math.random().toString(36).substr(2, 9)}`,
        name: newImageName,
        tag: newImageTag,
        size: 'Calculating...',
        created: 'Just now',
        containers: 0,
        layers: 0,
        optimizationScore: 0,
        vulnerabilities: 0,
      };
      setImages([newImage, ...(images || [])]);
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
      size: '1.2GB',
      created: 'Just now',
      containers: 0,
      layers: 0,
      optimizationScore: 0,
      vulnerabilities: 0,
    };

    setImages([newImageEntry, ...(images || [])]);
  };

  return (
    <div className="min-w-0 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search images by name, tag, size, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button
          onClick={() => setShowPullModal(true)}
          className="group w-full sm:w-auto px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <ArrowPathIcon className="h-5 w-5" />
          Pull New Image
        </button>
      </div>

      {searchTerm && filteredImages?.length === 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            No images found matching "{searchTerm}". Try searching by:
          </p>
          <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
            <li>Image name (e.g., "nginx", "postgres")</li>
            <li>Tag (e.g., "latest", "alpine")</li>
            <li>Size (e.g., "MB", "GB")</li>
            <li>Status (e.g., "in use", "available")</li>
            <li>Vulnerabilities (e.g., "0", "5")</li>
          </ul>
        </div>
      )}

      <div className="min-w-0 flex-1 bg-white rounded-xl shadow-lg">
        <div className="min-w-0 overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredImages?.length > 0 ? (
              filteredImages?.map((image) => (
                <div 
                  key={image.id} 
                  className="bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md group"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                          {image.name}
                        </h3>
                        <p className="text-sm text-gray-500">{image.tag}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        image.containers > 0 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-gray-50 text-gray-600'
                      }`}>
                        {image.containers > 0 ? 'In Use' : 'Available'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Size</p>
                        <p className="text-sm font-medium text-gray-900">{image.size}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Created</p>
                        <p className="text-sm font-medium text-gray-900">{image.created}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Layers</p>
                        <p className="text-sm font-medium text-gray-900">{image.layers}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Vulnerabilities</p>
                        <p className={`text-sm font-medium ${
                          image.vulnerabilities > 0 
                            ? 'text-red-600' 
                            : 'text-green-600'
                        }`}>
                          {image.vulnerabilities}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-xs text-gray-500">Optimization Score</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{ width: `${image.optimizationScore}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700">{image.optimizationScore}%</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedImage(image)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-600 shadow-md hover:text-gray-900 transition-colors"
                      >
                        Analyze
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg shadow-md hover:bg-red-50"
                        aria-label="Delete image"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                  <DocumentDuplicateIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No images found</h3>
                <p className="text-sm text-gray-500 mb-4">Pull a new image to get started</p>
                <button
                  onClick={() => setShowPullModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  Pull New Image
                </button>
              </div>
            )}
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
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Download Report
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Apply Optimizations
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 