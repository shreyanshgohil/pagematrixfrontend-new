import React from "react";
import { FaPuzzlePiece } from "react-icons/fa";

const ThirdPartyEntities = ({ normalData }) => {
  const entities = normalData.lighthouseResult?.entities;

  if (!entities || entities.length === 0) {
    return null;
  }

  // Group entities by category
  const groupedEntities = entities.reduce((acc, entity) => {
    const category = entity.category || "other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(entity);
    return acc;
  }, {});

  const categoryLabels = {
    analytics: "Analytics",
    "tag-manager": "Tag Manager",
    social: "Social",
    video: "Video",
    ad: "Advertising",
    marketing: "Marketing",
    customer_success: "Customer Success",
    content: "Content",
    cdn: "CDN",
    hosting: "Hosting",
    utility: "Utility",
    other: "Other",
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme-600 to-brand-theme-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaPuzzlePiece className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Third-Party Services
        </h2>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedEntities).map(([category, categoryEntities]) => (
          <div key={category}>
            <h3 className="text-lg font-bold text-brand-blue-900 mb-4">
              {categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryEntities.map((entity, index) => (
                <div
                  key={index}
                  className="p-5 bg-gradient-to-br from-white to-brand-theme/5 rounded-xl border-2 border-brand-theme/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-brand-blue-900 mb-1">
                        {entity.name}
                      </h4>
                      {entity.isFirstParty && (
                        <span className="text-xs font-semibold text-brand-theme bg-brand-theme/10 px-2 py-1 rounded-lg border border-brand-theme/30">
                          First Party
                        </span>
                      )}
                    </div>
                  </div>
                  {entity.homepage && (
                    <a
                      href={entity.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-theme hover:text-brand-theme-600 font-medium"
                    >
                      Visit Website →
                    </a>
                  )}
                  {entity.origins && entity.origins.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide mb-2">
                        Origins ({entity.origins.length})
                      </div>
                      <div className="space-y-1">
                        {entity.origins.slice(0, 3).map((origin, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-brand-gray-500 font-mono bg-white/50 px-2 py-1 rounded border border-brand-gray-400/20"
                          >
                            {origin}
                          </div>
                        ))}
                        {entity.origins.length > 3 && (
                          <div className="text-xs text-brand-gray-500 font-medium">
                            +{entity.origins.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdPartyEntities;

