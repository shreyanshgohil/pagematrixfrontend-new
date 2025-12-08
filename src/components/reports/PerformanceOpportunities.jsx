import React from "react";
import { FaRocket } from "react-icons/fa";
import { getScoreBadgeClasses } from "@/utils/performanceColors";

const PerformanceOpportunities = ({ normalData }) => {
  const audits = normalData.lighthouseResult?.audits;
  if (!audits) return null;

  // Get all opportunity audits (type: "opportunity")
  const opportunities = Object.entries(audits)
    .filter(([id, audit]) => {
      return (
        audit.details?.type === "opportunity" ||
        audit.scoreDisplayMode === "metricSavings"
      );
    })
    .map(([id, audit]) => {
      const details = audit.details;
      const savings = {
        bytes: details?.overallSavingsBytes || 0,
        ms: details?.overallSavingsMs || 0,
        metric: audit.metricSavings || {},
      };
      return { id, ...audit, savings };
    })
    .filter((opp) => opp.savings.bytes > 0 || opp.savings.ms > 0 || Object.keys(opp.savings.metric).length > 0)
    .sort((a, b) => {
      // Sort by potential savings (bytes + ms)
      const aTotal = a.savings.bytes + a.savings.ms;
      const bTotal = b.savings.bytes + b.savings.ms;
      return bTotal - aTotal;
    });

  if (opportunities.length === 0) {
    return null;
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme-600 to-brand-theme-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaRocket className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Performance Opportunities
        </h2>
      </div>

      <p className="text-sm text-brand-gray-500 font-medium mb-6">
        These optimizations can improve your page's performance metrics.
      </p>

      <div className="space-y-4">
        {opportunities.map((opportunity, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-br from-white to-brand-theme/5 rounded-xl border-2 border-brand-theme/20 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-brand-blue-900 flex-1">
                {opportunity.title}
              </h3>
              {opportunity.score !== null && opportunity.score !== undefined && (
                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border ml-3 ${getScoreBadgeClasses(
                    opportunity.score
                  )}`}
                >
                  {Math.round(opportunity.score * 100)}
                </span>
              )}
            </div>
            <p
              className="text-sm text-brand-gray-500 font-medium mb-4"
              dangerouslySetInnerHTML={{
                __html: opportunity.description?.replace(
                  /\[([^\]]+)\]\(([^\)]+)\)/g,
                  '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-brand-theme hover:text-brand-theme-600 underline">$1</a>'
                ) || "",
              }}
            />
            {opportunity.displayValue && (
              <div className="text-sm font-bold text-brand-blue-900 mb-3">
                {opportunity.displayValue}
              </div>
            )}
            <div className="flex flex-wrap gap-4 mt-4 p-4 bg-brand-theme/10 rounded-lg border border-brand-theme/20">
              {opportunity.savings.bytes > 0 && (
                <div>
                  <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                    Potential Savings
                  </span>
                  <span className="text-lg font-bold text-brand-theme">
                    {formatBytes(opportunity.savings.bytes)}
                  </span>
                </div>
              )}
              {opportunity.savings.ms > 0 && (
                <div>
                  <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                    Time Savings
                  </span>
                  <span className="text-lg font-bold text-brand-theme">
                    {opportunity.savings.ms}ms
                  </span>
                </div>
              )}
              {Object.keys(opportunity.savings.metric).length > 0 && (
                <div>
                  <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                    Metric Savings
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(opportunity.savings.metric).map(([metric, value]) => (
                      <span
                        key={metric}
                        className="text-sm font-bold text-brand-blue-900 bg-white/50 px-2 py-1 rounded border border-brand-gray-400/20"
                      >
                        {metric}: {value}ms
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceOpportunities;

