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
import BestPracticesSection from "@/components/reports/BestPracticesSection";
import CruxSection from "@/components/reports/CruxSection";
import LoadingExperience from "@/components/reports/LoadingExperience";
import DiagnosticsSection from "@/components/reports/DiagnosticsSection";
import NetworkRequests from "@/components/reports/NetworkRequests";
import PerformanceAudits from "@/components/reports/PerformanceAudits";
import OriginLoadingExperience from "@/components/reports/OriginLoadingExperience";
import ThirdPartyEntities from "@/components/reports/ThirdPartyEntities";
import StackPacksSection from "@/components/reports/StackPacksSection";
import RunWarningsSection from "@/components/reports/RunWarningsSection";
import TimingSection from "@/components/reports/TimingSection";
import EnvironmentInfo from "@/components/reports/EnvironmentInfo";
import PerformanceInsights from "@/components/reports/PerformanceInsights";
import PerformanceOpportunities from "@/components/reports/PerformanceOpportunities";
import ResourceSummary from "@/components/reports/ResourceSummary";
import AllMetrics from "@/components/reports/AllMetrics";
import CategoryGroups from "@/components/reports/CategoryGroups";
import FullPageScreenshot from "@/components/reports/FullPageScreenshot";

const ReportDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("desktop");
  const [desktopReportData, setDesktopReportData] = useState(null);
  const [mobileReportData, setMobileReportData] = useState(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const loadReportData = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/reports/${id}?formFactor=desktop`);
      // const desktopData = await response.json();
      // const mobileResponse = await fetch(`/api/reports/${id}?formFactor=mobile`);
      // const mobileData = await mobileResponse.json();
      
      // For now, using dummy data
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (desktopData) {
        setDesktopReportData(desktopData);
      }
      if (mobileData) {
        setMobileReportData(mobileData);
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  useEffect(() => {
    loadReportData();
  }, [id]);

  const handleRefetch = async () => {
    setIsRefetching(true);
    try {
      await loadReportData();
      // Show success message or toast here if needed
    } catch (error) {
      console.error("Error refetching data:", error);
      // Show error message or toast here if needed
    } finally {
      setIsRefetching(false);
    }
  };

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
  const bestPracticesData = reportData.best_practices;
  const cruxData = reportData.crux;

  // Extract basic information from normal data
  const url = normalData.id || normalData.lighthouseResult?.finalUrl || "";
  const fetchTime = normalData.lighthouseResult?.fetchTime || "";
  const analysisUTCTimestamp = normalData.analysisUTCTimestamp || "";
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
            analysisUTCTimestamp={analysisUTCTimestamp}
            onRefetch={handleRefetch}
            isRefetching={isRefetching}
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

            {/* ============================================ */}
            {/* MOST USEFUL & ACTIONABLE SECTIONS (TOP) */}
            {/* ============================================ */}

            {/* Section 1: Performance Score Overview - Overall performance score */}
            <PerformanceScoreOverview normalData={normalData} />

            {/* Section 2: Core Web Vitals - Critical user experience metrics (LCP, TBT, CLS) */}
            <CoreWebVitals normalData={normalData} />

            {/* Section 3: Additional Performance Metrics - Key metrics (FCP, Speed Index, TBT) */}
            <AdditionalMetrics normalData={normalData} />

            {/* Section 4: Performance Opportunities - Actionable optimization opportunities with savings */}
            <PerformanceOpportunities normalData={normalData} />

            {/* Section 5: Performance Insights - Detailed performance insights and recommendations */}
            <PerformanceInsights normalData={normalData} />

            {/* Section 6: Resource Summary - Quick overview of resource usage by type */}
            <ResourceSummary normalData={normalData} />

            {/* Section 7: Third-Party Services - Services affecting page performance */}
            <ThirdPartyEntities normalData={normalData} />

            {/* Section 8: Network Requests - Detailed network request breakdown */}
            <NetworkRequests normalData={normalData} />

            {/* ============================================ */}
            {/* REAL USER DATA & VISUAL FEEDBACK */}
            {/* ============================================ */}

            {/* Section 9: Chrome User Experience Report (CrUX) - Real user data from Chrome */}
            <CruxSection cruxData={cruxData} />

            {/* Section 10: Loading Experience (Field Data) - Real user metrics from field data */}
            <LoadingExperience normalData={normalData} />

            {/* Section 11: Screenshots - Visual representation of page load */}
            <ScreenshotsSection normalData={normalData} />

            {/* ============================================ */}
            {/* QUALITY METRICS (Accessibility, SEO, Best Practices) */}
            {/* ============================================ */}

            {/* Section 12: Accessibility - Accessibility score and audits */}
            <AccessibilitySection accessibilityData={accessibilityData} />

            {/* Section 13: SEO - SEO score and audits */}
            <SEOSection seoData={seoData} />

            {/* Section 14: Best Practices - Best practices score and audits */}
            <BestPracticesSection bestPracticesData={bestPracticesData} />

            {/* ============================================ */}
            {/* TECHNICAL DETAILS & DIAGNOSTICS */}
            {/* ============================================ */}

            {/* Section 15: Diagnostics - Technical diagnostic information */}
            <DiagnosticsSection normalData={normalData} />

            {/* Section 16: Origin Loading Experience - Origin-level field data */}
            <OriginLoadingExperience normalData={normalData} />

            {/* Section 17: All Performance Audits - Complete list of all performance audits */}
            <PerformanceAudits normalData={normalData} />

            {/* Section 18: Stack Packs - Framework-specific recommendations */}
            <StackPacksSection normalData={normalData} />

            {/* Section 19: All Metrics - Complete metrics collection */}
            <AllMetrics normalData={normalData} />

            {/* ============================================ */}
            {/* ADDITIONAL INFORMATION & METADATA */}
            {/* ============================================ */}

            {/* Section 20: Category Groups - Audit category organization */}
            <CategoryGroups normalData={normalData} />

            {/* Section 21: Full Page Screenshot - Complete page screenshot with nodes */}
            <FullPageScreenshot normalData={normalData} />

            {/* Section 22: Run Warnings - Lighthouse run warnings */}
            <RunWarningsSection normalData={normalData} />

            {/* Section 23: Timing - Lighthouse analysis timing information */}
            <TimingSection normalData={normalData} />

            {/* Section 24: Environment & Configuration - Technical environment and configuration details */}
            <EnvironmentInfo normalData={normalData} />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ReportDetail;
