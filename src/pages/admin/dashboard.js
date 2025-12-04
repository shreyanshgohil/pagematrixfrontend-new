import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import {
  FaUsers,
  FaFileAlt,
  FaDollarSign,
  FaChartLine,
  FaFilter,
  FaEdit,
  FaBolt,
  FaExclamationTriangle,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("Last 30 Days");

  const stats = [
    {
      title: "Total Users",
      value: "36",
      description: "All registered users",
      icon: FaUsers,
    },
    {
      title: "Subscribed Users",
      value: "1",
      description: "Active subscriptions",
      icon: FaFileAlt,
    },
    {
      title: "Total Revenue",
      value: "$0.00",
      description: "Lifetime revenue",
      icon: FaDollarSign,
    },
    {
      title: "Conversion Rate",
      value: "2.8%",
      description: "Users to subscribers",
      icon: FaChartLine,
    },
  ];

  const pageAnalysisStats = {
    totalAnalyzed: 45998,
    thisMonth: 48541,
  };

  const getStatCardColor = (color) => {
    // Use theme color for all icons
    return "bg-brand-theme";
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - PageSpeed</title>
        <meta
          name="description"
          content="Admin dashboard for PageSpeed application"
        />
      </Head>
      <SEO
        title="Admin Dashboard"
        description="Admin dashboard for PageSpeed application"
      />

      <AdminDashboardLayout>
        <div className="bg-white">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="mt-2 text-gray-600">
                  Overview of your application's performance
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <FaFilter className="h-4 w-4 text-gray-400" />
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  >
                    <option value="Last 7 Days">Last 7 Days</option>
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="Last 90 Days">Last 90 Days</option>
                    <option value="Last Year">Last Year</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-8">
            {/* Overview Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mb-2">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-500">
                        {stat.description}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${getStatCardColor(
                        stat.color
                      )}`}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <select className="text-xs text-gray-500 border-none bg-transparent focus:ring-0">
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Page Analysis Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Page Analysis Statistics
                </h3>
                <FaBolt className="h-5 w-5 text-brand-theme" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {pageAnalysisStats.totalAnalyzed.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Total Pages Analyzed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {pageAnalysisStats.thisMonth.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Pages This Month</p>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Payment History
                  </h3>
                  <p className="text-sm text-gray-600">
                    Revenue trends over time
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaFilter className="h-4 w-4 text-gray-400" />
                  <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-brand-theme focus:border-brand-theme">
                    <option>Last 30 Days</option>
                  </select>
                </div>
              </div>

              {/* Empty State */}
              <div className="flex flex-col items-center justify-center py-12">
                <FaExclamationTriangle className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500 text-center">
                  No payment data available. Try adjusting your filter settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AdminDashboardLayout>
    </>
  );
};

export default AdminDashboard;
