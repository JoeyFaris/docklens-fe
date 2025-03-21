// Base API configuration
const API_BASE_URL = 'http://localhost:3000/api';

export class BaseApiClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error in GET ${endpoint}:`, error);
      throw error;
    }
  }

  async post(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error in POST ${endpoint}:`, error);
      throw error;
    }
  }

  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error in DELETE ${endpoint}:`, error);
      throw error;
    }
  }

  // Special method for streaming responses
  async getStream(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      console.error(`Error in stream request ${endpoint}:`, error);
      throw error;
    }
  }
}

export default new BaseApiClient(); 