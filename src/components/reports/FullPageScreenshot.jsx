import React from "react";
import { FaImage } from "react-icons/fa";

const FullPageScreenshot = ({ normalData }) => {
  const fullPageScreenshot = normalData.lighthouseResult?.fullPageScreenshot;

  if (!fullPageScreenshot?.screenshot?.data) {
    return null;
  }

  const screenshot = fullPageScreenshot.screenshot;
  const nodes = fullPageScreenshot.nodes || {};

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaImage className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Full Page Screenshot
        </h2>
      </div>

      <div className="space-y-6">
        {/* <div className="bg-gradient-to-br from-brand-gray-300/30 to-white p-6 rounded-2xl border-2 border-brand-gray-400/30 shadow-lg">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-brand-gray-500">
                Dimensions
              </span>
              <span className="text-sm font-bold text-brand-blue-900">
                {screenshot.width} × {screenshot.height}px
              </span>
            </div>
          </div>
          <div className="border-2 border-brand-gray-400/30 rounded-xl overflow-hidden bg-white shadow-md">
            <img
              src={screenshot.data}
              alt="Full page screenshot"
              className="w-full h-auto"
            />
          </div>
        </div> */}

        {Object.keys(nodes).length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-brand-blue-900 mb-4">
              Page Elements ({Object.keys(nodes).length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(nodes)
                .slice(0, 20)
                .map(([nodeId, node]) => (
                  <div
                    key={nodeId}
                    className="p-4 bg-gradient-to-br from-white to-brand-theme/5 rounded-xl border-2 border-brand-theme/20 shadow-md"
                  >
                    <div className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide mb-2">
                      {node.nodeLabel || nodeId}
                    </div>
                    {node.selector && (
                      <div className="text-xs text-brand-blue-900 font-mono bg-white/50 px-2 py-1 rounded border border-brand-gray-400/20 break-all">
                        {node.selector}
                      </div>
                    )}
                  </div>
                ))}
              {Object.keys(nodes).length > 20 && (
                <div className="p-4 bg-gradient-to-br from-white to-brand-theme/5 rounded-xl border-2 border-brand-theme/20 shadow-md flex items-center justify-center">
                  <span className="text-sm font-bold text-brand-gray-500">
                    +{Object.keys(nodes).length - 20} more elements
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullPageScreenshot;
