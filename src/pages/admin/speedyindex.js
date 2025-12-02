import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import { FaShieldAlt, FaSearch, FaTimes } from "react-icons/fa";

const AdminSpeedyIndex = () => {
  const [activeTab, setActiveTab] = useState("checker");
  const [taskIds, setTaskIds] = useState("");
  const [taskId, setTaskId] = useState("");

  const handleFetchStatus = () => {
    console.log("Fetching status for task IDs:", taskIds);
    // Handle fetch status logic here
  };

  const handleClearTaskIds = () => {
    setTaskIds("");
  };

  const handleFetchReport = () => {
    console.log("Fetching report for task ID:", taskId);
    // Handle fetch report logic here
  };

  const handleClearTaskId = () => {
    setTaskId("");
  };

  return (
    <>
      <Head>
        <title>SpeedyIndex - Admin Dashboard</title>
        <meta
          name="description"
          content="SpeedyIndex checker and indexer tools"
        />
      </Head>
      <SEO
        title="SpeedyIndex - Admin Dashboard"
        description="SpeedyIndex checker and indexer tools"
      />

      <AdminDashboardLayout>
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    SpeedyIndex
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Checker and Indexer tools
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-8">
            {/* Tabs */}
            <div className="mb-8">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                <button
                  onClick={() => setActiveTab("checker")}
                  className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "checker"
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Checker
                </button>
                <button
                  onClick={() => setActiveTab("indexer")}
                  className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "indexer"
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Indexer
                </button>
              </div>
            </div>

            {/* Check Task Status Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Check Task Status
              </h2>
              <div className="space-y-4">
                <div>
                  <textarea
                    value={taskIds}
                    onChange={(e) => setTaskIds(e.target.value)}
                    placeholder="Enter Task IDs (one per line or comma separated)"
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme resize-y"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleFetchStatus}
                    className="px-6 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors font-medium"
                  >
                    Fetch Status
                  </button>
                  <button
                    onClick={handleClearTaskIds}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Full Report Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Full Report
              </h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                    placeholder="Enter Task ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleFetchReport}
                    className="px-6 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors font-medium"
                  >
                    Fetch Report
                  </button>
                  <button
                    onClick={handleClearTaskId}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminDashboardLayout>
    </>
  );
};

export default AdminSpeedyIndex;
