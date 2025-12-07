import React from "react";
import { FaStopwatch } from "react-icons/fa";

const TimingSection = ({ normalData }) => {
  const timing = normalData.lighthouseResult?.timing;

  if (!timing || !timing.total) {
    return null;
  }

  const formatTime = (ms) => {
    if (ms < 1000) {
      return `${ms.toFixed(0)}ms`;
    }
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl flex items-center justify-center shadow-lg">
          <FaStopwatch className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Lighthouse Analysis Timing
        </h2>
      </div>

      <div className="p-6 bg-gradient-to-br from-brand-theme/5 to-brand-blue-700/5 rounded-xl border-2 border-brand-theme/20">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
              Total Analysis Time
            </span>
            <span className="text-3xl font-bold text-brand-blue-900">
              {formatTime(timing.total)}
            </span>
          </div>
          <div className="w-16 h-16 bg-brand-theme/20 rounded-full flex items-center justify-center">
            <FaStopwatch className="h-8 w-8 text-brand-theme" />
          </div>
        </div>
        <p className="text-sm text-brand-gray-500 font-medium mt-4">
          Time taken by Lighthouse to complete the performance analysis of this page.
        </p>
      </div>
    </div>
  );
};

export default TimingSection;

