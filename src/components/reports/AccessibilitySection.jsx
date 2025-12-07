import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const AccessibilitySection = ({ accessibilityData }) => {
  if (!accessibilityData?.lighthouseResult?.categories?.accessibility) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-theme-600 to-brand-theme-800 rounded-xl flex items-center justify-center shadow-lg">
            <FaInfoCircle className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-brand-blue-900">
            Accessibility
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-brand-gray-500 font-medium">
            Accessibility data not available in this report. Enable accessibility
            category in Lighthouse to see this data.
          </p>
        </div>
      </div>
    );
  }

  const accessibilityScore =
    accessibilityData.lighthouseResult.categories.accessibility.score * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme-600 to-brand-theme-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaInfoCircle className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Accessibility
        </h2>
      </div>

      <div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-brand-blue-900">
              Accessibility Score
            </h3>
            <div className="flex items-center space-x-4">
              <div className="relative w-24 h-24">
                <svg
                  className="transform -rotate-90 w-24 h-24"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="rgba(0, 128, 128, 0.1)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke={
                      accessibilityScore >= 90
                        ? "#008080"
                        : accessibilityScore >= 70
                        ? "#007373"
                        : "#004d4d"
                    }
                    strokeWidth="8"
                    strokeDasharray={`${(accessibilityScore / 100) * 339.29} 339.29`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`text-2xl font-bold ${
                      accessibilityScore >= 90
                        ? "text-brand-theme"
                        : accessibilityScore >= 70
                        ? "text-brand-theme-600"
                        : "text-brand-theme-800"
                    }`}
                  >
                    {Math.round(accessibilityScore)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-brand-gray-500 font-medium">
            {accessibilityData.lighthouseResult.categories.accessibility.title}
          </p>
        </div>

        {/* Accessibility Audits */}
        {accessibilityData.lighthouseResult.categories.accessibility
          .auditRefs && (
          <div>
            <h4 className="text-md font-bold text-brand-blue-900 mb-4">
              Accessibility Audits
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accessibilityData.lighthouseResult.categories.accessibility.auditRefs
                .slice(0, 10)
                .map((auditRef, index) => {
                  const audit =
                    accessibilityData.lighthouseResult?.audits?.[auditRef.id];
                  if (!audit) return null;

                  return (
                    <div
                      key={index}
                      className="p-5 bg-gradient-to-br from-white to-brand-theme/5 rounded-xl border-2 border-brand-theme/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-sm font-bold text-brand-blue-900">
                          {audit.title}
                        </h5>
                        {audit.score !== null && (
                          <span
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                              audit.score >= 0.9
                                ? "bg-brand-theme/20 text-brand-theme border-brand-theme/30"
                                : audit.score >= 0.5
                                ? "bg-brand-theme-600/20 text-brand-theme-600 border-brand-theme-600/30"
                                : "bg-brand-theme-800/20 text-brand-theme-800 border-brand-theme-800/30"
                            }`}
                          >
                            {Math.round(audit.score * 100)}
                          </span>
                        )}
                      </div>
                      {audit.description && (
                        <p className="text-xs text-brand-gray-500 line-clamp-2 font-medium">
                          {audit.description.replace(
                            /\[([^\]]+)\]\([^\)]+\)/g,
                            "$1"
                          )}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessibilitySection;

