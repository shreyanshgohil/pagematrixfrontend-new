import React from "react";
import { FaCode } from "react-icons/fa";

const StackPacksSection = ({ normalData }) => {
  const stackPacks = normalData.lighthouseResult?.stackPacks;

  if (!stackPacks || stackPacks.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaCode className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Framework Recommendations
        </h2>
      </div>

      <div className="space-y-6">
        {stackPacks.map((pack, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-br from-white to-brand-theme/5 rounded-xl border-2 border-brand-theme/20 shadow-md"
          >
            <div className="flex items-center space-x-4 mb-4">
              {pack.iconDataURL && (
                <img
                  src={pack.iconDataURL}
                  alt={pack.title}
                  className="w-12 h-12 object-contain"
                />
              )}
              <div>
                <h3 className="text-lg font-bold text-brand-blue-900">
                  {pack.title}
                </h3>
                <p className="text-sm text-brand-gray-500 font-medium">
                  Framework-specific optimization recommendations
                </p>
              </div>
            </div>

            {pack.descriptions && Object.keys(pack.descriptions).length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-bold text-brand-blue-900 mb-3">
                  Recommendations
                </h4>
                <div className="space-y-3">
                  {Object.entries(pack.descriptions).map(([auditId, description]) => (
                    <div
                      key={auditId}
                      className="p-4 bg-white/50 rounded-lg border border-brand-gray-400/20"
                    >
                      <div className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide mb-2">
                        {auditId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </div>
                      <p
                        className="text-sm text-brand-gray-500 font-medium"
                        dangerouslySetInnerHTML={{
                          __html: description.replace(
                            /\[([^\]]+)\]\(([^\)]+)\)/g,
                            '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-brand-theme hover:text-brand-theme-600 underline">$1</a>'
                          ),
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackPacksSection;

