import React from "react";
import { FaTags } from "react-icons/fa";

const CategoryGroups = ({ normalData }) => {
  const categoryGroups = normalData.lighthouseResult?.categoryGroups;

  if (!categoryGroups || Object.keys(categoryGroups).length === 0) {
    return null;
  }

  // Group categories by prefix
  const groupedCategories = {
    accessibility: [],
    seo: [],
    "best-practices": [],
    performance: [],
    other: [],
  };

  Object.entries(categoryGroups).forEach(([id, group]) => {
    if (id.startsWith("a11y-")) {
      groupedCategories.accessibility.push({ id, ...group });
    } else if (id.startsWith("seo-")) {
      groupedCategories.seo.push({ id, ...group });
    } else if (id.startsWith("best-practices-")) {
      groupedCategories["best-practices"].push({ id, ...group });
    } else if (id.startsWith("diagnostics") || id.startsWith("metrics") || id.startsWith("insights")) {
      groupedCategories.performance.push({ id, ...group });
    } else {
      groupedCategories.other.push({ id, ...group });
    }
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case "accessibility":
        return "from-brand-theme-600 to-brand-theme-800";
      case "seo":
        return "from-brand-blue-700 to-brand-blue-800";
      case "best-practices":
        return "from-brand-theme to-brand-theme-600";
      case "performance":
        return "from-brand-theme-600 to-brand-theme";
      default:
        return "from-brand-gray-400 to-brand-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl flex items-center justify-center shadow-lg">
          <FaTags className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Audit Category Groups
        </h2>
      </div>

      <p className="text-sm text-brand-gray-500 font-medium mb-6">
        These groups organize audits by category to help you understand different aspects of your page's performance, accessibility, SEO, and best practices.
      </p>

      <div className="space-y-6">
        {Object.entries(groupedCategories).map(([categoryName, groups]) => {
          if (groups.length === 0) return null;

          return (
            <div key={categoryName}>
              <h3 className="text-lg font-bold text-brand-blue-900 mb-4 capitalize">
                {categoryName.replace("-", " ")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className={`p-5 bg-gradient-to-br ${getCategoryColor(
                      categoryName
                    )} rounded-xl border-2 border-white/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
                  >
                    <h4 className="text-base font-bold text-white mb-2">
                      {group.title}
                    </h4>
                    {group.description && (
                      <p className="text-xs text-white/90 font-medium leading-relaxed">
                        {group.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGroups;

