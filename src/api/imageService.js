import baseApi, { BaseApiClient } from './baseApi';

class ImageService {
  async analyzeImage(imageName) {
    return await baseApi.post('analyze', { image: imageName });
  }

  async getImageLayers(imageName) {
    return await baseApi.get(`layers/${encodeURIComponent(imageName)}`);
  }

  async getOptimizationSuggestions(imageName) {
    return await baseApi.get(`optimize/${encodeURIComponent(imageName)}`);
  }

  async getFileAccessPatterns(imageName) {
    return await baseApi.get(`file-access/${encodeURIComponent(imageName)}`);
  }

  async getLocalImages() {
    return await baseApi.get('images/list');
  }

  async pullImage(imageName) {
    try {
      const response = await fetch(`${baseApi.baseUrl}/images/pull`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageName }),
      });

      if (!response.ok) {
        throw new Error(`Failed to pull image: ${response.statusText}`);
      }

      // Create a ReadableStream from the response body
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Return an async generator that yields progress events
      return {
        [Symbol.asyncIterator]: async function* () {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              
              // Split the decoded chunk by newlines to get individual JSON events
              const events = decoder.decode(value).split('\n')
                .filter(line => line.trim())
                .map(line => JSON.parse(line));
              
              for (const event of events) {
                yield event;
              }
            }
          } finally {
            reader.releaseLock();
          }
        }
      };
    } catch (error) {
      console.error('Error pulling image:', error);
      throw error;
    }
  }
}

export default new ImageService(); 