import baseApi from './baseApi';

class ContainerService {
  async getContainers() {
    return await baseApi.get('containers');
  }

  async getContainerDetails(containerId) {
    return await baseApi.get(`containers/${encodeURIComponent(containerId)}`);
  }

  async startContainer(containerId) {
    return await baseApi.post(`containers/${encodeURIComponent(containerId)}/start`);
  }

  async stopContainer(containerId) {
    return await baseApi.post(`containers/${encodeURIComponent(containerId)}/stop`);
  }

  async removeContainer(containerId) {
    return await baseApi.delete(`containers/${encodeURIComponent(containerId)}`);
  }

  async getContainerStats(containerId) {
    return await baseApi.get(`containers/${encodeURIComponent(containerId)}/stats`);
  }

  async restartContainer(containerId) {
    return await baseApi.post(`containers/${encodeURIComponent(containerId)}/restart`);
  }

  async getContainerLogs(containerId) {
    return await baseApi.get(`containers/${encodeURIComponent(containerId)}/logs`);
  }
}

export default new ContainerService(); 