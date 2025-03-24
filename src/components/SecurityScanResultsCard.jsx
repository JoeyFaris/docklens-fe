import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function SecurityScanResultsCard({ scanData, className = '', onViewDetails }) {
  if (!scanData || !scanData.vulnerabilities) {
    return (
      <div className={`card ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Security Scan</h3>
          <span className="text-sm text-gray-500">No data available</span>
        </div>
        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
          <div className="text-center">
            <ShieldCheckIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No scan results available</p>
          </div>
        </div>
      </div>
    );
  }

  const { critical = 0, high = 0, medium = 0, low = 0 } = scanData.vulnerabilities;
  const totalVulnerabilities = critical + high + medium + low;
  const hasCritical = critical > 0;
  const hasHigh = high > 0;
  
  // Determine the security risk level
  const getRiskLevel = () => {
    if (critical > 0) return { level: 'Critical', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (high > 0) return { level: 'High', color: 'text-red-500', bgColor: 'bg-red-50' };
    if (medium > 0) return { level: 'Medium', color: 'text-orange-500', bgColor: 'bg-orange-50' };
    if (low > 0) return { level: 'Low', color: 'text-yellow-500', bgColor: 'bg-yellow-50' };
    return { level: 'None', color: 'text-green-500', bgColor: 'bg-green-50' };
  };

  const { level, color, bgColor } = getRiskLevel();

  return (
    <div className={`card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Security Scan</h3>
        {scanData.completedAt && (
          <span className="text-sm text-gray-500">
            {new Date(scanData.completedAt).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className={`p-4 rounded-lg ${bgColor} mb-4`}>
        <div className="flex items-center">
          {hasCritical || hasHigh ? (
            <ExclamationTriangleIcon className={`h-5 w-5 ${color} mr-2`} />
          ) : (
            <ShieldCheckIcon className={`h-5 w-5 ${color} mr-2`} />
          )}
          <div>
            <div className={`font-semibold ${color}`}>
              {level} Risk
            </div>
            <div className="text-sm text-gray-600">
              {totalVulnerabilities} {totalVulnerabilities === 1 ? 'vulnerability' : 'vulnerabilities'} found
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <VulnerabilityBar 
          label="Critical" 
          count={critical} 
          total={totalVulnerabilities} 
          color="bg-red-600"
        />
        <VulnerabilityBar 
          label="High" 
          count={high} 
          total={totalVulnerabilities} 
          color="bg-red-500"
        />
        <VulnerabilityBar 
          label="Medium" 
          count={medium} 
          total={totalVulnerabilities} 
          color="bg-orange-500"
        />
        <VulnerabilityBar 
          label="Low" 
          count={low} 
          total={totalVulnerabilities} 
          color="bg-yellow-500"
        />
      </div>

      {onViewDetails && (
        <div className="mt-4">
          <button
            onClick={onViewDetails}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            View full details
          </button>
        </div>
      )}
    </div>
  );
}

function VulnerabilityBar({ label, count, total, color }) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  
  return (
    <div className="flex items-center">
      <div className="w-24 flex-shrink-0">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">{label}</span>
          <span className="text-xs font-medium">{count}</span>
        </div>
      </div>
      <div className="flex-1 ml-2">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`${color} h-1.5 rounded-full`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
} 