import React from "react";
import { FaGlobe } from "react-icons/fa";

const ScreenshotsSection = ({ normalData }) => {
  const hasFinalScreenshot =
    normalData.lighthouseResult?.audits?.["final-screenshot"]?.details?.data;
  const hasThumbnails =
    normalData.lighthouseResult?.audits?.["screenshot-thumbnails"]?.details
      ?.items;
  const hasFullPageScreenshot =
    normalData.lighthouseResult?.fullPageScreenshot?.screenshot?.data;

  const hasAnyScreenshots =
    hasFinalScreenshot || hasThumbnails || hasFullPageScreenshot;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaGlobe className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">Screenshots</h2>
      </div>

      {hasAnyScreenshots ? (
        <div className="space-y-6">
          {/* Final Screenshot */}
          {hasFinalScreenshot && (
            <div>
              <h3 className="text-lg font-bold text-brand-blue-900 mb-3">
                Final Screenshot
              </h3>
              <p className="text-sm text-brand-gray-500 mb-4 font-medium">
                {
                  normalData.lighthouseResult.audits["final-screenshot"]
                    .description
                }
              </p>
              <div className="border-2 border-brand-gray-400/30 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-gray-300/30 to-white shadow-lg">
                <img
                  src={
                    normalData.lighthouseResult.audits["final-screenshot"]
                      .details.data
                  }
                  alt="Final Screenshot"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

          {/* Screenshot Thumbnails (Filmstrip) */}
          {hasThumbnails && (
            <div>
              <h3 className="text-lg font-bold text-brand-blue-900 mb-3">
                Page Load Filmstrip
              </h3>
              <p className="text-sm text-brand-gray-500 mb-4 font-medium">
                {
                  normalData.lighthouseResult.audits["screenshot-thumbnails"]
                    .description
                }
              </p>
              <div className="border-2 border-brand-gray-400/30 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-gray-300/30 to-white p-6 shadow-lg">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {normalData.lighthouseResult.audits[
                    "screenshot-thumbnails"
                  ].details.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-2 group"
                    >
                      <div className="border-2 border-brand-gray-400/30 rounded-xl overflow-hidden bg-white shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                        <img
                          src={item.data}
                          alt={`Screenshot at ${item.timing}ms`}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="text-xs text-brand-gray-500 text-center bg-white/80 px-2 py-1 rounded-lg border border-brand-gray-400/20">
                        <div className="font-bold text-brand-blue-900">
                          {item.timing
                            ? `${(item.timing / 1000).toFixed(2)}s`
                            : "N/A"}
                        </div>
                        {item.timestamp && (
                          <div className="text-brand-gray-500 text-[10px]">
                            {new Date(item.timestamp / 1000).toLocaleTimeString()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Full Page Screenshot */}
          {hasFullPageScreenshot && (
            <div>
              <h3 className="text-lg font-bold text-brand-blue-900 mb-3">
                Full Page Screenshot
              </h3>
              <p className="text-sm text-brand-gray-500 mb-4 font-medium">
                Complete screenshot of the entire page
              </p>
              <div className="border-2 border-brand-gray-400/30 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-gray-300/30 to-white shadow-lg">
                <img
                  src={
                    normalData.lighthouseResult.fullPageScreenshot.screenshot
                      .data
                  }
                  alt="Full Page Screenshot"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-brand-theme/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-brand-theme/20">
            <FaGlobe className="h-8 w-8 text-brand-theme" />
          </div>
          <p className="text-brand-gray-500 font-medium">
            No screenshots available
          </p>
        </div>
      )}
    </div>
  );
};

export default ScreenshotsSection;

