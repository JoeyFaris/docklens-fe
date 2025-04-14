import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

export default function StatsCards({ stats }) {
  const getChangeTypeStyles = (changeType) => {
    switch(changeType) {
      case 'increase':
        return {
          bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
          text: 'text-blue-600',
          icon: 'text-blue-500',
          border: 'border-blue-200'
        };
      case 'decrease':
        return {
          bg: 'bg-gradient-to-br from-red-50 to-red-100',
          text: 'text-red-600',
          icon: 'text-red-500',
          border: 'border-red-200'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
          text: 'text-gray-600',
          icon: 'text-gray-500',
          border: 'border-gray-200'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const styles = getChangeTypeStyles(stat.changeType);
        return (
          <div 
            key={stat.title} 
            className="group bg-white rounded-xl shadow-soft p-6 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-sm font-medium text-gray-500 truncate">{stat.title}</h3>
            
            <p className="text-4xl font-bold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors duration-300">{stat.value}</p>
            
            <div className="flex items-center mt-4">
              <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full ${styles.bg} ${styles.border} transition-all duration-300`}>
                {stat.changeType === 'increase' ? (
                  <ArrowUpIcon className={`w-4 h-4 ${styles.icon}`} />
                ) : stat.changeType === 'decrease' ? (
                  <ArrowDownIcon className={`w-4 h-4 ${styles.icon}`} />
                ) : null}
                <span className={`text-sm font-medium ${styles.text}`}>{stat.change}</span>
              </div>
              <span className="text-xs text-gray-400 ml-2">
                {stat.changeType === 'increase' 
                  ? 'from previous' 
                  : stat.changeType === 'decrease' 
                    ? 'from previous' 
                    : 'no change'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}