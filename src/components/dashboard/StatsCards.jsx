import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

export default function StatsCards({ stats }) {
  const getChangeTypeStyles = (changeType) => {
    switch(changeType) {
      case 'increase':
        return 'bg-green-50 text-green-600';
      case 'decrease':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div 
          key={stat.title} 
          className="bg-white rounded-xl shadow-green-lg p-5 hover:shadow-glow transition-all duration-300 border-2 border-green-500"
        >
          <h3 className="text-sm font-semibold text-gray-700 truncate">{stat.title}</h3>
          
          <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
          
          <div className="flex items-center mt-3">
            <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs ${getChangeTypeStyles(stat.changeType)}`}>
              {stat.changeType === 'increase' ? (
                <ArrowUpIcon className="w-3 h-3" />
              ) : stat.changeType === 'decrease' ? (
                <ArrowDownIcon className="w-3 h-3" />
              ) : null}
              <span className="font-medium">{stat.change}</span>
            </div>
            <span className="text-xs text-gray-500 ml-2">
              {stat.changeType === 'increase' 
                ? 'from previous' 
                : stat.changeType === 'decrease' 
                  ? 'from previous' 
                  : 'no change'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}