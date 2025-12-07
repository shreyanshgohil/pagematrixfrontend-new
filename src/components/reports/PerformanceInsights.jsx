import React from "react";
import { FaLightbulb } from "react-icons/fa";

const PerformanceInsights = ({ normalData }) => {
  const audits = normalData.lighthouseResult?.audits;
  if (!audits) return null;

  // Get all insights (audits with group "insights" or id ending with "-insight")
  const insights = Object.entries(audits)
    .filter(([id, audit]) => {
      // Check if it's an insight audit
      const isInsight = id.endsWith("-insight") || 
                       audit.id?.endsWith("-insight") ||
                       (audit.details && audit.details.type);
      return isInsight && audit.title && audit.description;
    })
    .map(([id, audit]) => ({ id, ...audit }));

  if (insights.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl flex items-center justify-center shadow-lg">
          <FaLightbulb className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Performance Insights
        </h2>
      </div>

      <div className="space-y-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-br from-white to-brand-theme/5 rounded-xl border-2 border-brand-theme/20 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-brand-blue-900">
                {insight.title}
              </h3>
              {insight.score !== null && insight.score !== undefined && (
                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                    insight.score >= 0.9
                      ? "bg-brand-theme/20 text-brand-theme border-brand-theme/30"
                      : insight.score >= 0.5
                      ? "bg-brand-theme-600/20 text-brand-theme-600 border-brand-theme-600/30"
                      : "bg-brand-theme-800/20 text-brand-theme-800 border-brand-theme-800/30"
                  }`}
                >
                  {Math.round(insight.score * 100)}
                </span>
              )}
            </div>
            <p
              className="text-sm text-brand-gray-500 font-medium mb-4"
              dangerouslySetInnerHTML={{
                __html: insight.description?.replace(
                  /\[([^\]]+)\]\(([^\)]+)\)/g,
                  '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-brand-theme hover:text-brand-theme-600 underline">$1</a>'
                ) || "",
              }}
            />
            {insight.metricSavings && (
              <div className="mt-3 p-3 bg-brand-theme/10 rounded-lg border border-brand-theme/20">
                <div className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide mb-2">
                  Potential Metric Savings
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(insight.metricSavings).map(([metric, savings]) => (
                    <span
                      key={metric}
                      className="text-xs font-bold text-brand-blue-900 bg-white/50 px-2 py-1 rounded border border-brand-gray-400/20"
                    >
                      {metric}: {savings}ms
                    </span>
                  ))}
                </div>
              </div>
            )}
            {insight.displayValue && (
              <div className="mt-3 text-sm font-bold text-brand-blue-900">
                {insight.displayValue}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceInsights;

