import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const EnvironmentInfo = ({ normalData }) => {
  const lighthouseResult = normalData.lighthouseResult;
  if (!lighthouseResult) return null;

  const environment = lighthouseResult.environment;
  const configSettings = lighthouseResult.configSettings;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaInfoCircle className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Environment & Configuration
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* URLs */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-brand-blue-900 mb-4">URLs</h3>
          <div className="space-y-3">
            {lighthouseResult.requestedUrl && (
              <div className="p-4 bg-white/50 rounded-xl border border-brand-gray-400/20">
                <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                  Requested URL
                </span>
                <span className="text-sm font-bold text-brand-blue-900 break-all">
                  {lighthouseResult.requestedUrl}
                </span>
              </div>
            )}
            {lighthouseResult.finalUrl && (
              <div className="p-4 bg-white/50 rounded-xl border border-brand-gray-400/20">
                <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                  Final URL
                </span>
                <span className="text-sm font-bold text-brand-blue-900 break-all">
                  {lighthouseResult.finalUrl}
                </span>
              </div>
            )}
            {lighthouseResult.mainDocumentUrl && (
              <div className="p-4 bg-white/50 rounded-xl border border-brand-gray-400/20">
                <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                  Main Document URL
                </span>
                <span className="text-sm font-bold text-brand-blue-900 break-all">
                  {lighthouseResult.mainDocumentUrl}
                </span>
              </div>
            )}
            {lighthouseResult.finalDisplayedUrl && (
              <div className="p-4 bg-white/50 rounded-xl border border-brand-gray-400/20">
                <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                  Final Displayed URL
                </span>
                <span className="text-sm font-bold text-brand-blue-900 break-all">
                  {lighthouseResult.finalDisplayedUrl}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Environment & Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-brand-blue-900 mb-4">
            Environment & Settings
          </h3>
          <div className="space-y-3">
            {environment?.networkUserAgent && (
              <div className="p-4 bg-white/50 rounded-xl border border-brand-gray-400/20">
                <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                  Network User Agent
                </span>
                <span className="text-xs font-medium text-brand-blue-900 break-all">
                  {environment.networkUserAgent}
                </span>
              </div>
            )}
            {environment?.hostUserAgent && (
              <div className="p-4 bg-white/50 rounded-xl border border-brand-gray-400/20">
                <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                  Host User Agent
                </span>
                <span className="text-xs font-medium text-brand-blue-900 break-all">
                  {environment.hostUserAgent}
                </span>
              </div>
            )}
            {lighthouseResult.userAgent && (
              <div className="p-4 bg-white/50 rounded-xl border border-brand-gray-400/20">
                <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                  User Agent
                </span>
                <span className="text-xs font-medium text-brand-blue-900 break-all">
                  {lighthouseResult.userAgent}
                </span>
              </div>
            )}
            {configSettings?.locale && (
              <div className="p-4 bg-white/50 rounded-xl border border-brand-gray-400/20">
                <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                  Locale
                </span>
                <span className="text-sm font-bold text-brand-blue-900">
                  {configSettings.locale}
                </span>
              </div>
            )}
            {environment?.benchmarkIndex && (
              <div className="p-4 bg-white/50 rounded-xl border border-brand-gray-400/20">
                <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                  Benchmark Index
                </span>
                <span className="text-sm font-bold text-brand-blue-900">
                  {environment.benchmarkIndex}
                </span>
              </div>
            )}
            {environment?.credits && (
              <div className="p-4 bg-white/50 rounded-xl border border-brand-gray-400/20">
                <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                  Credits
                </span>
                {Object.entries(environment.credits).map(([key, value]) => (
                  <div key={key} className="text-sm font-bold text-brand-blue-900">
                    {key}: {value}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentInfo;

