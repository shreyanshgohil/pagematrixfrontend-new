import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NewTaskModal from "@/components/dashboard/NewTaskModal";
import {
  FaRocket,
  FaSearch,
  FaFilter,
  FaDownload,
  FaArrowRight,
  FaCalendarAlt,
  FaPlus,
  FaTachometerAlt,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

const TasksDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const tasks = [
    {
      id: "ff69dg8os",
      url: "https://example.com/home",
      status: "completed",
      performanceScore: 92,
      loadTime: "1.2s",
      lcp: "1.8s",
      fid: "45ms",
      cls: "0.05",
      created: "25 days ago",
    },
    {
      id: "y6f4bxo3n",
      url: "https://example.com/about",
      status: "completed",
      performanceScore: 78,
      loadTime: "2.1s",
      lcp: "2.5s",
      fid: "120ms",
      cls: "0.12",
      created: "25 days ago",
    },
    {
      id: "a1b2c3d4e",
      url: "https://example.com/products",
      status: "processing",
      performanceScore: null,
      loadTime: null,
      lcp: null,
      fid: null,
      cls: null,
      created: "2 days ago",
    },
    {
      id: "f5g6h7i8j",
      url: "https://example.com/contact",
      status: "failed",
      performanceScore: null,
      loadTime: null,
      lcp: null,
      fid: null,
      cls: null,
      created: "1 week ago",
    },
    {
      id: "x9y8z7w6v",
      url: "https://example.com/blog",
      status: "completed",
      performanceScore: 65,
      loadTime: "3.5s",
      lcp: "4.2s",
      fid: "200ms",
      cls: "0.25",
      created: "3 days ago",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "processing":
        return "Processing";
      case "failed":
        return "Failed";
      default:
        return "Unknown";
    }
  };

  const getPerformanceScoreColor = (score) => {
    if (!score) return "text-gray-400";
    if (score >= 90) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getVitalColor = (value, type) => {
    if (!value) return "text-gray-400";
    
    // Extract numeric value (handles "1.8s", "45ms", "0.05" formats)
    const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ""));
    
    if (type === "lcp") {
      // LCP: Good < 2.5s, Needs Improvement 2.5-4s, Poor > 4s
      if (numericValue < 2.5) return "text-green-600";
      if (numericValue < 4.0) return "text-yellow-600";
      return "text-red-600";
    }
    
    if (type === "fid") {
      // FID: Good < 100ms, Needs Improvement 100-300ms, Poor > 300ms
      if (numericValue < 100) return "text-green-600";
      if (numericValue < 300) return "text-yellow-600";
      return "text-red-600";
    }
    
    if (type === "cls") {
      // CLS: Good < 0.1, Needs Improvement 0.1-0.25, Poor > 0.25
      if (numericValue < 0.1) return "text-green-600";
      if (numericValue < 0.25) return "text-yellow-600";
      return "text-red-600";
    }
    
    return "text-gray-600";
  };

  const searchedTasks = tasks.filter((task) =>
    task.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Tasks Dashboard - PageSpeed Performance Tool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SEO
        title="Tasks Dashboard - PageSpeed Performance Tool | Task Management"
        description="Track and manage your tasks with real-time updates. Monitor progress, credits, and task status."
        keywords="tasks dashboard, task management, PageSpeed tasks"
        url="/tasks-dashboard"
      />

      <DashboardLayout>
        <div className="min-h-screen bg-gray-50">
          {/* Header Section */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Tasks Dashboard
                </h1>
                <p className="text-gray-600 text-lg">
                  Track and manage your tasks with real-time updates
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Section Header with Create Button */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Tasks
                </h2>
                <p className="text-gray-600">
                  View performance metrics for your analyzed pages
                </p>
                </div>
                <button
                  onClick={() => setIsNewTaskModalOpen(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-lg hover:shadow-xl"
                >
                  <FaPlus className="h-4 w-4" />
                  <span className="font-medium">Create task</span>
                </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search by URL"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <FaFilter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Tasks Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                        Analyzed
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchedTasks.map((task) => (
                      <tr
                        key={task.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <FaRocket className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-900 break-all">
                              {task.url}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              task.status
                            )}`}
                          >
                            {getStatusText(task.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {task.performanceScore !== null ? (
                            <div className="flex items-center space-x-2">
                              <FaTachometerAlt
                                className={`h-4 w-4 ${getPerformanceScoreColor(
                                  task.performanceScore
                                )}`}
                              />
                              <span
                                className={`text-sm font-bold ${getPerformanceScoreColor(
                                  task.performanceScore
                                )}`}
                              >
                                {task.performanceScore}
                              </span>
                              <span className="text-xs text-gray-500">/100</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {task.loadTime ? (
                            <div className="flex items-center space-x-2">
                              <FaClock className="h-4 w-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900">
                                {task.loadTime}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {task.status === "completed" ? (
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-semibold text-gray-600 w-8">
                                  LCP:
                                </span>
                                <span
                                  className={`text-xs font-medium ${getVitalColor(
                                    task.lcp,
                                    "lcp"
                                  )}`}
                                >
                                  {task.lcp}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-semibold text-gray-600 w-8">
                                  FID:
                                </span>
                                <span
                                  className={`text-xs font-medium ${getVitalColor(
                                    task.fid,
                                    "fid"
                                  )}`}
                                >
                                  {task.fid}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-semibold text-gray-600 w-8">
                                  CLS:
                                </span>
                                <span
                                  className={`text-xs font-medium ${getVitalColor(
                                    task.cls,
                                    "cls"
                                  )}`}
                                >
                                  {task.cls}
                          </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              {task.created}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                              <FaDownload className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-full border border-brand-theme transition-colors">
                              <FaArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {searchedTasks.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaTachometerAlt className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    No pages found
                  </h3>
                  <p className="text-gray-500 text-lg">
                    {searchQuery
                      ? "No pages match your search criteria."
                      : "You haven't analyzed any pages yet."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
      />
    </>
  );
};

export default TasksDashboard;
