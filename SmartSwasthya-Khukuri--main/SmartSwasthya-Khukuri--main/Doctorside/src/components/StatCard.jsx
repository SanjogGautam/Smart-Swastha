// components/StatCard.js
import React from "react";
import { TrendingUp } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, color = "blue", trend }) => {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-lg border-l-4 border-${color}-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold text-${color}-600 mt-2`}>{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-sm font-medium">
                {trend}
              </span>
            </div>
          )}
        </div>
        <Icon className={`w-12 h-12 text-${color}-500 opacity-80`} />
      </div>
    </div>
  );
};

export default StatCard;
