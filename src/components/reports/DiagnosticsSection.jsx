import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const DiagnosticsSection = ({ normalData }) => {
  if (!normalData.lighthouseResult?.audits?.diagnostics) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaInfoCircle className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">Diagnostics</h2>
      </div>
      <p className="text-sm text-brand-gray-500 mb-6 font-medium">
        {normalData.lighthouseResult.audits.diagnostics.description}
      </p>

      {normalData.lighthouseResult.audits.diagnostics.details?.items?.[0] && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(
            normalData.lighthouseResult.audits.diagnostics.details.items[0]
          ).map(([key, value]) => (
            <div
              key={key}
              className="p-5 bg-gradient-to-br from-white to-brand-theme/5 rounded-xl border-2 border-brand-theme/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <h4 className="text-xs font-bold text-brand-gray-500 mb-2 uppercase tracking-wide">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </h4>
              <p className="text-lg font-bold text-brand-blue-900">
                {typeof value === "number"
                  ? value.toLocaleString()
                  : String(value)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiagnosticsSection;

