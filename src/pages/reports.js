import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import SEO from "@/components/common/SEO";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  FaRedo,
  FaChartBar,
  FaFileAlt,
  FaClock,
  FaSync,
  FaChartLine,
  FaCircle,
  FaTachometerAlt,
  FaFilter,
  FaSearch,
  FaCalendarAlt,
  FaDownload,
  FaEye,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

const Reports = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("page-reports");
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "page-reports", label: "Page Reports", icon: FaFileAlt },
    { id: "credit-usage", label: "Credit Usage", icon: FaChartBar },
    { id: "credit-holds", label: "Credit Holds", icon: FaClock },
  ];

  const creditStats = [
    {
      title: "Total Available",
      value: "10",
      subtitle: "credits this month",
      icon: FaSync,
      color: "text-brand-theme",
      valueColor: "text-brand-theme",
      bgColor: "bg-brand-theme/5",
    },
    {
      title: "Credits Used",
      value: "2",
      subtitle: "20.0% of available",
      icon: FaChartLine,
      color: "text-green-600",
      valueColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Credit Holds",
      value: "0",
      subtitle: "credits on hold",
      icon: FaClock,
      color: "text-orange-600",
      valueColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Available Credits This Month",
      value: "8",
      subtitle: "remaining for this month",
      icon: FaSync,
      color: "text-green-600",
      valueColor: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  const monthlyHistory = [
    {
      month: "September 2025",
      period: "Sep 15, 2025 - Oct 15, 2025",
      isCurrent: true,
      totalAvailable: "10",
      bonusCredits: "-",
      totalUsed: "2",
      remaining: "8",
      usagePercent: "20.0%",
      heldCredits: "0",
    },
    {
      month: "August 2025",
      period: "Aug 15, 2025 - Sep 15, 2025",
      isCurrent: false,
      totalAvailable: "10",
      bonusCredits: "2",
      totalUsed: "8",
      remaining: "4",
      usagePercent: "66.7%",
      heldCredits: "0",
    },
    {
      month: "July 2025",
      period: "Jul 15, 2025 - Aug 15, 2025",
      isCurrent: false,
      totalAvailable: "10",
      bonusCredits: "-",
      totalUsed: "5",
      remaining: "5",
      usagePercent: "50.0%",
      heldCredits: "1",
    },
  ];

  const getUsageColor = (percent) => {
    const num = parseFloat(percent);
    if (num <= 30) return "text-green-600";
    if (num <= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getUsageDotColor = (percent) => {
    const num = parseFloat(percent);
    if (num <= 30) return "bg-green-500";
    if (num <= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Page Reports Data
  const dateRangeOptions = [
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "Last Year",
    "All Time",
  ];

  const statusOptions = ["All", "Completed", "Processing", "Failed", "Pending"];

  const pageReportsStats = [
    {
      title: "Total Pages Analyzed",
      value: "142",
      change: "+12.5%",
      changeType: "positive",
      icon: FaFileAlt,
      color: "blue",
    },
    {
      title: "Average Performance Score",
      value: "87",
      change: "+3.2%",
      changeType: "positive",
      icon: FaTachometerAlt,
      color: "green",
    },
    {
      title: "Average Load Time",
      value: "1.4s",
      change: "-8.1%",
      changeType: "positive",
      icon: FaClock,
      color: "yellow",
    },
    {
      title: "Success Rate",
      value: "94.3%",
      change: "+2.1%",
      changeType: "positive",
      icon: FaCheckCircle,
      color: "green",
    },
  ];

  const pageReports = [
    {
      id: 1,
      url: "https://example.com/home",
      status: "Completed",
      performanceScore: 92,
      loadTime: "1.2s",
      lcp: "1.8s",
      fid: "50ms",
      cls: "0.05",
      analyzedAt: "2025-01-15 10:30:00",
      createdAt: "2025-01-15 10:25:00",
    },
    {
      id: 2,
      url: "https://example.com/products",
      status: "Completed",
      performanceScore: 88,
      loadTime: "1.5s",
      lcp: "2.1s",
      fid: "45ms",
      cls: "0.08",
      analyzedAt: "2025-01-15 09:15:00",
      createdAt: "2025-01-15 09:10:00",
    },
    {
      id: 3,
      url: "https://example.com/about",
      status: "Processing",
      performanceScore: null,
      loadTime: null,
      lcp: null,
      fid: null,
      cls: null,
      analyzedAt: null,
      createdAt: "2025-01-15 11:00:00",
    },
    {
      id: 4,
      url: "https://example.com/contact",
      status: "Completed",
      performanceScore: 85,
      loadTime: "1.8s",
      lcp: "2.3s",
      fid: "60ms",
      cls: "0.12",
      analyzedAt: "2025-01-14 16:20:00",
      createdAt: "2025-01-14 16:15:00",
    },
    {
      id: 5,
      url: "https://example.com/blog",
      status: "Failed",
      performanceScore: null,
      loadTime: null,
      lcp: null,
      fid: null,
      cls: null,
      analyzedAt: "2025-01-14 14:30:00",
      createdAt: "2025-01-14 14:25:00",
      error: "Timeout error",
    },
    {
      id: 6,
      url: "https://example.com/services",
      status: "Completed",
      performanceScore: 90,
      loadTime: "1.3s",
      lcp: "1.9s",
      fid: "48ms",
      cls: "0.06",
      analyzedAt: "2025-01-14 12:00:00",
      createdAt: "2025-01-14 11:55:00",
    },
    {
      id: 7,
      url: "https://example.com/pricing",
      status: "Completed",
      performanceScore: 79,
      loadTime: "2.1s",
      lcp: "2.8s",
      fid: "75ms",
      cls: "0.15",
      analyzedAt: "2025-01-13 15:45:00",
      createdAt: "2025-01-13 15:40:00",
    },
    {
      id: 8,
      url: "https://example.com/features",
      status: "Pending",
      performanceScore: null,
      loadTime: null,
      lcp: null,
      fid: null,
      cls: null,
      analyzedAt: null,
      createdAt: "2025-01-15 12:30:00",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPerformanceScoreColor = (score) => {
    if (!score) return "text-gray-400";
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getLCPColor = (lcp) => {
    if (!lcp) return "text-gray-400";
    const value = parseFloat(lcp);
    if (value <= 2.5) return "text-green-600";
    if (value <= 4.0) return "text-yellow-600";
    return "text-red-600";
  };

  const getFIDColor = (fid) => {
    if (!fid) return "text-gray-400";
    const value = parseFloat(fid.replace("ms", ""));
    if (value <= 100) return "text-green-600";
    if (value <= 300) return "text-yellow-600";
    return "text-red-600";
  };

  const getCLSColor = (cls) => {
    if (!cls) return "text-gray-400";
    const value = parseFloat(cls);
    if (value <= 0.1) return "text-green-600";
    if (value <= 0.25) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredReports = pageReports.filter((report) => {
    const matchesSearch = report.url
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (report) => {
    // Navigate to detail page with report id
    router.push(`/reports/${report.id}`);
  };

  return (
    <>
      <Head>
        <title>Reports - PageSpeed Performance Tool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SEO
        title="Reports - PageSpeed Performance Tool | Usage Analytics & Reports"
        description="Track and manage your reports with detailed reports and usage analytics. Monitor credit usage, page reports, and performance metrics."
        keywords="reports, usage analytics, credit usage, page reports, performance metrics, PageSpeed reports"
        url="/reports"
      />

      <DashboardLayout>
        <div className="min-h-screen bg-gray-50">
          {/* Header Section */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Reports
                </h1>
                <p className="text-gray-600 text-lg">
                  Track and manage your reports with detailed reports and usage
                  analytics
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Tab Navigation and Refresh Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-brand-theme text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
                <button className="flex items-center space-x-2 px-6 py-3 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-lg hover:shadow-xl">
                  <FaRedo className="h-4 w-4" />
                  <span className="font-medium">Refresh</span>
                </button>
              </div>
            </div>

            {/* Credit Usage Statistics */}
            {activeTab === "credit-usage" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {creditStats.map((stat, index) => (
                    <div
                      key={index}
                      className={`${stat.bgColor} rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-sm font-semibold ${stat.color}`}>
                          {stat.title}
                        </h3>
                        <div
                          className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                        >
                          <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                      </div>
                      <div
                        className={`text-3xl font-bold ${stat.valueColor} mb-1`}
                      >
                        {stat.value}
                      </div>
                      <p className="text-sm text-gray-600">{stat.subtitle}</p>
                    </div>
                  ))}
                </div>

                {/* Monthly Usage History */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Monthly Usage History
                    </h2>
                    <p className="text-gray-600">
                      Detailed breakdown of your credit usage over time
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Month
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Total Available
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Bonus Credits
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Total Used
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Remaining
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Usage %
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Held Credits
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {monthlyHistory.map((row, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-semibold text-gray-900">
                                    {row.month}
                                  </span>
                                  {row.isCurrent && (
                                    <span className="px-2 py-1 text-xs font-medium bg-brand-theme/10 text-brand-theme rounded-full">
                                      Current
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {row.period}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {row.totalAvailable}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {row.bonusCredits}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {row.totalUsed}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {row.remaining}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <FaCircle
                                  className={`h-2 w-2 ${getUsageDotColor(
                                    row.usagePercent
                                  )}`}
                                />
                                <span
                                  className={`text-sm font-medium ${getUsageColor(
                                    row.usagePercent
                                  )}`}
                                >
                                  {row.usagePercent}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {row.heldCredits}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Page Reports Tab */}
            {activeTab === "page-reports" && (
              <>
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {pageReportsStats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            stat.color === "blue"
                              ? "bg-blue-100"
                              : stat.color === "green"
                              ? "bg-green-100"
                              : "bg-yellow-100"
                          }`}
                        >
                          <stat.icon
                            className={`h-6 w-6 ${
                              stat.color === "blue"
                                ? "text-blue-600"
                                : stat.color === "green"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            stat.changeType === "positive"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </h3>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                    </div>
                  ))}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex items-center space-x-2 w-full md:w-auto">
                      <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                      <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="flex-1 md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                      >
                        {dateRangeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center space-x-2 w-full md:w-auto">
                      <FaFilter className="h-4 w-4 text-gray-400" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="flex-1 md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                      >
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative flex-1 w-full md:max-w-md">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by URL..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-sm w-full md:w-auto justify-center">
                      <FaDownload className="h-4 w-4" />
                      <span className="font-medium">Export</span>
                    </button>
                  </div>
                </div>

                {/* Page Reports Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Page Performance Reports
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Page URL
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Performance Score
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Load Time
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Core Web Vitals
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Analyzed At
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredReports.map((report) => (
                          <tr
                            key={report.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                {report.url}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  report.status
                                )}`}
                              >
                                {report.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {report.performanceScore !== null ? (
                                <div className="flex items-center space-x-2">
                                  <FaTachometerAlt
                                    className={`h-4 w-4 ${getPerformanceScoreColor(
                                      report.performanceScore
                                    )}`}
                                  />
                                  <span
                                    className={`text-sm font-bold ${getPerformanceScoreColor(
                                      report.performanceScore
                                    )}`}
                                  >
                                    {report.performanceScore}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    /100
                                  </span>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {report.loadTime ? (
                                <div className="flex items-center space-x-2">
                                  <FaClock className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm font-medium text-gray-900">
                                    {report.loadTime}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {report.lcp && report.fid && report.cls ? (
                                <div className="flex flex-col space-y-1">
                                  <div className="text-xs">
                                    <span className="text-gray-500">LCP: </span>
                                    <span
                                      className={`font-medium ${getLCPColor(
                                        report.lcp
                                      )}`}
                                    >
                                      {report.lcp}
                                    </span>
                                  </div>
                                  <div className="text-xs">
                                    <span className="text-gray-500">FID: </span>
                                    <span
                                      className={`font-medium ${getFIDColor(
                                        report.fid
                                      )}`}
                                    >
                                      {report.fid}
                                    </span>
                                  </div>
                                  <div className="text-xs">
                                    <span className="text-gray-500">CLS: </span>
                                    <span
                                      className={`font-medium ${getCLSColor(
                                        report.cls
                                      )}`}
                                    >
                                      {report.cls}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {report.analyzedAt || "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleViewDetails(report)}
                                className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors"
                              >
                                <FaEye className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredReports.length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaFileAlt className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        No reports found
                      </h3>
                      <p className="text-gray-500 text-lg">
                        {searchQuery || statusFilter !== "All"
                          ? "No reports match your search criteria."
                          : "No page reports available."}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Credit Holds Tab */}
            {activeTab === "credit-holds" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaClock className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Credit Holds
                </h3>
                <p className="text-gray-500 text-lg">
                  Credit hold management and history coming soon
                </p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Reports;
