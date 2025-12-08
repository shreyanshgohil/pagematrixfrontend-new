import React from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { getPerformanceColor } from "@/utils/performanceColors";

const PerformanceScoreOverview = ({ normalData }) => {
  const performanceScore =
    normalData.lighthouseResult?.categories?.performance?.score * 100 || 0;
  const colors = getPerformanceColor(performanceScore);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl flex items-center justify-center shadow-lg">
          <FaTachometerAlt className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Performance Score Overview
        </h2>
      </div>

      {normalData.lighthouseResult?.categories?.performance && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Performance Score */}
          <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-br from-brand-theme/5 via-brand-theme/10 to-brand-blue-700/5 rounded-2xl border-2 border-brand-theme/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative w-40 h-40 mb-6">
              <svg
                className="transform -rotate-90 w-40 h-40 drop-shadow-lg"
                viewBox="0 0 120 120"
              >
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(0, 128, 128, 0.1)"
                  strokeWidth="10"
                />
                {/* Score circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke={
                    performanceScore >= 90
                      ? "#0cce6b"
                      : performanceScore >= 50
                      ? "#ffa400"
                      : "#ff4e42"
                  }
                  strokeWidth="10"
                  strokeDasharray={`${
                    (performanceScore / 100) * 339.29
                  } 339.29`}
                  strokeLinecap="round"
                  className="drop-shadow-md"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-5xl font-bold ${colors.text}`}>
                  {Math.round(performanceScore)}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-brand-blue-900 mb-2">
              Performance
            </h3>
            <p className="text-sm text-brand-gray-500 text-center font-medium">
              {performanceScore >= 90
                ? "Excellent performance"
                : performanceScore >= 70
                ? "Good performance"
                : "Needs improvement"}
            </p>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white to-brand-gray-300/30 p-6 rounded-2xl border border-brand-gray-400/30 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-brand-blue-900">
                  Performance Score
                </span>
                <span className={`text-lg font-bold ${colors.text}`}>
                  {Math.round(performanceScore)} / 100
                </span>
              </div>
              <div className="w-full bg-brand-gray-400/30 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className={`h-4 rounded-full bg-gradient-to-r ${colors.gradient} shadow-lg transition-all duration-500`}
                  style={{ width: `${performanceScore}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-6 border-t-2 border-brand-gray-400/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 p-4 rounded-xl border border-brand-gray-400/20">
                  <span className="text-xs font-semibold text-brand-gray-500 uppercase tracking-wide block mb-1">
                    Lighthouse Version
                  </span>
                  <span className="text-sm font-bold text-brand-blue-900">
                    {normalData.lighthouseResult?.lighthouseVersion || "N/A"}
                  </span>
                </div>
                <div className="bg-white/50 p-4 rounded-xl border border-brand-gray-400/20">
                  <span className="text-xs font-semibold text-brand-gray-500 uppercase tracking-wide block mb-1">
                    Form Factor
                  </span>
                  <span className="text-sm font-bold text-brand-blue-900 capitalize">
                    {normalData.lighthouseResult?.configSettings?.formFactor ||
                      "N/A"}
                  </span>
                </div>
                <div className="bg-white/50 p-4 rounded-xl border border-brand-gray-400/20">
                  <span className="text-xs font-semibold text-brand-gray-500 uppercase tracking-wide block mb-1">
                    Benchmark Index
                  </span>
                  <span className="text-sm font-bold text-brand-blue-900">
                    {normalData.lighthouseResult?.environment?.benchmarkIndex ||
                      "N/A"}
                  </span>
                </div>
                <div className="bg-white/50 p-4 rounded-xl border border-brand-gray-400/20">
                  <span className="text-xs font-semibold text-brand-gray-500 uppercase tracking-wide block mb-1">
                    Channel
                  </span>
                  <span className="text-sm font-bold text-brand-blue-900 uppercase">
                    {normalData.lighthouseResult?.configSettings?.channel ||
                      "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceScoreOverview;

