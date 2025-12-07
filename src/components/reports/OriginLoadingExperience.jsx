import React from "react";
import { FaClock } from "react-icons/fa";

const OriginLoadingExperience = ({ normalData }) => {
  if (!normalData.originLoadingExperience?.metrics) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme-600 to-brand-theme-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaClock className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Origin Loading Experience
        </h2>
      </div>

      <div>
        <div className="mb-6">
          <span
            className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${
              normalData.originLoadingExperience.overall_category === "FAST"
                ? "bg-brand-theme/20 text-brand-theme border-brand-theme/30"
                : normalData.originLoadingExperience.overall_category ===
                  "AVERAGE"
                ? "bg-brand-theme-600/20 text-brand-theme-600 border-brand-theme-600/30"
                : "bg-brand-theme-800/20 text-brand-theme-800 border-brand-theme-800/30"
            }`}
          >
            Overall: {normalData.originLoadingExperience.overall_category}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(normalData.originLoadingExperience.metrics).map(
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
                    className={`text-xl font-bold ${
                      metric.category === "FAST"
                        ? "text-brand-theme"
                        : metric.category === "AVERAGE"
                        ? "text-brand-theme-600"
                        : "text-brand-theme-800"
                    }`}
                  >
                    {metric.category}
                  </span>
                  {metric.percentile && (
                    <span className="text-sm text-brand-gray-500 ml-2 font-medium">
                      (P{metric.percentile})
                    </span>
                  )}
                </div>
                {metric.distributions && (
                  <div className="space-y-2 bg-white/50 p-3 rounded-lg border border-brand-gray-400/20">
                    {metric.distributions.map((dist, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-brand-gray-500 font-medium">
                          {dist.min !== undefined && dist.max !== undefined
                            ? `${dist.min}-${dist.max}ms`
                            : dist.min !== undefined
                            ? `>${dist.min}ms`
                            : "All"}
                        </span>
                        <span className="text-brand-blue-900 font-bold">
                          {(dist.proportion * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OriginLoadingExperience;

