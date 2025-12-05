import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import {
  FaChartBar,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaTimesCircle,
  FaFilter,
  FaDownload,
  FaCalendarAlt,
  FaSearch,
} from "react-icons/fa";

const AdminTaskStatusOverview = () => {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const dateRangeOptions = [
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "Last Year",
    "All Time",
  ];

  const statusOptions = ["All", "Completed", "Processing", "Failed", "Pending"];

  // Sample statistics data
  const stats = [
    {
      title: "Total Tasks",
      value: "45,998",
      change: "+12.5%",
      changeType: "positive",
      icon: FaChartBar,
      color: "blue",
    },
    {
      title: "Completed",
      value: "42,150",
      change: "+8.2%",
      changeType: "positive",
      icon: FaCheckCircle,
      color: "green",
    },
    {
      title: "Processing",
      value: "2,450",
      change: "+15.3%",
      changeType: "positive",
      icon: FaClock,
      color: "yellow",
    },
    {
      title: "Failed",
      value: "1,398",
      change: "-5.1%",
      changeType: "negative",
      icon: FaExclamationTriangle,
      color: "red",
    },
  ];

  // Sample task breakdown data
  const taskBreakdown = [
    {
      id: 1,
      url: "https://example.com/page1",
      status: "Completed",
      performanceScore: 92,
      loadTime: "1.2s",
      createdAt: "2025-01-15 10:30:00",
      completedAt: "2025-01-15 10:31:15",
      duration: "1m 15s",
    },
    {
      id: 2,
      url: "https://example.com/page2",
      status: "Processing",
      performanceScore: null,
      loadTime: null,
      createdAt: "2025-01-15 11:00:00",
      completedAt: null,
      duration: "Processing...",
    },
    {
      id: 3,
      url: "https://example.com/page3",
      status: "Failed",
      performanceScore: null,
      loadTime: null,
      createdAt: "2025-01-15 09:15:00",
      completedAt: "2025-01-15 09:16:30",
      duration: "1m 30s",
      error: "Timeout error",
    },
    {
      id: 4,
      url: "https://example.com/page4",
      status: "Completed",
      performanceScore: 87,
      loadTime: "1.5s",
      createdAt: "2025-01-15 08:00:00",
      completedAt: "2025-01-15 08:01:20",
      duration: "1m 20s",
    },
    {
      id: 5,
      url: "https://example.com/page5",
      status: "Pending",
      performanceScore: null,
      loadTime: null,
      createdAt: "2025-01-15 12:00:00",
      completedAt: null,
      duration: "Pending...",
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

  const filteredTasks = taskBreakdown.filter((task) => {
    const matchesSearch = task.url
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate percentages for status distribution
  const totalTasks = stats[0].value.replace(/,/g, "");
  const completedCount = stats[1].value.replace(/,/g, "");
  const processingCount = stats[2].value.replace(/,/g, "");
  const failedCount = stats[3].value.replace(/,/g, "");

  const completedPercentage = ((completedCount / totalTasks) * 100).toFixed(1);
  const processingPercentage = ((processingCount / totalTasks) * 100).toFixed(1);
  const failedPercentage = ((failedCount / totalTasks) * 100).toFixed(1);

  return (
    <>
      <Head>
        <title>Task Status Overview - Admin Reports</title>
        <meta
          name="description"
          content="View task status overview and analytics in the admin dashboard"
        />
      </Head>
      <SEO
        title="Task Status Overview - Admin Reports"
        description="View task status overview and analytics in the admin dashboard"
      />

      <AdminDashboardLayout>
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Task Status Overview
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Monitor and analyze task execution status
                  </p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-sm">
                  <FaDownload className="h-4 w-4" />
                  <span className="font-medium">Export Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-6">
            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  >
                    {dateRangeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <FaFilter className="h-4 w-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative flex-1 max-w-md">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by URL..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  />
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        stat.color === "blue"
                          ? "bg-blue-100"
                          : stat.color === "green"
                          ? "bg-green-100"
                          : stat.color === "yellow"
                          ? "bg-yellow-100"
                          : "bg-red-100"
                      }`}
                    >
                      <stat.icon
                        className={`h-6 w-6 ${
                          stat.color === "blue"
                            ? "text-blue-600"
                            : stat.color === "green"
                            ? "text-green-600"
                            : stat.color === "yellow"
                            ? "text-yellow-600"
                            : "text-red-600"
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

            {/* Status Distribution Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Status Distribution
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Completed
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {completedPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full"
                      style={{ width: `${completedPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Processing
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {processingPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-yellow-600 h-3 rounded-full"
                      style={{ width: `${processingPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Failed
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {failedPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-red-600 h-3 rounded-full"
                      style={{ width: `${failedPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Breakdown Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Tasks
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
                        Created At
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTasks.map((task) => (
                      <tr
                        key={task.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {task.url}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {task.performanceScore ? (
                            <span
                              className={`text-sm font-semibold ${getPerformanceScoreColor(
                                task.performanceScore
                              )}`}
                            >
                              {task.performanceScore}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {task.loadTime || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {task.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {task.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredTasks.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaChartBar className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    No tasks found
                  </h3>
                  <p className="text-gray-500 text-lg">
                    {searchQuery || statusFilter !== "All"
                      ? "No tasks match your search criteria."
                      : "No tasks available."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminDashboardLayout>
    </>
  );
};

export default AdminTaskStatusOverview;

