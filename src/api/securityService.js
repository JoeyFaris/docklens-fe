import baseApi from './baseApi';

class SecurityService {
  async getSecurityScan(imageName) {
    return await baseApi.get(`security/${encodeURIComponent(imageName)}`);
  }

  async startSecurityScan(imageId) {
    return await baseApi.post('security/scan', { imageId });
  }

  async checkSecurityScanStatus(scanId) {
    return await baseApi.get(`security/scan-status/${encodeURIComponent(scanId)}`);
  }
}

export default new SecurityService(); 