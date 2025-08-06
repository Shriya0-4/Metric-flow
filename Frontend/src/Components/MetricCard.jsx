import React from "react";

const MetricCard = ({
  title,
  value,
  percentage,
  color = "blue",
  subtitle,
  className = "",
}) => {
  const colorClasses = {
    blue: "border-blue-200 bg-blue-50/80 text-blue-700",
    green: "border-green-200 bg-green-50/80 text-green-700",
    yellow: "border-yellow-200 bg-yellow-50/80 text-yellow-700",
    purple: "border-purple-200 bg-purple-50/80 text-purple-700",
    red: "border-red-200 bg-red-50/80 text-red-700",
  };

  const progressColors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
  };

  return (
    <div
      className={`
      ${colorClasses[color]} 
      border-2 rounded-xl p-6 
      hover:shadow-lg hover:shadow-${color}-100 
      transition-all duration-300 hover:-translate-y-1
      backdrop-blur-sm
      ${className}
    `}
    >
      <h3 className="text-sm font-medium mb-3 opacity-80 uppercase tracking-wide">
        {title}
      </h3>

      <div className="text-3xl font-light mb-2 text-gray-800">{value}</div>

      {subtitle && <div className="text-sm text-gray-600 mb-3">{subtitle}</div>}

      {percentage !== undefined && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Usage</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${progressColors[color]} h-2 rounded-full transition-all duration-700 ease-out`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
