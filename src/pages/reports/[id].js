import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import SEO from "@/components/common/SEO";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  FaArrowLeft,
  FaTachometerAlt,
  FaClock,
  FaDownload,
  FaGlobe,
  FaCalendarAlt,
  FaDesktop,
  FaMobile,
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaNetworkWired,
  FaCog,
  FaServer,
} from "react-icons/fa";
import desktopData from "../../../data-desktop.json";
import mobileData from "../../../data-mobile.json";

const ReportDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("desktop");
  const [desktopReportData, setDesktopReportData] = useState(null);
  const [mobileReportData, setMobileReportData] = useState(null);

  useEffect(() => {
    // Load both desktop and mobile data
    if (desktopData) {
      setDesktopReportData(desktopData);
    }
    if (mobileData) {
      setMobileReportData(mobileData);
    }
  }, [id]);

  // Get the active report data based on selected tab
  const reportData = activeTab === "desktop" ? desktopReportData : mobileReportData;

  if (!desktopReportData || !mobileReportData) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-theme mx-auto mb-4"></div>
            <p className="text-gray-600">Loading report data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Extract basic information
  const url = reportData.id || reportData.lighthouseResult?.finalUrl || "";
  const fetchTime = reportData.lighthouseResult?.fetchTime || "";
  const performanceScore =
    reportData.lighthouseResult?.categories?.performance?.score * 100 || 0;

  return (
    <>
      <Head>
        <title>Page Report - {url}</title>
        <meta
          name="description"
          content={`Detailed PageSpeed performance report for ${url}`}
        />
      </Head>

      <SEO
        title={`Page Report - ${url}`}
        description={`Detailed PageSpeed performance report for ${url}`}
      />

      <DashboardLayout>
        <div className="min-h-screen bg-gray-50">
          {/* Header Section */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between mb-4">
                <Link
                  href="/reports"
                  className="flex items-center space-x-2 text-gray-600 hover:text-brand-theme transition-colors"
                >
                  <FaArrowLeft className="h-4 w-4" />
                  <span className="font-medium">Back to Reports</span>
                </Link>
                <button className="flex items-center space-x-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-sm">
                  <FaDownload className="h-4 w-4" />
                  <span className="font-medium">Export Report</span>
                </button>
              </div>

              <div className="mt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                    <FaGlobe className="h-6 w-6 text-brand-theme" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Page Performance Report
                    </h1>
                    <p className="text-sm text-gray-600 mt-1 break-all">
                      {url}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaCalendarAlt className="h-4 w-4" />
                      <span className="text-sm">
                        {fetchTime
                          ? new Date(fetchTime).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>
                    {performanceScore > 0 && (
                      <div className="flex items-center space-x-2">
                        <FaTachometerAlt
                          className={`h-5 w-5 ${
                            performanceScore >= 90
                              ? "text-green-600"
                              : performanceScore >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        />
                        <span
                          className={`text-lg font-bold ${
                            performanceScore >= 90
                              ? "text-green-600"
                              : performanceScore >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          Performance Score: {Math.round(performanceScore)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tab Switcher */}
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab("desktop")}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                        activeTab === "desktop"
                          ? "bg-white text-brand-theme shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <FaDesktop className="h-4 w-4" />
                      <span>Desktop</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("mobile")}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                        activeTab === "mobile"
                          ? "bg-white text-brand-theme shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
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

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Active Tab Indicator */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {activeTab === "desktop" ? (
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg">
                    <FaDesktop className="h-4 w-4" />
                    <span className="text-sm font-medium">Desktop View</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-lg">
                    <FaMobile className="h-4 w-4" />
                    <span className="text-sm font-medium">Mobile View</span>
                  </div>
                )}
                <span className="text-sm text-gray-500">
                  Showing {activeTab === "desktop" ? "desktop" : "mobile"} performance metrics
                </span>
              </div>
            </div>

            {/* Section 2: Performance Score Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Performance Score Overview
              </h2>

              {reportData.lighthouseResult?.categories?.performance && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Main Performance Score */}
                  <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <div className="relative w-32 h-32 mb-4">
                      <svg
                        className="transform -rotate-90 w-32 h-32"
                        viewBox="0 0 120 120"
                      >
                        {/* Background circle */}
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                        />
                        {/* Score circle */}
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke={
                            performanceScore >= 90
                              ? "#10b981"
                              : performanceScore >= 70
                              ? "#f59e0b"
                              : "#ef4444"
                          }
                          strokeWidth="8"
                          strokeDasharray={`${(performanceScore / 100) * 339.29} 339.29`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className={`text-3xl font-bold ${
                            performanceScore >= 90
                              ? "text-green-600"
                              : performanceScore >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {Math.round(performanceScore)}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Performance
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      {performanceScore >= 90
                        ? "Excellent performance"
                        : performanceScore >= 70
                        ? "Good performance"
                        : "Needs improvement"}
                    </p>
                  </div>

                  {/* Score Breakdown */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Performance Score
                        </span>
                        <span
                          className={`text-sm font-bold ${
                            performanceScore >= 90
                              ? "text-green-600"
                              : performanceScore >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {Math.round(performanceScore)} / 100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            performanceScore >= 90
                              ? "bg-green-600"
                              : performanceScore >= 70
                              ? "bg-yellow-600"
                              : "bg-red-600"
                          }`}
                          style={{ width: `${performanceScore}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Lighthouse Version:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {reportData.lighthouseResult?.lighthouseVersion || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Form Factor:</span>
                          <span className="ml-2 font-medium text-gray-900 capitalize">
                            {reportData.lighthouseResult?.configSettings?.formFactor || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Benchmark Index:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {reportData.lighthouseResult?.environment?.benchmarkIndex || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Channel:</span>
                          <span className="ml-2 font-medium text-gray-900 uppercase">
                            {reportData.lighthouseResult?.configSettings?.channel || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Core Web Vitals */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Core Web Vitals
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* LCP - Largest Contentful Paint */}
                {reportData.lighthouseResult?.audits?.["largest-contentful-paint"] && (
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">LCP</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-200 text-blue-800 rounded">
                        Largest Contentful Paint
                      </span>
                    </div>
                    {(() => {
                      const lcp = reportData.lighthouseResult.audits["largest-contentful-paint"];
                      const value = lcp.numericValue / 1000; // Convert to seconds
                      const displayValue = lcp.displayValue || `${value.toFixed(2)}s`;
                      const score = lcp.score;
                      const isGood = value <= 2.5;
                      const isNeedsImprovement = value > 2.5 && value <= 4.0;
                      
                      return (
                        <>
                          <div className="mb-4">
                            <div className={`text-4xl font-bold mb-2 ${
                              isGood ? "text-green-600" : isNeedsImprovement ? "text-yellow-600" : "text-red-600"
                            }`}>
                              {displayValue}
                            </div>
                            <div className="text-sm text-gray-600">
                              Score: {Math.round(score * 100)} / 100
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Good</span>
                              <span className="text-gray-600">≤ 2.5s</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Needs Improvement</span>
                              <span className="text-gray-600">2.5s - 4.0s</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Poor</span>
                              <span className="text-gray-600">&gt; 4.0s</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}

                {/* TBT - Total Blocking Time (replaces FID) */}
                {reportData.lighthouseResult?.audits?.["total-blocking-time"] && (
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">TBT</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-purple-200 text-purple-800 rounded">
                        Total Blocking Time
                      </span>
                    </div>
                    {(() => {
                      const tbt = reportData.lighthouseResult.audits["total-blocking-time"];
                      const value = tbt.numericValue; // Already in milliseconds
                      const displayValue = tbt.displayValue || `${Math.round(value)}ms`;
                      const score = tbt.score;
                      const isGood = value <= 200;
                      const isNeedsImprovement = value > 200 && value <= 600;
                      
                      return (
                        <>
                          <div className="mb-4">
                            <div className={`text-4xl font-bold mb-2 ${
                              isGood ? "text-green-600" : isNeedsImprovement ? "text-yellow-600" : "text-red-600"
                            }`}>
                              {displayValue}
                            </div>
                            <div className="text-sm text-gray-600">
                              Score: {Math.round(score * 100)} / 100
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Good</span>
                              <span className="text-gray-600">≤ 200ms</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Needs Improvement</span>
                              <span className="text-gray-600">200ms - 600ms</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Poor</span>
                              <span className="text-gray-600">&gt; 600ms</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}

                {/* CLS - Cumulative Layout Shift */}
                {reportData.lighthouseResult?.audits?.["cumulative-layout-shift"] && (
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">CLS</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-orange-200 text-orange-800 rounded">
                        Cumulative Layout Shift
                      </span>
                    </div>
                    {(() => {
                      const cls = reportData.lighthouseResult.audits["cumulative-layout-shift"];
                      const value = cls.numericValue;
                      const displayValue = cls.displayValue || value.toFixed(3);
                      const score = cls.score;
                      const isGood = value <= 0.1;
                      const isNeedsImprovement = value > 0.1 && value <= 0.25;
                      
                      return (
                        <>
                          <div className="mb-4">
                            <div className={`text-4xl font-bold mb-2 ${
                              isGood ? "text-green-600" : isNeedsImprovement ? "text-yellow-600" : "text-red-600"
                            }`}>
                              {displayValue}
                            </div>
                            <div className="text-sm text-gray-600">
                              Score: {Math.round(score * 100)} / 100
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Good</span>
                              <span className="text-gray-600">≤ 0.1</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Needs Improvement</span>
                              <span className="text-gray-600">0.1 - 0.25</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Poor</span>
                              <span className="text-gray-600">&gt; 0.25</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>

            {/* Section 4: Additional Performance Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Additional Performance Metrics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* First Contentful Paint */}
                {reportData.lighthouseResult?.audits?.["first-contentful-paint"] && (
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">FCP</h3>
                      <span className="text-xs text-gray-500">First Contentful Paint</span>
                    </div>
                    {(() => {
                      const fcp = reportData.lighthouseResult.audits["first-contentful-paint"];
                      const value = fcp.numericValue / 1000;
                      const displayValue = fcp.displayValue || `${value.toFixed(2)}s`;
                      const score = fcp.score;
                      const isGood = value <= 1.8;
                      const isNeedsImprovement = value > 1.8 && value <= 3.0;
                      
                      return (
                        <>
                          <div className={`text-2xl font-bold mb-2 ${
                            isGood ? "text-green-600" : isNeedsImprovement ? "text-yellow-600" : "text-red-600"
                          }`}>
                            {displayValue}
                          </div>
                          <div className="text-xs text-gray-600">
                            Score: {Math.round(score * 100)} / 100
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}

                {/* Speed Index */}
                {reportData.lighthouseResult?.audits?.["speed-index"] && (
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">Speed Index</h3>
                      <span className="text-xs text-gray-500">Visual Load</span>
                    </div>
                    {(() => {
                      const si = reportData.lighthouseResult.audits["speed-index"];
                      const value = si.numericValue / 1000;
                      const displayValue = si.displayValue || `${value.toFixed(2)}s`;
                      const score = si.score;
                      const isGood = value <= 3.4;
                      const isNeedsImprovement = value > 3.4 && value <= 5.8;
                      
                      return (
                        <>
                          <div className={`text-2xl font-bold mb-2 ${
                            isGood ? "text-green-600" : isNeedsImprovement ? "text-yellow-600" : "text-red-600"
                          }`}>
                            {displayValue}
                          </div>
                          <div className="text-xs text-gray-600">
                            Score: {Math.round(score * 100)} / 100
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}

                {/* Total Blocking Time (already shown in Core Web Vitals, but showing here too for completeness) */}
                {reportData.lighthouseResult?.audits?.["total-blocking-time"] && (
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">TBT</h3>
                      <span className="text-xs text-gray-500">Total Blocking Time</span>
                    </div>
                    {(() => {
                      const tbt = reportData.lighthouseResult.audits["total-blocking-time"];
                      const displayValue = tbt.displayValue || `${Math.round(tbt.numericValue)}ms`;
                      const score = tbt.score;
                      const value = tbt.numericValue;
                      const isGood = value <= 200;
                      const isNeedsImprovement = value > 200 && value <= 600;
                      
                      return (
                        <>
                          <div className={`text-2xl font-bold mb-2 ${
                            isGood ? "text-green-600" : isNeedsImprovement ? "text-yellow-600" : "text-red-600"
                          }`}>
                            {displayValue}
                          </div>
                          <div className="text-xs text-gray-600">
                            Score: {Math.round(score * 100)} / 100
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>

            {/* Section 5: Screenshots */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Screenshots
              </h2>

              <div className="space-y-6">
                {/* Final Screenshot */}
                {reportData.lighthouseResult?.audits?.["final-screenshot"]?.details?.data && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Final Screenshot
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {reportData.lighthouseResult.audits["final-screenshot"].description}
                    </p>
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={reportData.lighthouseResult.audits["final-screenshot"].details.data}
                        alt="Final Screenshot"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}

                {/* Screenshot Thumbnails (Filmstrip) */}
                {reportData.lighthouseResult?.audits?.["screenshot-thumbnails"]?.details?.items && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Page Load Filmstrip
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {reportData.lighthouseResult.audits["screenshot-thumbnails"].description}
                    </p>
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 p-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {reportData.lighthouseResult.audits["screenshot-thumbnails"].details.items.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center space-y-2"
                            >
                              <div className="border border-gray-300 rounded overflow-hidden bg-white">
                                <img
                                  src={item.data}
                                  alt={`Screenshot at ${item.timing}ms`}
                                  className="w-full h-auto"
                                />
                              </div>
                              <div className="text-xs text-gray-600 text-center">
                                <div className="font-medium">
                                  {item.timing ? `${(item.timing / 1000).toFixed(2)}s` : "N/A"}
                                </div>
                                {item.timestamp && (
                                  <div className="text-gray-500">
                                    {new Date(item.timestamp / 1000).toLocaleTimeString()}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Full Page Screenshot */}
                {reportData.lighthouseResult?.fullPageScreenshot?.screenshot?.data && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Full Page Screenshot
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Complete screenshot of the entire page
                    </p>
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={reportData.lighthouseResult.fullPageScreenshot.screenshot.data}
                        alt="Full Page Screenshot"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}

                {/* No Screenshots Available */}
                {!reportData.lighthouseResult?.audits?.["final-screenshot"]?.details?.data &&
                  !reportData.lighthouseResult?.audits?.["screenshot-thumbnails"]?.details?.items &&
                  !reportData.lighthouseResult?.fullPageScreenshot?.screenshot?.data && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaGlobe className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600">No screenshots available</p>
                    </div>
                  )}
              </div>
            </div>

            {/* Section 6: Accessibility */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Accessibility
              </h2>

              {reportData.lighthouseResult?.categories?.accessibility ? (
                <div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Accessibility Score
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-24 h-24">
                          <svg
                            className="transform -rotate-90 w-24 h-24"
                            viewBox="0 0 120 120"
                          >
                            <circle
                              cx="60"
                              cy="60"
                              r="54"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="8"
                            />
                            <circle
                              cx="60"
                              cy="60"
                              r="54"
                              fill="none"
                              stroke={
                                reportData.lighthouseResult.categories.accessibility
                                  .score * 100 >= 90
                                  ? "#10b981"
                                  : reportData.lighthouseResult.categories
                                      .accessibility.score * 100 >= 70
                                  ? "#f59e0b"
                                  : "#ef4444"
                              }
                              strokeWidth="8"
                              strokeDasharray={`${
                                (reportData.lighthouseResult.categories
                                  .accessibility.score * 100 / 100) *
                                339.29
                              } 339.29`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span
                              className={`text-2xl font-bold ${
                                reportData.lighthouseResult.categories
                                  .accessibility.score * 100 >= 90
                                  ? "text-green-600"
                                  : reportData.lighthouseResult.categories
                                      .accessibility.score * 100 >= 70
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {Math.round(
                                reportData.lighthouseResult.categories
                                  .accessibility.score * 100
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {
                        reportData.lighthouseResult.categories.accessibility
                          .title
                      }
                    </p>
                  </div>

                  {/* Accessibility Audits */}
                  {reportData.lighthouseResult.categories.accessibility
                    .auditRefs && (
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4">
                        Accessibility Audits
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reportData.lighthouseResult.categories.accessibility.auditRefs
                          .slice(0, 10)
                          .map((auditRef, index) => {
                            const audit =
                              reportData.lighthouseResult?.audits?.[
                                auditRef.id
                              ];
                            if (!audit) return null;

                            return (
                              <div
                                key={index}
                                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-sm font-medium text-gray-900">
                                    {audit.title}
                                  </h5>
                                  {audit.score !== null && (
                                    <span
                                      className={`text-xs font-bold px-2 py-1 rounded ${
                                        audit.score >= 0.9
                                          ? "bg-green-100 text-green-800"
                                          : audit.score >= 0.5
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {Math.round(audit.score * 100)}
                                    </span>
                                  )}
                                </div>
                                {audit.description && (
                                  <p className="text-xs text-gray-600 line-clamp-2">
                                    {audit.description.replace(
                                      /\[([^\]]+)\]\([^\)]+\)/g,
                                      "$1"
                                    )}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    Accessibility data not available in this report. Enable
                    accessibility category in Lighthouse to see this data.
                  </p>
                </div>
              )}
            </div>

            {/* Section 7: SEO */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                SEO (Search Engine Optimization)
              </h2>

              {reportData.lighthouseResult?.categories?.seo ? (
                <div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        SEO Score
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-24 h-24">
                          <svg
                            className="transform -rotate-90 w-24 h-24"
                            viewBox="0 0 120 120"
                          >
                            <circle
                              cx="60"
                              cy="60"
                              r="54"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="8"
                            />
                            <circle
                              cx="60"
                              cy="60"
                              r="54"
                              fill="none"
                              stroke={
                                reportData.lighthouseResult.categories.seo
                                  .score * 100 >= 90
                                  ? "#10b981"
                                  : reportData.lighthouseResult.categories.seo
                                      .score * 100 >= 70
                                  ? "#f59e0b"
                                  : "#ef4444"
                              }
                              strokeWidth="8"
                              strokeDasharray={`${
                                (reportData.lighthouseResult.categories.seo
                                  .score * 100 / 100) *
                                339.29
                              } 339.29`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span
                              className={`text-2xl font-bold ${
                                reportData.lighthouseResult.categories.seo
                                  .score * 100 >= 90
                                  ? "text-green-600"
                                  : reportData.lighthouseResult.categories.seo
                                      .score * 100 >= 70
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {Math.round(
                                reportData.lighthouseResult.categories.seo
                                  .score * 100
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {reportData.lighthouseResult.categories.seo.title}
                    </p>
                  </div>

                  {/* SEO Audits */}
                  {reportData.lighthouseResult.categories.seo.auditRefs && (
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4">
                        SEO Audits
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reportData.lighthouseResult.categories.seo.auditRefs
                          .slice(0, 10)
                          .map((auditRef, index) => {
                            const audit =
                              reportData.lighthouseResult?.audits?.[
                                auditRef.id
                              ];
                            if (!audit) return null;

                            return (
                              <div
                                key={index}
                                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-sm font-medium text-gray-900">
                                    {audit.title}
                                  </h5>
                                  {audit.score !== null && (
                                    <span
                                      className={`text-xs font-bold px-2 py-1 rounded ${
                                        audit.score >= 0.9
                                          ? "bg-green-100 text-green-800"
                                          : audit.score >= 0.5
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {Math.round(audit.score * 100)}
                                    </span>
                                  )}
                                </div>
                                {audit.description && (
                                  <p className="text-xs text-gray-600 line-clamp-2">
                                    {audit.description.replace(
                                      /\[([^\]]+)\]\([^\)]+\)/g,
                                      "$1"
                                    )}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    SEO data not available in this report. Enable SEO category
                    in Lighthouse to see this data.
                  </p>
                </div>
              )}
            </div>

            {/* Section 8: Loading Experience */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Loading Experience (Field Data)
              </h2>

              {reportData.loadingExperience?.metrics ? (
                <div>
                  <div className="mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        reportData.loadingExperience.overall_category ===
                        "FAST"
                          ? "bg-green-100 text-green-800"
                          : reportData.loadingExperience.overall_category ===
                            "AVERAGE"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      Overall:{" "}
                      {reportData.loadingExperience.overall_category}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(
                      reportData.loadingExperience.metrics
                    ).map(([key, metric]) => (
                      <div
                        key={key}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          {key
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </h4>
                        <div className="mb-2">
                          <span
                            className={`text-lg font-bold ${
                              metric.category === "FAST"
                                ? "text-green-600"
                                : metric.category === "AVERAGE"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {metric.category}
                          </span>
                          {metric.percentile && (
                            <span className="text-sm text-gray-600 ml-2">
                              (P{metric.percentile})
                            </span>
                          )}
                        </div>
                        {metric.distributions && (
                          <div className="space-y-1">
                            {metric.distributions.map((dist, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-xs"
                              >
                                <span className="text-gray-600">
                                  {dist.min !== undefined &&
                                  dist.max !== undefined
                                    ? `${dist.min}-${dist.max}ms`
                                    : dist.min !== undefined
                                    ? `>${dist.min}ms`
                                    : "All"}
                                </span>
                                <span className="text-gray-900 font-medium">
                                  {(dist.proportion * 100).toFixed(1)}%
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    Loading experience data not available.
                  </p>
                </div>
              )}
            </div>

            {/* Section 9: Diagnostics */}
            {reportData.lighthouseResult?.audits?.diagnostics && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Diagnostics
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {reportData.lighthouseResult.audits.diagnostics.description}
                </p>

                {reportData.lighthouseResult.audits.diagnostics.details
                  ?.items?.[0] && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.entries(
                      reportData.lighthouseResult.audits.diagnostics.details
                        .items[0]
                    ).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <h4 className="text-xs font-medium text-gray-600 mb-1">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </h4>
                        <p className="text-lg font-bold text-gray-900">
                          {typeof value === "number"
                            ? value.toLocaleString()
                            : String(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Section 10: Network Requests */}
            {reportData.lighthouseResult?.audits?.["network-requests"]
              ?.details?.items && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Network Requests
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {
                    reportData.lighthouseResult.audits["network-requests"]
                      .description
                  }
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          URL
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reportData.lighthouseResult.audits[
                        "network-requests"
                      ].details.items
                        .slice(0, 50)
                        .map((request, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">
                              <div className="max-w-xs truncate">
                                {request.url}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {request.resourceType || request.mimeType || "-"}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {request.transferSize
                                ? `${(request.transferSize / 1024).toFixed(2)} KB`
                                : "-"}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {request.networkEndTime && request.networkRequestTime
                                ? `${(
                                    (request.networkEndTime -
                                      request.networkRequestTime) *
                                    1000
                                  ).toFixed(0)}ms`
                                : "-"}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {request.statusCode ? (
                                <span
                                  className={`px-2 py-1 rounded text-xs font-medium ${
                                    request.statusCode >= 200 &&
                                    request.statusCode < 300
                                      ? "bg-green-100 text-green-800"
                                      : request.statusCode >= 400
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {request.statusCode}
                                </span>
                              ) : (
                                "-"
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {reportData.lighthouseResult.audits["network-requests"]
                  .details.items.length > 50 && (
                  <div className="mt-4 text-sm text-gray-600 text-center">
                    Showing first 50 of{" "}
                    {
                      reportData.lighthouseResult.audits["network-requests"]
                        .details.items.length
                    }{" "}
                    requests
                  </div>
                )}
              </div>
            )}

            {/* Section 11: All Performance Audits */}
            {reportData.lighthouseResult?.categories?.performance
              ?.auditRefs && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  All Performance Audits
                </h2>

                <div className="space-y-4">
                  {reportData.lighthouseResult.categories.performance.auditRefs.map(
                    (auditRef, index) => {
                      const audit =
                        reportData.lighthouseResult?.audits?.[auditRef.id];
                      if (!audit) return null;

                      return (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="text-sm font-semibold text-gray-900">
                                  {audit.title}
                                </h4>
                                {auditRef.acronym && (
                                  <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                                    {auditRef.acronym}
                                  </span>
                                )}
                                {audit.score !== null && (
                                  <span
                                    className={`text-xs font-bold px-2 py-1 rounded ${
                                      audit.score >= 0.9
                                        ? "bg-green-100 text-green-800"
                                        : audit.score >= 0.5
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {Math.round(audit.score * 100)}
                                  </span>
                                )}
                                {audit.score === null && (
                                  <span className="text-xs text-gray-500">
                                    {audit.scoreDisplayMode}
                                  </span>
                                )}
                              </div>
                              {audit.description && (
                                <p className="text-xs text-gray-600 mb-2">
                                  {audit.description.replace(
                                    /\[([^\]]+)\]\([^\)]+\)/g,
                                    "$1"
                                  )}
                                </p>
                              )}
                              {audit.displayValue && (
                                <p className="text-sm font-medium text-gray-900">
                                  {audit.displayValue}
                                </p>
                              )}
                              {auditRef.weight && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Weight: {auditRef.weight}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* Section 12: Origin Loading Experience */}
            {reportData.originLoadingExperience?.metrics && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Origin Loading Experience
                </h2>

                <div className="mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      reportData.originLoadingExperience.overall_category ===
                      "FAST"
                        ? "bg-green-100 text-green-800"
                        : reportData.originLoadingExperience
                            .overall_category === "AVERAGE"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    Overall:{" "}
                    {reportData.originLoadingExperience.overall_category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(
                    reportData.originLoadingExperience.metrics
                  ).map(([key, metric]) => (
                    <div
                      key={key}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        {key
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </h4>
                      <div className="mb-2">
                        <span
                          className={`text-lg font-bold ${
                            metric.category === "FAST"
                              ? "text-green-600"
                              : metric.category === "AVERAGE"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {metric.category}
                        </span>
                        {metric.percentile && (
                          <span className="text-sm text-gray-600 ml-2">
                            (P{metric.percentile})
                          </span>
                        )}
                      </div>
                      {metric.distributions && (
                        <div className="space-y-1">
                          {metric.distributions.map((dist, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs"
                            >
                              <span className="text-gray-600">
                                {dist.min !== undefined &&
                                dist.max !== undefined
                                  ? `${dist.min}-${dist.max}ms`
                                  : dist.min !== undefined
                                  ? `>${dist.min}ms`
                                  : "All"}
                              </span>
                              <span className="text-gray-900 font-medium">
                                {(dist.proportion * 100).toFixed(1)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ReportDetail;

