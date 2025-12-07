import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const RunWarningsSection = ({ normalData }) => {
  const runWarnings = normalData.lighthouseResult?.runWarnings;

  if (!runWarnings || runWarnings.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme-600 to-brand-theme-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaExclamationTriangle className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Run Warnings
        </h2>
      </div>

      <div className="space-y-3">
        {runWarnings.map((warning, index) => (
          <div
            key={index}
            className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl border-2 border-yellow-200/50 shadow-md"
          >
            <div className="flex items-start space-x-3">
              <FaExclamationTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-brand-gray-700 font-medium">{warning}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RunWarningsSection;

