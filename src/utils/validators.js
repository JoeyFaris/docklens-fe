/**
 * Validates a Docker image name
 * @param {string} imageName - Docker image name to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidImageName(imageName) {
  if (!imageName || typeof imageName !== 'string') return false;
  
  // Basic validation for Docker image name format
  // Format: [registry/]user/repo[:tag][@digest]
  const basicPattern = /^(([a-z0-9]+(([._]|__|[-]*)[a-z0-9]+)*)\/)?([a-z0-9]+(([._]|__|[-]*)[a-z0-9]+)*)\/([a-z0-9]+(([._]|__|[-]*)[a-z0-9]+)*)(:([a-z0-9]+(([._]|__|[-]*)[a-z0-9]+)*))?(@sha256:[a-f0-9]{64})?$/;
  
  // Simplified version for easier validation
  const simplePattern = /^[a-z0-9]+(\/[a-z0-9]+)*:[a-z0-9.]+$/i;
  
  // Official image pattern (e.g. nginx:latest)
  const officialPattern = /^[a-z0-9]+:[a-z0-9.]+$/i;
  
  return basicPattern.test(imageName) || simplePattern.test(imageName) || officialPattern.test(imageName);
}

/**
 * Validates a Docker container ID
 * @param {string} containerId - Docker container ID to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidContainerId(containerId) {
  if (!containerId || typeof containerId !== 'string') return false;
  
  // Full container IDs are 64 hex characters
  // Short IDs are at least 12 hex characters
  return /^[a-f0-9]{12,64}$/i.test(containerId);
}

/**
 * Validates API response
 * @param {Object} response - API response to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidApiResponse(response) {
  return (
    response && 
    typeof response === 'object' && 
    response.hasOwnProperty('success') &&
    response.hasOwnProperty('data')
  );
}

/**
 * Checks if a value is defined and not empty
 * @param {any} value - Value to check
 * @returns {boolean} True if defined and not empty, false otherwise
 */
export function isDefined(value) {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (Array.isArray(value) && value.length === 0) return false;
  if (typeof value === 'object' && Object.keys(value).length === 0) return false;
  
  return true;
} 