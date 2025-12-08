import React from "react";
import { FaClock } from "react-icons/fa";
import { getMetricColor } from "@/utils/performanceColors";

const AdditionalMetrics = ({ normalData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme-600 to-brand-theme-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaClock className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Additional Performance Metrics
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Contentful Paint */}
        {normalData.lighthouseResult?.audits?.["first-contentful-paint"] && (
          <div className="p-6 bg-gradient-to-br from-white to-brand-theme/5 rounded-2xl border-2 border-brand-theme/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-brand-blue-900">FCP</h3>
              <span className="text-xs font-semibold text-brand-gray-500 bg-brand-theme/10 px-2 py-1 rounded-lg">
                First Contentful Paint
              </span>
            </div>
            {(() => {
              const fcp =
                normalData.lighthouseResult.audits["first-contentful-paint"];
              const value = fcp.numericValue / 1000;
              const displayValue =
                fcp.displayValue || `${value.toFixed(2)}s`;
              const score = fcp.score;
              const colors = getMetricColor(value, { good: 1.8, average: 3.0 });

              return (
                <>
                  <div className={`text-3xl font-bold mb-2 ${colors.text}`}>
                    {displayValue}
                  </div>
                  <div className="text-xs font-semibold text-brand-gray-500">
                    Score: {Math.round(score * 100)} / 100
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Speed Index */}
        {normalData.lighthouseResult?.audits?.["speed-index"] && (
          <div className="p-6 bg-gradient-to-br from-white to-brand-theme-600/5 rounded-2xl border-2 border-brand-theme-600/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-brand-blue-900">
                Speed Index
              </h3>
              <span className="text-xs font-semibold text-brand-gray-500 bg-brand-theme-600/10 px-2 py-1 rounded-lg">
                Visual Load
              </span>
            </div>
            {(() => {
              const si =
                normalData.lighthouseResult.audits["speed-index"];
              const value = si.numericValue / 1000;
              const displayValue =
                si.displayValue || `${value.toFixed(2)}s`;
              const score = si.score;
              const colors = getMetricColor(value, { good: 3.4, average: 5.8 });

              return (
                <>
                  <div className={`text-3xl font-bold mb-2 ${colors.text}`}>
                    {displayValue}
                  </div>
                  <div className="text-xs font-semibold text-brand-gray-500">
                    Score: {Math.round(score * 100)} / 100
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Total Blocking Time */}
        {normalData.lighthouseResult?.audits?.["total-blocking-time"] && (
          <div className="p-6 bg-gradient-to-br from-white to-brand-blue-700/5 rounded-2xl border-2 border-brand-blue-700/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-brand-blue-900">TBT</h3>
              <span className="text-xs font-semibold text-brand-gray-500 bg-brand-blue-700/10 px-2 py-1 rounded-lg">
                Total Blocking Time
              </span>
            </div>
            {(() => {
              const tbt =
                normalData.lighthouseResult.audits["total-blocking-time"];
              const displayValue =
                tbt.displayValue || `${Math.round(tbt.numericValue)}ms`;
              const score = tbt.score;
              const value = tbt.numericValue;
              const colors = getMetricColor(value, { good: 200, average: 600 });

              return (
                <>
                  <div className={`text-3xl font-bold mb-2 ${colors.text}`}>
                    {displayValue}
                  </div>
                  <div className="text-xs font-semibold text-brand-gray-500">
                    Score: {Math.round(score * 100)} / 100
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalMetrics;

