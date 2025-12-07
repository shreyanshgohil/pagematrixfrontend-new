import React from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaDownload,
  FaGlobe,
  FaCalendarAlt,
  FaTachometerAlt,
  FaDesktop,
  FaMobile,
} from "react-icons/fa";

const ReportHeader = ({
  url,
  fetchTime,
  performanceScore,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="bg-gradient-to-r from-brand-blue-800 via-brand-blue-700 to-brand-theme-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/reports"
            className="flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-200 hover:translate-x-[-2px]"
          >
            <FaArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Reports</span>
          </Link>
          <button className="flex items-center space-x-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-200 shadow-lg hover:shadow-xl border border-white/20">
            <FaDownload className="h-4 w-4" />
            <span className="font-medium">Export Report</span>
          </button>
        </div>

        <div className="mt-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
              <FaGlobe className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                Page Performance Report
              </h1>
              <p className="text-white/80 text-sm break-all font-mono bg-white/10 px-3 py-1.5 rounded-lg inline-block">
                {url}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mt-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                <FaCalendarAlt className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {fetchTime
                    ? new Date(fetchTime).toLocaleString()
                    : "N/A"}
                </span>
              </div>
              {performanceScore > 0 && (
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                  <FaTachometerAlt className="h-5 w-5 text-white" />
                  <span className="text-lg font-bold text-white">
                    Score: {Math.round(performanceScore)}
                  </span>
                </div>
              )}
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl p-1.5 border border-white/20 shadow-lg">
              <button
                onClick={() => onTabChange("desktop")}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "desktop"
                    ? "bg-white text-brand-theme shadow-lg scale-105"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <FaDesktop className="h-4 w-4" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => onTabChange("mobile")}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "mobile"
                    ? "bg-white text-brand-theme shadow-lg scale-105"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <FaMobile className="h-4 w-4" />
                <span>Mobile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;

