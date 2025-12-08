import React from "react";
import { FaChartLine } from "react-icons/fa";
import { getScoreBadgeClasses } from "@/utils/performanceColors";

const PerformanceAudits = ({ normalData }) => {
  if (!normalData.lighthouseResult?.categories?.performance?.auditRefs) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl flex items-center justify-center shadow-lg">
          <FaChartLine className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          All Performance Audits
        </h2>
      </div>

      <div className="space-y-4">
        {normalData.lighthouseResult.categories.performance.auditRefs.map(
          (auditRef, index) => {
            const audit = normalData.lighthouseResult?.audits?.[auditRef.id];
            if (!audit) return null;

            return (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-white to-brand-theme/5 rounded-xl border-2 border-brand-theme/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                      <h4 className="text-sm font-bold text-brand-blue-900">
                        {audit.title}
                      </h4>
                      {auditRef.acronym && (
                        <span className="px-2.5 py-1 text-xs font-bold bg-brand-blue-700/20 text-brand-blue-700 rounded-lg border border-brand-blue-700/30">
                          {auditRef.acronym}
                        </span>
                      )}
                      {audit.score !== null && (
                        <span
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${getScoreBadgeClasses(
                            audit.score
                          )}`}
                        >
                          {Math.round(audit.score * 100)}
                        </span>
                      )}
                      {audit.score === null && (
                        <span className="text-xs text-brand-gray-500 font-medium">
                          {audit.scoreDisplayMode}
                        </span>
                      )}
                    </div>
                    {audit.description && (
                      <p className="text-xs text-brand-gray-500 mb-2 font-medium">
                        {audit.description.replace(
                          /\[([^\]]+)\]\([^\)]+\)/g,
                          "$1"
                        )}
                      </p>
                    )}
                    {audit.displayValue && (
                      <p className="text-sm font-bold text-brand-blue-900">
                        {audit.displayValue}
                      </p>
                    )}
                    {auditRef.weight && (
                      <p className="text-xs text-brand-gray-500 mt-2 font-medium">
                        Weight: {auditRef.weight}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default PerformanceAudits;

