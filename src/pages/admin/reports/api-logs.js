import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import {
  FaCode,
  FaFilter,
  FaSearch,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaDownload,
  FaEye,
  FaClock,
} from "react-icons/fa";

const AdminAPILogs = () => {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const dateRangeOptions = [
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "Last Year",
    "All Time",
  ];

  const statusOptions = ["All", "200", "400", "401", "403", "404", "500"];
  const methodOptions = ["All", "GET", "POST", "PUT", "DELETE", "PATCH"];

  // Sample API logs data
  const apiLogs = [
    {
      id: 1,
      timestamp: "2025-01-15 14:30:25",
      method: "GET",
      endpoint: "/api/pagespeed/analyze",
      statusCode: 200,
      statusText: "OK",
      responseTime: "245ms",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0...",
      userId: "user_123",
    },
    {
      id: 2,
      timestamp: "2025-01-15 14:28:10",
      method: "POST",
      endpoint: "/api/pagespeed/create-task",
      statusCode: 201,
      statusText: "Created",
      responseTime: "180ms",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0...",
      userId: "user_456",
    },
    {
      id: 3,
      timestamp: "2025-01-15 14:25:45",
      method: "GET",
      endpoint: "/api/pagespeed/tasks",
      statusCode: 401,
      statusText: "Unauthorized",
      responseTime: "12ms",
      ipAddress: "192.168.1.102",
      userAgent: "Mozilla/5.0...",
      userId: null,
    },
    {
      id: 4,
      timestamp: "2025-01-15 14:20:30",
      method: "GET",
      endpoint: "/api/pagespeed/results/12345",
      statusCode: 404,
      statusText: "Not Found",
      responseTime: "8ms",
      ipAddress: "192.168.1.103",
      userAgent: "Mozilla/5.0...",
      userId: "user_789",
    },
    {
      id: 5,
      timestamp: "2025-01-15 14:15:20",
      method: "POST",
      endpoint: "/api/pagespeed/analyze",
      statusCode: 500,
      statusText: "Internal Server Error",
      responseTime: "520ms",
      ipAddress: "192.168.1.104",
      userAgent: "Mozilla/5.0...",
      userId: "user_321",
    },
    {
      id: 6,
      timestamp: "2025-01-15 14:10:15",
      method: "GET",
      endpoint: "/api/pagespeed/status",
      statusCode: 200,
      statusText: "OK",
      responseTime: "95ms",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0...",
      userId: "user_654",
    },
    {
      id: 7,
      timestamp: "2025-01-15 14:05:00",
      method: "PUT",
      endpoint: "/api/pagespeed/tasks/12345",
      statusCode: 403,
      statusText: "Forbidden",
      responseTime: "15ms",
      ipAddress: "192.168.1.106",
      userAgent: "Mozilla/5.0...",
      userId: "user_987",
    },
    {
      id: 8,
      timestamp: "2025-01-15 14:00:30",
      method: "DELETE",
      endpoint: "/api/pagespeed/tasks/12345",
      statusCode: 200,
      statusText: "OK",
      responseTime: "120ms",
      ipAddress: "192.168.1.107",
      userAgent: "Mozilla/5.0...",
      userId: "user_111",
    },
  ];

  const [selectedLog, setSelectedLog] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const getStatusColor = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) {
      return "bg-green-100 text-green-800";
    } else if (statusCode >= 400 && statusCode < 500) {
      return "bg-yellow-100 text-yellow-800";
    } else if (statusCode >= 500) {
      return "bg-red-100 text-red-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) {
      return FaCheckCircle;
    } else if (statusCode >= 400 && statusCode < 500) {
      return FaExclamationTriangle;
    } else if (statusCode >= 500) {
      return FaTimesCircle;
    }
    return FaClock;
  };

  const getMethodColor = (method) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800";
      case "POST":
        return "bg-green-100 text-green-800";
      case "PUT":
        return "bg-yellow-100 text-yellow-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      case "PATCH":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLogs = apiLogs.filter((log) => {
    const matchesSearch =
      log.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.includes(searchQuery) ||
      (log.userId && log.userId.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus =
      statusFilter === "All" || log.statusCode.toString() === statusFilter;
    const matchesMethod =
      methodFilter === "All" || log.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedLog(null);
  };

  // Calculate statistics
  const totalRequests = apiLogs.length;
  const successCount = apiLogs.filter(
    (log) => log.statusCode >= 200 && log.statusCode < 300
  ).length;
  const errorCount = apiLogs.filter((log) => log.statusCode >= 400).length;
  const avgResponseTime =
    apiLogs.reduce((sum, log) => {
      const time = parseFloat(log.responseTime.replace("ms", ""));
      return sum + time;
    }, 0) / apiLogs.length;

  return (
    <>
      <Head>
        <title>API Logs - Admin Reports</title>
        <meta
          name="description"
          content="View API request logs and monitoring in the admin dashboard"
        />
      </Head>
      <SEO
        title="API Logs - Admin Reports"
        description="View API request logs and monitoring in the admin dashboard"
      />

      <AdminDashboardLayout>
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    API Logs
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Monitor and analyze API request logs
                  </p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-sm">
                  <FaDownload className="h-4 w-4" />
                  <span className="font-medium">Export Logs</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaCode className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {totalRequests}
                </h3>
                <p className="text-sm text-gray-600">Total Requests</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {successCount}
                </h3>
                <p className="text-sm text-gray-600">Successful</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <FaExclamationTriangle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {errorCount}
                </h3>
                <p className="text-sm text-gray-600">Errors</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <FaClock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {avgResponseTime.toFixed(0)}ms
                </h3>
                <p className="text-sm text-gray-600">Avg Response Time</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
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
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        Status: {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <FaFilter className="h-4 w-4 text-gray-400" />
                  <select
                    value={methodFilter}
                    onChange={(e) => setMethodFilter(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  >
                    {methodOptions.map((option) => (
                      <option key={option} value={option}>
                        Method: {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search endpoint, IP, user..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  />
                </div>
              </div>
            </div>

            {/* API Logs Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Request Logs
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Endpoint
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Response Time
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        IP Address
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        User ID
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLogs.map((log) => {
                      const StatusIcon = getStatusIcon(log.statusCode);
                      return (
                        <tr
                          key={log.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.timestamp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(
                                log.method
                              )}`}
                            >
                              {log.method}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                              {log.endpoint}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <StatusIcon
                                className={`h-4 w-4 ${
                                  log.statusCode >= 200 &&
                                  log.statusCode < 300
                                    ? "text-green-600"
                                    : log.statusCode >= 400 &&
                                      log.statusCode < 500
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }`}
                              />
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                                  log.statusCode
                                )}`}
                              >
                                {log.statusCode} {log.statusText}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.responseTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {log.ipAddress}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {log.userId || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleViewDetails(log)}
                              className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors"
                            >
                              <FaEye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredLogs.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCode className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    No logs found
                  </h3>
                  <p className="text-gray-500 text-lg">
                    {searchQuery ||
                    statusFilter !== "All" ||
                    methodFilter !== "All"
                      ? "No logs match your search criteria."
                      : "No API logs available."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminDashboardLayout>

      {/* Log Detail Modal */}
      {isDetailModalOpen && selectedLog && (
        <LogDetailModal
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          log={selectedLog}
        />
      )}
    </>
  );
};

// Log Detail Modal Component
const LogDetailModal = ({ isOpen, onClose, log }) => {
  if (!isOpen || !log) return null;

  const getStatusColor = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) {
      return "bg-green-100 text-green-800";
    } else if (statusCode >= 400 && statusCode < 500) {
      return "bg-yellow-100 text-yellow-800";
    } else if (statusCode >= 500) {
      return "bg-red-100 text-red-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  const getMethodColor = (method) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800";
      case "POST":
        return "bg-green-100 text-green-800";
      case "PUT":
        return "bg-yellow-100 text-yellow-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      case "PATCH":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-white px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                API Log Details
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimesCircle className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timestamp
                  </label>
                  <div className="text-sm text-gray-900">{log.timestamp}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Response Time
                  </label>
                  <div className="text-sm text-gray-900">{log.responseTime}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    HTTP Method
                  </label>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${getMethodColor(
                      log.method
                    )}`}
                  >
                    {log.method}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status Code
                  </label>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                      log.statusCode
                    )}`}
                  >
                    {log.statusCode} {log.statusText}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endpoint
                </label>
                <div className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                  {log.endpoint}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IP Address
                </label>
                <div className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                  {log.ipAddress}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User ID
                </label>
                <div className="text-sm text-gray-900">
                  {log.userId || "Anonymous"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Agent
                </label>
                <div className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded break-all">
                  {log.userAgent}
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAPILogs;

