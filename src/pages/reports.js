import React, { useState } from "react";
import Head from "next/head";
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
} from "react-icons/fa";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("credit-usage");

  const tabs = [
    { id: "credit-usage", label: "Credit Usage", icon: FaChartBar },
    { id: "task-reports", label: "Task Reports", icon: FaFileAlt },
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

  return (
    <>
      <Head>
        <title>Reports - PageSpeed Performance Tool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SEO
        title="Reports - PageSpeed Performance Tool | Usage Analytics & Reports"
        description="Track and manage your reports with detailed reports and usage analytics. Monitor credit usage, task reports, and performance metrics."
        keywords="reports, usage analytics, credit usage, task reports, performance metrics, PageSpeed reports"
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

            {/* Task Reports Tab */}
            {activeTab === "task-reports" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaFileAlt className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Task Reports
                </h3>
                <p className="text-gray-500 text-lg">
                  Detailed task reports and analytics coming soon
                </p>
              </div>
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
