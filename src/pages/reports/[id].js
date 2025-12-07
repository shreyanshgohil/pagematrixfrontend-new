import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import SEO from "@/components/common/SEO";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { FaDesktop, FaMobile } from "react-icons/fa";
import desktopData from "../../../data-desktop.json";
import mobileData from "../../../data-mobile.json";

// Import all report components
import ReportHeader from "@/components/reports/ReportHeader";
import PerformanceScoreOverview from "@/components/reports/PerformanceScoreOverview";
import CoreWebVitals from "@/components/reports/CoreWebVitals";
import AdditionalMetrics from "@/components/reports/AdditionalMetrics";
import ScreenshotsSection from "@/components/reports/ScreenshotsSection";
import AccessibilitySection from "@/components/reports/AccessibilitySection";
import SEOSection from "@/components/reports/SEOSection";
import LoadingExperience from "@/components/reports/LoadingExperience";
import DiagnosticsSection from "@/components/reports/DiagnosticsSection";
import NetworkRequests from "@/components/reports/NetworkRequests";
import PerformanceAudits from "@/components/reports/PerformanceAudits";
import OriginLoadingExperience from "@/components/reports/OriginLoadingExperience";

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
  const reportData =
    activeTab === "desktop" ? desktopReportData : mobileReportData;

  if (!desktopReportData || !mobileReportData) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-brand-gray-300 via-white to-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-theme mx-auto mb-4"></div>
            <p className="text-brand-gray-500 font-medium">
              Loading report data...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Extract data from different sections
  const normalData = reportData.normal || reportData;
  const seoData = reportData.seo;
  const accessibilityData = reportData.accessibility;

  // Extract basic information from normal data
  const url = normalData.id || normalData.lighthouseResult?.finalUrl || "";
  const fetchTime = normalData.lighthouseResult?.fetchTime || "";
  const performanceScore =
    normalData.lighthouseResult?.categories?.performance?.score * 100 || 0;

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
        <div className="min-h-screen bg-gradient-to-br from-brand-gray-300 via-white to-white">
          {/* Header Section */}
          <ReportHeader
            url={url}
            fetchTime={fetchTime}
            performanceScore={performanceScore}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-6">
            {/* Active Tab Indicator */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {activeTab === "desktop" ? (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-brand-theme/20 to-brand-blue-700/20 text-brand-theme rounded-xl border border-brand-theme/30 shadow-md backdrop-blur-sm">
                    <FaDesktop className="h-4 w-4" />
                    <span className="text-sm font-semibold">Desktop View</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-brand-theme-600/20 to-brand-theme/20 text-brand-theme-600 rounded-xl border border-brand-theme-600/30 shadow-md backdrop-blur-sm">
                    <FaMobile className="h-4 w-4" />
                    <span className="text-sm font-semibold">Mobile View</span>
                  </div>
                )}
                <span className="text-sm text-brand-gray-500 font-medium">
                  Showing {activeTab === "desktop" ? "desktop" : "mobile"}{" "}
                  performance metrics
                </span>
              </div>
            </div>

            {/* Section 2: Performance Score Overview */}
            <PerformanceScoreOverview normalData={normalData} />

            {/* Section 3: Core Web Vitals */}
            <CoreWebVitals normalData={normalData} />

            {/* Section 4: Additional Performance Metrics */}
            <AdditionalMetrics normalData={normalData} />

            {/* Section 5: Screenshots */}
            <ScreenshotsSection normalData={normalData} />

            {/* Section 6: Accessibility */}
            <AccessibilitySection accessibilityData={accessibilityData} />

            {/* Section 7: SEO */}
            <SEOSection seoData={seoData} />

            {/* Section 8: Loading Experience */}
            <LoadingExperience normalData={normalData} />

            {/* Section 9: Diagnostics */}
            <DiagnosticsSection normalData={normalData} />

            {/* Section 10: Network Requests */}
            <NetworkRequests normalData={normalData} />

            {/* Section 11: All Performance Audits */}
            <PerformanceAudits normalData={normalData} />

            {/* Section 12: Origin Loading Experience */}
            <OriginLoadingExperience normalData={normalData} />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ReportDetail;
