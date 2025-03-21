const API_BASE_URL = 'http://localhost:3000/api';

export const dockerApi = {
  async analyzeImage(imageName) {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageName }),
      });
      
      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw error;
    }
  },

  async getImageLayers(imageName) {
    try {
      const response = await fetch(`${API_BASE_URL}/layers/${encodeURIComponent(imageName)}`);
      if (!response.ok) {
        throw new Error(`Failed to get layers: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting image layers:', error);
      throw error;
    }
  },

  async getSecurityScan(imageName) {
    try {
      const response = await fetch(`${API_BASE_URL}/security/${encodeURIComponent(imageName)}`);
      if (!response.ok) {
        throw new Error(`Security scan failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error scanning image:', error);
      throw error;
    }
  },

  async getOptimizationSuggestions(imageName) {
    try {
      const response = await fetch(`${API_BASE_URL}/optimize/${encodeURIComponent(imageName)}`);
      if (!response.ok) {
        throw new Error(`Failed to get optimization suggestions: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting optimization suggestions:', error);
      throw error;
    }
  },

  async getFileAccessPatterns(imageName) {
    try {
      const response = await fetch(`${API_BASE_URL}/file-access/${encodeURIComponent(imageName)}`);
      if (!response.ok) {
        throw new Error(`Failed to get file access patterns: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting file access patterns:', error);
      throw error;
    }
  },

  async pullImage(imageName) {
    try {
      const response = await fetch(`${API_BASE_URL}/images/pull`, {
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
  },

  async getLocalImages() {
    try {
      const response = await fetch(`${API_BASE_URL}/images/list`);
      if (!response.ok) {
        throw new Error(`Failed to get local images: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting local images:', error);
      throw error;
    }
  },

  async getContainers() {
    try {
      const response = await fetch(`${API_BASE_URL}/containers`);
      if (!response.ok) {
        throw new Error(`Failed to get containers: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting containers:', error);
      throw error;
    }
  },

  async getContainerDetails(containerId) {
    try {
      const response = await fetch(`${API_BASE_URL}/containers/${encodeURIComponent(containerId)}`);
      if (!response.ok) {
        throw new Error(`Failed to get container details: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting container details:', error);
      throw error;
    }
  },

  async startContainer(containerId) {
    try {
      const response = await fetch(`${API_BASE_URL}/containers/${encodeURIComponent(containerId)}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to start container: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error starting container:', error);
      throw error;
    }
  },

  async stopContainer(containerId) {
    try {
      const response = await fetch(`${API_BASE_URL}/containers/${encodeURIComponent(containerId)}/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to stop container: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error stopping container:', error);
      throw error;
    }
  },

  async removeContainer(containerId) {
    try {
      const response = await fetch(`${API_BASE_URL}/containers/${encodeURIComponent(containerId)}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to remove container: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error removing container:', error);
      throw error;
    }
  },

  async getContainerStats(containerId) {
    try {
      const response = await fetch(`${API_BASE_URL}/containers/${encodeURIComponent(containerId)}/stats`);
      if (!response.ok) {
        throw new Error(`Failed to get container stats: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting container stats:', error);
      throw error;
    }
  },

  async restartContainer(containerId) {
    try {
      const response = await fetch(`${API_BASE_URL}/containers/${encodeURIComponent(containerId)}/restart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to restart container: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error restarting container:', error);
      throw error;
    }
  },

  async getContainerLogs(containerId) {
    try {
      const response = await fetch(`${API_BASE_URL}/containers/${encodeURIComponent(containerId)}/logs`);
      if (!response.ok) {
        throw new Error(`Failed to get container logs: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting container logs:', error);
      throw error;
    }
  },

  async startSecurityScan(imageId) {
    try {
      const response = await fetch(`${API_BASE_URL}/analysis/security-scan/${encodeURIComponent(imageId)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 404) {
          throw new Error('Image not found. Please make sure the image exists locally.');
        } else if (response.status === 409) {
          throw new Error('Scan already in progress for this image.');
        } else if (response.status === 500) {
          throw new Error('Server error occurred while starting scan.');
        } else {
          throw new Error(errorData.message || `Failed to start security scan: ${response.statusText}`);
        }
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error starting security scan:', error);
      throw error;
    }
  },

  async checkSecurityScanStatus(scanId) {
    try {
      const response = await fetch(`${API_BASE_URL}/analysis/security-scan/status/${encodeURIComponent(scanId)}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 404) {
          throw new Error('Scan not found. The scan ID may be invalid or the scan has been deleted.');
        } else if (response.status === 500) {
          throw new Error('Server error occurred while checking scan status.');
        } else {
          throw new Error(errorData.message || `Failed to check scan status: ${response.statusText}`);
        }
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error checking security scan status:', error);
      throw error;
    }
  },
}; 