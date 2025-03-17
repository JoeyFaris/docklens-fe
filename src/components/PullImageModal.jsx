import { useState, useEffect } from 'react';
import { dockerApi } from '../api/dockerApi';

export default function PullImageModal({ isOpen, onClose, onPullComplete }) {
  const [selectedImage, setSelectedImage] = useState('');
  const [status, setStatus] = useState({
    isPulling: false,
    progress: null,
    error: null
  });
  const [localImages, setLocalImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchLocalImages();
    }
  }, [isOpen]);

  const fetchLocalImages = async () => {
    setIsLoadingImages(true);
    try {
      const images = await dockerApi.getLocalImages();
      setLocalImages(images);
    } catch (error) {
      console.error('Failed to fetch local images:', error);
    } finally {
      setIsLoadingImages(false);
    }
  };

  const handlePull = async () => {
    if (!selectedImage) {
      setStatus(prev => ({ ...prev, error: 'Please select an image' }));
      return;
    }

    setStatus({
      isPulling: true,
      error: null,
      progress: { status: 'Preparing to pull image...', progress: 0 }
    });

    try {
      const eventStream = await dockerApi.pullImage(selectedImage);
      
      for await (const event of eventStream) {
        setStatus(prev => ({
          ...prev,
          progress: {
            status: event.status,
            progress: event.progressDetail?.current / event.progressDetail?.total * 100 || 0,
            layer: event.id
          }
        }));
      }

      onPullComplete(selectedImage);
      onClose();
    } catch (err) {
      setStatus(prev => ({ ...prev, error: err.message }));
    } finally {
      setStatus(prev => ({
        ...prev,
        isPulling: false,
        progress: null
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <header className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Pull Docker Image</h2>
            <button
              onClick={onClose}
              disabled={status.isPulling}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className="space-y-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Image to Pull
              </label>
              {isLoadingImages ? (
                <div className="flex items-center justify-center py-4">
                  <svg className="animate-spin h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
              ) : localImages.length > 0 ? (
                <select
                  className="w-full bg-white text-gray-900 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 py-2 px-3"
                  onChange={(e) => setSelectedImage(e.target.value)}
                  value={selectedImage}
                >
                  <option value="">Select an image to update</option>
                  {localImages.map((image) => (
                    <option key={image.id} value={`${image.name}:${image.tag}`}>
                      {image.name}:{image.tag}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No local images found
                </div>
              )}
            </div>

            {status.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {status.error}
              </div>
            )}

            {status.progress && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{status.progress.status}</span>
                  {status.progress.layer && (
                    <span className="text-gray-500">Layer: {status.progress.layer}</span>
                  )}
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${status.progress.progress}%` }}
                  />
                </div>
              </div>
            )}

            <footer className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                onClick={onClose}
                disabled={status.isPulling}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                onClick={handlePull}
                disabled={status.isPulling || !selectedImage}
              >
                {status.isPulling ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Pulling...</span>
                  </>
                ) : (
                  <span>Pull Image</span>
                )}
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}