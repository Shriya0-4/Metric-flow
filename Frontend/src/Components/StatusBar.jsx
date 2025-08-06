import React from "react";

const StatusBar = ({ connectionStatus, platform, uptime }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 mb-8">
      <div className="flex justify-center items-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              connectionStatus === "connected" ? "bg-green-400" : "bg-red-400"
            }`}
          />
          <span className="text-gray-700">
            Socket: <span className="font-medium">{connectionStatus}</span>
          </span>
        </div>

        <div className="text-gray-700">
          Platform: <span className="font-medium">{platform}</span>
        </div>

        <div className="text-gray-700">
          Uptime: <span className="font-medium">{uptime}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
