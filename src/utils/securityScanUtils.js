/**
 * Formats security scan data into a standardized structure for UI display
 * @param {Object} scanData - Raw scan data from the API
 * @returns {Object} Formatted scan data for UI display
 */
export function formatSecurityScanData(scanData) {
  if (!scanData) return null;
  
  const { vulnerabilities = {}, imageId, status, startTime, completedAt, progress, warnings } = scanData;
  
  // Format vulnerabilities for dashboard display
  const formattedVulnerabilities = Object.entries(vulnerabilities || {}).map(([severity, count]) => {
    const colorMap = {
      critical: '#ef4444', // red-500
      high: '#f97316',     // orange-500
      medium: '#eab308',   // yellow-500
      low: '#22c55e',      // green-500
    };
    
    return {
      severity: severity.charAt(0).toUpperCase() + severity.slice(1),
      count,
      color: colorMap[severity] || '#6b7280', // gray-500 as default
    };
  }).sort((a, b) => {
    // Sort by severity (critical -> high -> medium -> low)
    const severityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
  
  // Calculate total vulnerabilities
  const totalVulnerabilities = Object.values(vulnerabilities || {}).reduce((sum, count) => sum + count, 0);
  
  // Calculate scan duration if completed
  let duration = null;
  if (completedAt && startTime) {
    const durationMs = new Date(completedAt) - new Date(startTime);
    duration = Math.round(durationMs / 1000); // in seconds
  }
  
  // Format timestamps
  const formattedStartTime = startTime ? new Date(startTime).toLocaleString() : null;
  const formattedCompletedAt = completedAt ? new Date(completedAt).toLocaleString() : null;
  
  // Calculate risk level
  const riskLevel = calculateRiskLevel(vulnerabilities);
  
  return {
    imageId,
    status,
    startTime: formattedStartTime,
    completedAt: formattedCompletedAt,
    progress,
    warnings,
    vulnerabilities: formattedVulnerabilities,
    totalVulnerabilities,
    duration,
    riskLevel,
    rawData: scanData,
  };
}

/**
 * Calculates the risk level based on vulnerabilities
 * @param {Object} vulnerabilities - Vulnerability counts by severity
 * @returns {Object} Risk level information
 */
export function calculateRiskLevel(vulnerabilities) {
  if (!vulnerabilities) {
    return { level: 'Unknown', color: 'gray', score: 0 };
  }
  
  const { critical = 0, high = 0, medium = 0, low = 0 } = vulnerabilities;
  
  if (critical > 0) {
    return { level: 'Critical', color: 'red', score: 4 };
  } else if (high > 0) {
    return { level: 'High', color: 'orange', score: 3 };
  } else if (medium > 0) {
    return { level: 'Medium', color: 'yellow', score: 2 };
  } else if (low > 0) {
    return { level: 'Low', color: 'green', score: 1 };
  } else {
    return { level: 'None', color: 'green', score: 0 };
  }
}

/**
 * Formats a relative time string (e.g., "5 minutes ago")
 * @param {string|Date} timestamp - The timestamp to format
 * @returns {string} Formatted relative time
 */
export function formatRelativeTime(timestamp) {
  if (!timestamp) return 'Never';
  
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSeconds < 60) {
    return 'Just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
} 