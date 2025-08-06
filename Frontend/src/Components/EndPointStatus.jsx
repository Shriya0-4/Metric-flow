import React from "react";

const EndpointStats = ({ endpointStats, className = "" }) => {
  return (
    <div
      className={`
      border-2 border-purple-200 bg-purple-50/80 
      rounded-xl p-6 
      hover:shadow-lg hover:shadow-purple-100 
      transition-all duration-300 hover:-translate-y-1
      backdrop-blur-sm
      ${className}
    `}
    >
      <h3 className="text-sm font-medium mb-4 text-purple-700 opacity-80 uppercase tracking-wide">
        API Endpoints
      </h3>

      <div className="space-y-3">
        {Object.entries(endpointStats).length === 0 ? (
          <div className="text-gray-500 text-sm italic">
            No endpoint data available
          </div>
        ) : (
          Object.entries(endpointStats).map(([endpoint, stats]) => (
            <div
              key={endpoint}
              className="flex justify-between items-center py-2 border-b border-purple-100 last:border-b-0"
            >
              <span className="text-sm text-gray-700 font-medium truncate mr-2">
                {endpoint}
              </span>
              <span className="text-sm text-purple-600 font-semibold bg-purple-100 px-2 py-1 rounded-full">
                {stats.count} hits
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EndpointStats;
