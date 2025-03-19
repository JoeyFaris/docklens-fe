import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.title} className="card hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <div className={`flex items-center space-x-1 ${
              stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.changeType === 'increase' ? (
                <ArrowUpIcon className="w-4 h-4" />
              ) : (
                <ArrowDownIcon className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{stat.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 