import React from "react";
import { FaChartBar } from "react-icons/fa";

const AllMetrics = ({ normalData }) => {
  const metricsAudit = normalData.lighthouseResult?.audits?.metrics;

  if (!metricsAudit?.details?.items?.[0]) {
    return null;
  }

  const metrics = metricsAudit.details.items[0];

  const formatValue = (key, value) => {
    if (value === null || value === undefined) return "N/A";
    
    // Time values in milliseconds
    if (key.includes("Time") || key.includes("Ts") || key.includes("Paint") || 
        key.includes("Index") || key.includes("Load") || key.includes("Interactive") ||
        key.includes("Blocking") || key.includes("Shift") || key.includes("Change") ||
        key.includes("Navigation") || key.includes("Origin") || key.includes("Trace")) {
      if (value < 1000) {
        return `${value.toFixed(2)}ms`;
      }
      return `${(value / 1000).toFixed(2)}s`;
    }
    
    // Layout shift values
    if (key.includes("LayoutShift") || key.includes("CLS")) {
      return value.toFixed(4);
    }
    
    // Boolean values
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    
    // Numbers
    if (typeof value === "number") {
      return value.toLocaleString();
    }
    
    return String(value);
  };

  const metricGroups = {
    "Core Metrics": [
      "firstContentfulPaint",
      "largestContentfulPaint",
      "totalBlockingTime",
      "cumulativeLayoutShift",
      "speedIndex",
      "interactive",
      "timeToFirstByte",
    ],
    "Observed Metrics": Object.keys(metrics).filter((key) =>
      key.startsWith("observed")
    ),
    "LCP Details": Object.keys(metrics).filter((key) =>
      key.includes("lcp") || key.includes("LCP")
    ),
    "Other Metrics": Object.keys(metrics).filter(
      (key) =>
        !key.startsWith("observed") &&
        !key.includes("lcp") &&
        !key.includes("LCP") &&
        ![
          "firstContentfulPaint",
          "largestContentfulPaint",
          "totalBlockingTime",
          "cumulativeLayoutShift",
          "speedIndex",
          "interactive",
          "timeToFirstByte",
        ].includes(key)
    ),
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl flex items-center justify-center shadow-lg">
          <FaChartBar className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          All Performance Metrics
        </h2>
      </div>

      <p className="text-sm text-brand-gray-500 font-medium mb-6">
        {metricsAudit.description}
      </p>

      <div className="space-y-6">
        {Object.entries(metricGroups).map(([groupName, keys]) => {
          const groupMetrics = keys.filter((key) => metrics[key] !== undefined);
          if (groupMetrics.length === 0) return null;

          return (
            <div key={groupName}>
              <h3 className="text-lg font-bold text-brand-blue-900 mb-4">
                {groupName}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupMetrics.map((key) => (
                  <div
                    key={key}
                    className="p-4 bg-gradient-to-br from-white to-brand-theme/5 rounded-xl border-2 border-brand-theme/20 shadow-md"
                  >
                    <div className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide mb-1">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())
                        .trim()}
                    </div>
                    <div className="text-lg font-bold text-brand-blue-900">
                      {formatValue(key, metrics[key])}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllMetrics;

