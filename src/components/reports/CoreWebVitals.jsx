import React from "react";
import { FaChartLine } from "react-icons/fa";
import { getMetricColor } from "@/utils/performanceColors";

const CoreWebVitals = ({ normalData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl flex items-center justify-center shadow-lg">
          <FaChartLine className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Core Web Vitals
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LCP - Largest Contentful Paint */}
        {normalData.lighthouseResult?.audits?.[
          "largest-contentful-paint"
        ] && (
          <div className="p-6 bg-gradient-to-br from-brand-theme/10 via-brand-theme/5 to-white rounded-2xl border-2 border-brand-theme/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-brand-blue-900">LCP</h3>
              <span className="px-3 py-1 text-xs font-semibold bg-brand-theme/20 text-brand-theme rounded-lg border border-brand-theme/30">
                Largest Contentful Paint
              </span>
            </div>
            {(() => {
              const lcp =
                normalData.lighthouseResult.audits[
                  "largest-contentful-paint"
                ];
              const value = lcp.numericValue / 1000; // Convert to seconds
              const displayValue =
                lcp.displayValue || `${value.toFixed(2)}s`;
              const score = lcp.score;
              const colors = getMetricColor(value, { good: 2.5, average: 4.0 });

              return (
                <>
                  <div className="mb-4">
                    <div className={`text-5xl font-bold mb-2 ${colors.text}`}>
                      {displayValue}
                    </div>
                    <div className="text-sm font-semibold text-brand-gray-500">
                      Score: {Math.round(score * 100)} / 100
                    </div>
                  </div>
                  <div className="space-y-2 bg-white/50 p-3 rounded-lg border border-brand-gray-400/20">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-gray-500 font-medium">
                        Good
                      </span>
                      <span className="text-brand-blue-900 font-bold">
                        ≤ 2.5s
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-gray-500 font-medium">
                        Needs Improvement
                      </span>
                      <span className="text-brand-blue-900 font-bold">
                        2.5s - 4.0s
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-gray-500 font-medium">
                        Poor
                      </span>
                      <span className="text-brand-blue-900 font-bold">
                        &gt; 4.0s
                      </span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* TBT - Total Blocking Time (replaces FID) */}
        {normalData.lighthouseResult?.audits?.["total-blocking-time"] && (
          <div className="p-6 bg-gradient-to-br from-brand-theme-600/10 via-brand-theme-600/5 to-white rounded-2xl border-2 border-brand-theme-600/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-brand-blue-900">TBT</h3>
              <span className="px-3 py-1 text-xs font-semibold bg-brand-theme-600/20 text-brand-theme-600 rounded-lg border border-brand-theme-600/30">
                Total Blocking Time
              </span>
            </div>
            {(() => {
              const tbt =
                normalData.lighthouseResult.audits["total-blocking-time"];
              const value = tbt.numericValue; // Already in milliseconds
              const displayValue =
                tbt.displayValue || `${Math.round(value)}ms`;
              const score = tbt.score;
              const colors = getMetricColor(value, { good: 200, average: 600 });

              return (
                <>
                  <div className="mb-4">
                    <div className={`text-5xl font-bold mb-2 ${colors.text}`}>
                      {displayValue}
                    </div>
                    <div className="text-sm font-semibold text-brand-gray-500">
                      Score: {Math.round(score * 100)} / 100
                    </div>
                  </div>
                  <div className="space-y-2 bg-white/50 p-3 rounded-lg border border-brand-gray-400/20">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-gray-500 font-medium">
                        Good
                      </span>
                      <span className="text-brand-blue-900 font-bold">
                        ≤ 200ms
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-gray-500 font-medium">
                        Needs Improvement
                      </span>
                      <span className="text-brand-blue-900 font-bold">
                        200ms - 600ms
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-gray-500 font-medium">
                        Poor
                      </span>
                      <span className="text-brand-blue-900 font-bold">
                        &gt; 600ms
                      </span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* CLS - Cumulative Layout Shift */}
        {normalData.lighthouseResult?.audits?.[
          "cumulative-layout-shift"
        ] && (
          <div className="p-6 bg-gradient-to-br from-brand-blue-700/10 via-brand-blue-700/5 to-white rounded-2xl border-2 border-brand-blue-700/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-brand-blue-900">CLS</h3>
              <span className="px-3 py-1 text-xs font-semibold bg-brand-blue-700/20 text-brand-blue-700 rounded-lg border border-brand-blue-700/30">
                Cumulative Layout Shift
              </span>
            </div>
            {(() => {
              const cls =
                normalData.lighthouseResult.audits[
                  "cumulative-layout-shift"
                ];
              const value = cls.numericValue;
              const displayValue = cls.displayValue || value.toFixed(3);
              const score = cls.score;
              const colors = getMetricColor(value, { good: 0.1, average: 0.25 });

              return (
                <>
                  <div className="mb-4">
                    <div className={`text-5xl font-bold mb-2 ${colors.text}`}>
                      {displayValue}
                    </div>
                    <div className="text-sm font-semibold text-brand-gray-500">
                      Score: {Math.round(score * 100)} / 100
                    </div>
                  </div>
                  <div className="space-y-2 bg-white/50 p-3 rounded-lg border border-brand-gray-400/20">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-gray-500 font-medium">
                        Good
                      </span>
                      <span className="text-brand-blue-900 font-bold">
                        ≤ 0.1
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-gray-500 font-medium">
                        Needs Improvement
                      </span>
                      <span className="text-brand-blue-900 font-bold">
                        0.1 - 0.25
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-gray-500 font-medium">
                        Poor
                      </span>
                      <span className="text-brand-blue-900 font-bold">
                        &gt; 0.25
                      </span>
                    </div>
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

export default CoreWebVitals;

