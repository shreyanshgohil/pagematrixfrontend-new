import React from "react";
import { FaChartBar } from "react-icons/fa";

const CruxSection = ({ cruxData }) => {
  if (!cruxData?.record) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-xl flex items-center justify-center shadow-lg">
            <FaChartBar className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-brand-blue-900">
            Chrome User Experience Report (CrUX)
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-brand-gray-500 font-medium">
            CrUX data not available in this report.
          </p>
        </div>
      </div>
    );
  }

  const { record } = cruxData;
  const { key, metrics, collectionPeriod } = record;

  // Helper function to get category based on metric thresholds
  const getCategory = (metricName, p75Value) => {
    if (typeof p75Value === "string") {
      p75Value = parseFloat(p75Value);
    }

    switch (metricName) {
      case "largest_contentful_paint":
        return p75Value <= 2500 ? "FAST" : p75Value <= 4000 ? "AVERAGE" : "SLOW";
      case "first_contentful_paint":
        return p75Value <= 1800 ? "FAST" : p75Value <= 3000 ? "AVERAGE" : "SLOW";
      case "cumulative_layout_shift":
        return p75Value <= 0.1 ? "FAST" : p75Value <= 0.25 ? "AVERAGE" : "SLOW";
      case "interaction_to_next_paint":
        return p75Value <= 200 ? "FAST" : p75Value <= 500 ? "AVERAGE" : "SLOW";
      case "experimental_time_to_first_byte":
        return p75Value <= 800 ? "FAST" : p75Value <= 1800 ? "AVERAGE" : "SLOW";
      default:
        return "UNKNOWN";
    }
  };

  // Helper function to format metric value
  const formatMetricValue = (metricName, value) => {
    if (typeof value === "string") {
      value = parseFloat(value);
    }

    switch (metricName) {
      case "largest_contentful_paint":
      case "first_contentful_paint":
      case "experimental_time_to_first_byte":
      case "round_trip_time":
        return `${Math.round(value)}ms`;
      case "cumulative_layout_shift":
        return value.toFixed(3);
      case "interaction_to_next_paint":
        return `${Math.round(value)}ms`;
      default:
        return value;
    }
  };

  // Key metrics to display
  const keyMetrics = [
    {
      key: "largest_contentful_paint",
      label: "LCP (Largest Contentful Paint)",
      p75: metrics.largest_contentful_paint?.percentiles?.p75,
      histogram: metrics.largest_contentful_paint?.histogram,
    },
    {
      key: "first_contentful_paint",
      label: "FCP (First Contentful Paint)",
      p75: metrics.first_contentful_paint?.percentiles?.p75,
      histogram: metrics.first_contentful_paint?.histogram,
    },
    {
      key: "cumulative_layout_shift",
      label: "CLS (Cumulative Layout Shift)",
      p75: metrics.cumulative_layout_shift?.percentiles?.p75,
      histogram: metrics.cumulative_layout_shift?.histogram,
    },
    {
      key: "interaction_to_next_paint",
      label: "INP (Interaction to Next Paint)",
      p75: metrics.interaction_to_next_paint?.percentiles?.p75,
      histogram: metrics.interaction_to_next_paint?.histogram,
    },
    {
      key: "experimental_time_to_first_byte",
      label: "TTFB (Time to First Byte)",
      p75: metrics.experimental_time_to_first_byte?.percentiles?.p75,
      histogram: metrics.experimental_time_to_first_byte?.histogram,
    },
  ].filter((metric) => metric.p75 !== undefined);

  // Format collection period
  const formatDate = (dateObj) => {
    if (!dateObj) return "N/A";
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[dateObj.month - 1]} ${dateObj.day}, ${dateObj.year}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-400/50 p-8 mb-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-xl flex items-center justify-center shadow-lg">
          <FaChartBar className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue-900">
          Chrome User Experience Report (CrUX)
        </h2>
      </div>

      <div>
        {/* Header Info */}
        <div className="mb-6 p-6 bg-gradient-to-br from-brand-theme/5 to-brand-blue-700/5 rounded-xl border-2 border-brand-theme/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                Form Factor
              </span>
              <span className="text-sm font-bold text-brand-blue-900 capitalize">
                {key.formFactor?.toLowerCase() || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                Origin
              </span>
              <span className="text-sm font-bold text-brand-blue-900 break-all">
                {key.origin || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide block mb-1">
                Collection Period
              </span>
              <span className="text-sm font-bold text-brand-blue-900">
                {collectionPeriod?.firstDate && collectionPeriod?.lastDate
                  ? `${formatDate(collectionPeriod.firstDate)} - ${formatDate(collectionPeriod.lastDate)}`
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyMetrics.map((metric) => {
            const category = getCategory(metric.key, metric.p75);
            const displayValue = formatMetricValue(metric.key, metric.p75);

            return (
              <div
                key={metric.key}
                className="p-6 bg-gradient-to-br from-white to-brand-theme/5 rounded-2xl border-2 border-brand-theme/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <h4 className="text-sm font-bold text-brand-blue-900 mb-3">
                  {metric.label}
                </h4>
                <div className="mb-3">
                  <div
                    className={`text-2xl font-bold mb-1 ${
                      category === "FAST"
                        ? "text-brand-theme"
                        : category === "AVERAGE"
                        ? "text-brand-theme-600"
                        : "text-brand-theme-800"
                    }`}
                  >
                    {displayValue}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-lg border ${
                        category === "FAST"
                          ? "bg-brand-theme/20 text-brand-theme border-brand-theme/30"
                          : category === "AVERAGE"
                          ? "bg-brand-theme-600/20 text-brand-theme-600 border-brand-theme-600/30"
                          : "bg-brand-theme-800/20 text-brand-theme-800 border-brand-theme-800/30"
                      }`}
                    >
                      {category}
                    </span>
                    <span className="text-xs text-brand-gray-500 font-medium">
                      P75
                    </span>
                  </div>
                </div>

                {/* Histogram Visualization */}
                {metric.histogram && (
                  <div className="mt-4 space-y-2">
                    <div className="text-xs font-bold text-brand-gray-500 uppercase tracking-wide">
                      Distribution
                    </div>
                    <div className="space-y-1.5">
                      {metric.histogram.map((bin, idx) => {
                        const percentage = (bin.density * 100).toFixed(2);
                        const range =
                          bin.end !== undefined
                            ? `${bin.start} - ${bin.end}`
                            : `≥ ${bin.start}`;

                        return (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="flex-1 bg-brand-gray-400/20 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-2 rounded-full ${
                                  idx === 0
                                    ? "bg-brand-theme"
                                    : idx === 1
                                    ? "bg-brand-theme-600"
                                    : "bg-brand-theme-800"
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <div className="text-xs text-brand-gray-500 font-medium min-w-[60px] text-right">
                              {percentage}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Metrics */}
        {metrics.round_trip_time && (
          <div className="mt-6 p-6 bg-gradient-to-br from-white to-brand-theme/5 rounded-xl border-2 border-brand-theme/20">
            <h4 className="text-sm font-bold text-brand-blue-900 mb-3">
              Round Trip Time (RTT)
            </h4>
            <div className="text-2xl font-bold text-brand-theme">
              {formatMetricValue("round_trip_time", metrics.round_trip_time.percentiles.p75)}
            </div>
            <div className="text-xs text-brand-gray-500 font-medium mt-1">P75</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CruxSection;

