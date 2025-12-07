import React from "react";
import { FaServer } from "react-icons/fa";

const ResourceSummary = ({ normalData }) => {
  const resourceSummary = normalData.lighthouseResult?.audits?.["resource-summary"];

  if (!resourceSummary?.details?.items) {
    return null;
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  const items = resourceSummary.details.items;
  const totalItem = items.find((item) => item.resourceType === "total");
  const otherItems = items.filter((item) => item.resourceType !== "total");

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaServer className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Resource Summary
        </h2>
      </div>

      <p className="text-sm text-brand-gray-500 font-medium mb-6">
        {resourceSummary.description}
      </p>

      {totalItem && (
        <div className="mb-6 p-6 bg-gradient-to-br from-brand-theme/10 to-brand-blue-700/10 rounded-xl border-2 border-brand-theme/20">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                Total Requests
              </span>
              <span className="text-2xl font-bold text-brand-blue-900">
                {totalItem.requestCount}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                Total Size
              </span>
              <span className="text-2xl font-bold text-brand-theme">
                {formatBytes(totalItem.transferSize)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                Average Size
              </span>
              <span className="text-2xl font-bold text-brand-blue-900">
                {formatBytes(
                  totalItem.transferSize / totalItem.requestCount
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherItems.map((item, index) => {
          const percentage = totalItem
            ? ((item.transferSize / totalItem.transferSize) * 100).toFixed(2)
            : 0;

          return (
            <div
              key={index}
              className="p-5 bg-gradient-to-br from-white to-brand-theme/5 rounded-xl border-2 border-brand-theme/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <h4 className="text-sm font-bold text-brand-blue-900 mb-3">
                {item.label || item.resourceType}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-brand-gray-500">
                    Size
                  </span>
                  <span className="text-sm font-bold text-brand-blue-900">
                    {formatBytes(item.transferSize)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-brand-gray-500">
                    Requests
                  </span>
                  <span className="text-sm font-bold text-brand-blue-900">
                    {item.requestCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-brand-gray-500">
                    Percentage
                  </span>
                  <span className="text-sm font-bold text-brand-theme">
                    {percentage}%
                  </span>
                </div>
                <div className="w-full bg-brand-gray-400/30 rounded-full h-2 overflow-hidden shadow-inner mt-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-brand-theme to-brand-theme-600 shadow-lg transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceSummary;

