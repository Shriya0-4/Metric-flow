import React from "react";

const ChartCard = ({ title, children, color = "blue", className = "" }) => {
  const colorClasses = {
    blue: "border-blue-200 bg-blue-50/30",
    green: "border-green-200 bg-green-50/30",
    yellow: "border-yellow-200 bg-yellow-50/30",
    purple: "border-purple-200 bg-purple-50/30",
    red: "border-red-200 bg-red-50/30",
    indigo: "border-indigo-200 bg-indigo-50/30",
  };

  const titleColors = {
    blue: "text-blue-700",
    green: "text-green-700",
    yellow: "text-yellow-700",
    purple: "text-purple-700",
    red: "text-red-700",
    indigo: "text-indigo-700",
  };

  return (
    <div
      className={`
      ${colorClasses[color]} 
      border-2 rounded-xl p-6 
      hover:shadow-lg hover:shadow-${color}-100 
      transition-all duration-300
      backdrop-blur-sm
      ${className}
    `}
    >
      <h3 className={`text-lg font-medium mb-4 ${titleColors[color]}`}>
        {title}
      </h3>
      <div className="h-64">{children}</div>
    </div>
  );
};

export default ChartCard;
