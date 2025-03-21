/**
 * Creates a user-friendly error message from API errors
 * @param {Error|string} error - Error object or message
 * @param {string} fallbackMessage - Fallback message if none can be determined
 * @returns {string} User-friendly error message
 */
export function getErrorMessage(error, fallbackMessage = 'An unexpected error occurred') {
  if (!error) return fallbackMessage;
  
  const errorMessage = error.message || error.toString();
  
  // Docker-specific error mappings
  if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
    return 'Unable to connect to Docker daemon. Please check your network connection.';
  }
  
  if (errorMessage.includes('Not Found')) {
    return 'Docker API endpoint not found. Please ensure Docker is running.';
  }
  
  if (errorMessage.includes('Permission denied')) {
    return 'Permission denied. Please check Docker permissions.';
  }
  
  if (errorMessage.includes('container not found')) {
    return 'Container not found. It may have been removed.';
  }
  
  if (errorMessage.includes('image not found')) {
    return 'Image not found. It may have been removed or may not exist in the repository.';
  }

  if (errorMessage.includes('Invalid container data')) {
    return 'Invalid container data received. Please try again.';
  }
  
  // If we have a specific error message, use it
  if (errorMessage && errorMessage !== '[object Object]') {
    return errorMessage;
  }
  
  return fallbackMessage;
}

/**
 * Logs errors to console with additional context
 * @param {string} context - Context where the error occurred
 * @param {Error|string} error - Error object or message
 */
export function logError(context, error) {
  console.error(`Error in ${context}:`, error);
  
  // In a production app, we might want to send this to a logging service
  // logErrorToService(context, error);
}

/**
 * Creates an error with a specific code and message
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @returns {Error} Error object with code
 */
export function createError(message, code) {
  const error = new Error(message);
  error.code = code;
  return error;
} 