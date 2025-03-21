/**
 * Format bytes to human-readable format
 * @param {number} bytes - Bytes to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted string
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format container name by removing leading slash
 * @param {string} name - Container name
 * @returns {string} Formatted name
 */
export function formatContainerName(name) {
  if (!name) return 'Unnamed Container';
  return name.replace(/^\//, '');
}

/**
 * Format date to locale string with options
 * @param {Date|number} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export function formatDate(date, options = {}) {
  if (!date) return 'Unknown';
  
  const defaultOptions = {
    dateStyle: 'medium',
    timeStyle: 'short'
  };
  
  const dateObj = typeof date === 'number' ? new Date(date * 1000) : new Date(date);
  
  return new Intl.DateTimeFormat(
    navigator.language, 
    { ...defaultOptions, ...options }
  ).format(dateObj);
}

/**
 * Format duration in seconds to human-readable format
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration
 */
export function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return 'Unknown';
  
  if (seconds < 60) return `${seconds} seconds`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours < 24) {
    if (remainingMinutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
  }
  
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  if (remainingHours === 0) return `${days} day${days > 1 ? 's' : ''}`;
  return `${days} day${days > 1 ? 's' : ''} ${remainingHours} hour${remainingHours > 1 ? 's' : ''}`;
} 