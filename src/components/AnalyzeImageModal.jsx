import { useState, useEffect } from 'react';
import { dockerApi } from '../api/dockerApi';

export default function AnalyzeImageModal({ isOpen, onClose, onAnalysisComplete }) {
  const [selectedImage, setSelectedImage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [localImages, setLocalImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [permissionStep, setPermissionStep] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (isOpen && hasPermission) {
      fetchLocalImages();
    }
  }, [isOpen, hasPermission]);

  const handlePermissionGrant = () => {
    setHasPermission(true);
    setPermissionStep(false);
  };

  const fetchLocalImages = async () => {
    setIsLoadingImages(true);
    try {
      const images = await dockerApi.getLocalImages();
      setLocalImages(images);
    } catch (error) {
      console.error('Failed to fetch local images:', error);
      setError('Failed to load local images');
    } finally {
      setIsLoadingImages(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Please select an image to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const [
        analysisResult,
        layers,
        securityScan,
        optimizations,
        filePatterns
      ] = await Promise.all([
        dockerApi.analyzeImage(selectedImage),
        dockerApi.getImageLayers(selectedImage),
        dockerApi.getSecurityScan(selectedImage),
        dockerApi.getOptimizationSuggestions(selectedImage),
        dockerApi.getFileAccessPatterns(selectedImage),
      ]);

      const completeAnalysis = {
        ...analysisResult,
        layers,
        securityScan,
        optimizations,
        filePatterns,
      };

      onAnalysisComplete(completeAnalysis);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  if (permissionStep) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-xl max-w-md w-full border-2 border-blue-200">
          <div className="p-8">
            <header className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Permission Required</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-blue-800">Docker Access</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>This application needs permission to:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Access your local Docker daemon</li>
                        <li>List running Docker containers</li>
                        <li>Analyze container configurations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-500">
                Your data remains local and secure. No information is sent to external servers.
              </div>

              <footer className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-xl transition-colors shadow-lg shadow-blue-200"
                  onClick={handlePermissionGrant}
                >
                  Allow Access
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-blue-100/80 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full border-2 border-blue-200">
        <div className="p-8">
          <header className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-blue-700">Analyze Image</h2>
            <button
              onClick={onClose}
              disabled={isAnalyzing}
              className="text-blue-400 hover:text-blue-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className="space-y-6">
            <div>
              <label className="text-blue-600 font-medium block mb-2">
                Select Image to Analyze
              </label>
              {isLoadingImages ? (
                <div className="flex items-center justify-center py-4">
                  <svg className="animate-spin h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
              ) : localImages.length > 0 ? (
                <select
                  className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                  value={selectedImage}
                  onChange={(e) => setSelectedImage(e.target.value)}
                >
                  <option value="">Select an image</option>
                  {localImages.map((image) => (
                    <option key={image.id} value={`${image.name}:${image.tag}`}>
                      {image.name}:{image.tag}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-center py-4 text-gray-500 bg-blue-50 rounded-xl">
                  No local images found
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <footer className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                className="px-6 py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border-2 border-blue-200"
                onClick={onClose}
                disabled={isAnalyzing}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-blue-200"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !selectedImage}
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Start Analysis</span>
                )}
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
} 