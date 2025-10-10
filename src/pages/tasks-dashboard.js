import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  FaRocket,
  FaCheckCircle,
  FaSearch,
  FaFilter,
  FaDownload,
  FaArrowRight,
  FaCalendarAlt,
  FaBolt,
} from "react-icons/fa";

const TasksDashboard = () => {
  const [activeTab, setActiveTab] = useState("indexer");
  const [searchQuery, setSearchQuery] = useState("");

  const tasks = [
    {
      id: "ff69dg8os",
      name: "Indexer Task #ff69dg8os",
      status: "completed",
      urls: { completed: 0, total: 1, processed: 1 },
      progress: 0,
      credits: { used: 0, total: 1 },
      created: "25 days ago",
      type: "indexer",
    },
    {
      id: "y6f4bxo3n",
      name: "Indexer Task #y6f4bxo3n",
      status: "completed",
      urls: { completed: 1, total: 1, processed: 1 },
      progress: 100,
      credits: { used: 1, total: 1 },
      created: "25 days ago",
      type: "indexer",
    },
    {
      id: "a1b2c3d4e",
      name: "Indexer Task #a1b2c3d4e",
      status: "processing",
      urls: { completed: 2, total: 5, processed: 3 },
      progress: 60,
      credits: { used: 2, total: 5 },
      created: "2 days ago",
      type: "indexer",
    },
    {
      id: "f5g6h7i8j",
      name: "Indexer Task #f5g6h7i8j",
      status: "failed",
      urls: { completed: 0, total: 3, processed: 0 },
      progress: 0,
      credits: { used: 0, total: 3 },
      created: "1 week ago",
      type: "indexer",
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

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "indexer") {
      return task.type === "indexer";
    }
    return task.type === "checker";
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        description="Track and manage your indexing and checking tasks with real-time updates. Monitor progress, credits, and task status."
        keywords="tasks dashboard, task management, indexing tasks, checking tasks, PageSpeed tasks"
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
                  Track and manage your indexing and checking tasks with
                  real-time updates
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Task Type Navigation and Create Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setActiveTab("indexer")}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                      activeTab === "indexer"
                        ? "bg-brand-theme/10 text-brand-theme border-2 border-brand-theme shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <FaBolt className="h-4 w-4" />
                    <span>Indexer Tasks</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("checker")}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                      activeTab === "checker"
                        ? "bg-brand-theme/10 text-brand-theme border-2 border-brand-theme shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <FaCheckCircle className="h-4 w-4" />
                    <span>Checker Tasks</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 px-6 py-3 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-lg hover:shadow-xl">
                  <span className="text-lg">+</span>
                  <span className="font-medium">Create task</span>
                </button>
              </div>
            </div>

            {/* Section Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {activeTab === "indexer" ? "Indexer Tasks" : "Checker Tasks"}
              </h2>
              <p className="text-gray-600">
                Track your {activeTab === "indexer" ? "indexing" : "checking"}{" "}
                tasks and their progress
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search by task title"
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
                        Task Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        URLs
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Credits
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <FaRocket className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {task.name}
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
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {task.urls.completed}/{task.urls.total}
                            </div>
                            <div className="text-xs text-gray-500">
                              {task.urls.processed} processed
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-brand-theme h-2 rounded-full transition-all duration-300"
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {task.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-yellow-600">
                            {task.credits.used} (
                            {task.credits.used === 0 ? "total" : "used"})
                          </span>
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
                    <FaRocket className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    No tasks found
                  </h3>
                  <p className="text-gray-500 text-lg">
                    {searchQuery
                      ? "No tasks match your search criteria."
                      : `You haven't created any ${activeTab} tasks yet.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default TasksDashboard;
