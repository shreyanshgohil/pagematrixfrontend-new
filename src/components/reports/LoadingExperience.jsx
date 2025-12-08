import React from "react";
import { FaClock } from "react-icons/fa";
import { getCategoryColor } from "@/utils/performanceColors";

const LoadingExperience = ({ normalData }) => {
  if (!normalData.loadingExperience?.metrics) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl flex items-center justify-center shadow-lg">
            <FaClock className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-brand-blue-900">
            Loading Experience (Field Data)
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-brand-gray-500 font-medium">
            Loading experience data not available. This data comes from real
            user metrics (RUM).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl flex items-center justify-center shadow-lg">
          <FaClock className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Loading Experience (Field Data)
        </h2>
      </div>

      <div>
        <div className="mb-6">
          <span
            className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${getCategoryColor(
              normalData.loadingExperience.overall_category
            ).bgLight} ${getCategoryColor(
              normalData.loadingExperience.overall_category
            ).text} ${getCategoryColor(
              normalData.loadingExperience.overall_category
            ).border}`}
          >
            Overall: {normalData.loadingExperience.overall_category}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(normalData.loadingExperience.metrics).map(
            ([key, metric]) => (
              <div
                key={key}
                className="p-6 bg-gradient-to-br from-white to-brand-theme/5 rounded-2xl border-2 border-brand-theme/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <h4 className="text-sm font-bold text-brand-blue-900 mb-3">
                  {key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </h4>
                <div className="mb-3">
                  <span
                    className={`text-xl font-bold ${getCategoryColor(
                      metric.category
                    ).text}`}
                  >
                    {metric.category}
                  </span>
                  <span className="text-sm text-brand-gray-500 ml-2 font-medium">
                    ({metric.percentile}th percentile)
                  </span>
                </div>
                <div className="space-y-2 bg-white/50 p-3 rounded-lg border border-brand-gray-400/20">
                  <div className="flex justify-between">
                    <span className="text-brand-gray-500 font-medium">
                      Fast: {metric.good}
                    </span>
                    <span className="text-brand-blue-900 font-bold">
                      {((metric.distributions?.[0]?.proportion || 0) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray-500 font-medium">
                      Average: {metric.average}
                    </span>
                    <span className="text-brand-blue-900 font-bold">
                      {((metric.distributions?.[1]?.proportion || 0) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray-500 font-medium">
                      Slow: {metric.poor}
                    </span>
                    <span className="text-brand-blue-900 font-bold">
                      {((metric.distributions?.[2]?.proportion || 0) * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingExperience;

