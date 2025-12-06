import React, { useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaEye,
  FaTrash,
  FaDownload,
  FaFilter,
  FaPlus,
  FaTachometerAlt,
  FaRocket,
} from "react-icons/fa";

const RecentTasks = () => {
  const [filter, setFilter] = useState("all");

  const tasks = [
    {
      id: 1,
      url: "https://example-store.com",
      status: "completed",
      performanceScore: 85,
      loadTime: "1.8s",
      lcp: "2.1s",
      fid: "95ms",
      cls: "0.08",
      date: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      url: "https://myblog.com",
      status: "processing",
      performanceScore: null,
      loadTime: null,
      lcp: null,
      fid: null,
      cls: null,
      date: "2024-01-15T08:15:00Z",
    },
    {
      id: 3,
      url: "https://portfolio.dev",
      status: "completed",
      performanceScore: 92,
      loadTime: "1.2s",
      lcp: "1.5s",
      fid: "45ms",
      cls: "0.03",
      date: "2024-01-15T06:45:00Z",
    },
    {
      id: 4,
      url: "https://news-site.com",
      status: "failed",
      performanceScore: null,
      loadTime: null,
      lcp: null,
      fid: null,
      cls: null,
      date: "2024-01-15T04:20:00Z",
    },
    {
      id: 5,
      url: "https://corporate.com",
      status: "completed",
      performanceScore: 78,
      loadTime: "2.5s",
      lcp: "3.2s",
      fid: "150ms",
      cls: "0.15",
      date: "2024-01-14T16:30:00Z",
    },
    {
      id: 6,
      url: "https://landing.example.com",
      status: "completed",
      performanceScore: 95,
      loadTime: "0.9s",
      lcp: "1.1s",
      fid: "30ms",
      cls: "0.02",
      date: "2024-01-14T14:15:00Z",
    },
  ];

  const filters = [
    { id: "all", label: "All Pages", count: tasks.length },
    {
      id: "completed",
      label: "Completed",
      count: tasks.filter((t) => t.status === "completed").length,
    },
    {
      id: "processing",
      label: "Processing",
      count: tasks.filter((t) => t.status === "processing").length,
    },
    {
      id: "failed",
      label: "Failed",
      count: tasks.filter((t) => t.status === "failed").length,
    },
  ];

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

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="h-4 w-4 text-green-600" />;
      case "processing":
        return <FaClock className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <FaExclamationTriangle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Recent Pages</h2>
          <p className="text-gray-600 mt-2 text-lg">
            View and manage your analyzed pages with performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md">
            <FaDownload className="h-4 w-4" />
            <span className="font-medium">Export</span>
          </button>
          <button 
            onClick={() => window.location.href = "/tasks-dashboard"}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white rounded-lg hover:from-brand-theme-600 hover:to-brand-theme-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <FaPlus className="h-4 w-4" />
            <span className="font-medium">Add Pages</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-6 mb-6">
        <div className="flex items-center space-x-2">
          <FaFilter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">Filter:</span>
        </div>
        <div className="flex space-x-2">
          {filters.map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === filterOption.id
                  ? "bg-brand-theme text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm"
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
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
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <FaRocket className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-900 break-all">
                        {task.url}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(task.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {getStatusText(task.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
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
                  <td className="px-6 py-5 whitespace-nowrap">
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
                  <td className="px-6 py-5">
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
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(task.date)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-brand-theme hover:text-brand-theme-600 p-2 rounded-lg hover:bg-brand-theme/10 transition-colors">
                        <FaEye className="h-4 w-4" />
                      </button>
                      {task.status === "completed" && (
                        <button className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-100 transition-colors">
                          <FaDownload className="h-4 w-4" />
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-100 transition-colors">
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTachometerAlt className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No pages found
            </h3>
            <p className="text-gray-500 text-lg">
              {filter === "all"
                ? "You haven't analyzed any pages yet."
                : `No ${filter} pages found.`}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredTasks.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm text-gray-700">
            Showing <span className="font-semibold">1</span> to{" "}
            <span className="font-semibold">{filteredTasks.length}</span> of{" "}
            <span className="font-semibold">{filteredTasks.length}</span>{" "}
            results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
              Previous
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-brand-theme border border-brand-theme rounded-lg shadow-sm">
              1
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTasks;
