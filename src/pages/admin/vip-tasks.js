import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import {
  FaChartBar,
  FaClock,
  FaWaveSquare,
  FaRedo,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCircle,
} from "react-icons/fa";

const AdminVipTasks = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "failed", label: "Failed Tasks" },
    { id: "delayed", label: "Delayed Jobs" },
    { id: "queue", label: "Queue Status" },
    { id: "health", label: "Health Monitor" },
  ];

  const summaryStats = [
    {
      title: "All VIP tasks created",
      value: "6",
      color: "text-gray-900",
    },
    {
      title: "Successfully processed",
      value: "4",
      color: "text-green-600",
    },
    {
      title: "Tasks with errors",
      value: "0",
      color: "text-red-600",
    },
    {
      title: "Completion rate",
      value: "66.7%",
      color: "text-brand-theme",
    },
  ];

  const processingStatus = [
    {
      label: "Pending",
      value: "0",
      badge: "green",
    },
    {
      label: "Processing",
      value: "2",
      badge: null,
    },
    {
      label: "Average Processing Time",
      value: "12610.0 min",
      badge: null,
    },
  ];

  const queueStatus = [
    {
      label: "Waiting",
      value: "0",
      badge: "green",
    },
    {
      label: "Delayed",
      value: "0",
      badge: "green",
    },
    {
      label: "Pending (Waiting + Delayed)",
      value: "0",
      badge: null,
    },
    {
      label: "Active",
      value: "0",
      badge: null,
    },
    {
      label: "Completed",
      value: "7",
      badge: "blue",
    },
    {
      label: "Failed",
      value: "0",
      badge: "red",
    },
  ];

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "green":
        return "text-green-500";
      case "blue":
        return "text-brand-theme";
      case "red":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <>
      <Head>
        <title>VIP Task Management - Admin Dashboard</title>
        <meta
          name="description"
          content="Monitor and manage VIP task processing and retry failed jobs"
        />
      </Head>
      <SEO
        title="VIP Task Management - Admin Dashboard"
        description="Monitor and manage VIP task processing and retry failed jobs"
      />

      <AdminDashboardLayout>
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    VIP Task Management
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Monitor and manage VIP task processing and retry failed jobs
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaRedo className="h-4 w-4" />
                    <span className="font-medium">Refresh</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-8">
            {/* Tabs */}
            <div className="mb-8">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {summaryStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-center">
                    <p className={`text-3xl font-bold ${stat.color} mb-2`}>
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Status Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Processing Status Panel */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-6">
                  <FaClock className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Processing Status
                  </h3>
                </div>
                <div className="space-y-4">
                  {processingStatus.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <FaCircle
                            className={`h-2 w-2 ${getBadgeColor(item.badge)}`}
                          />
                        )}
                        <span className="text-sm text-gray-600">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Queue Status Panel */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-6">
                  <FaWaveSquare className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Queue Status
                  </h3>
                </div>
                <div className="space-y-4">
                  {queueStatus.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <FaCircle
                            className={`h-2 w-2 ${getBadgeColor(item.badge)}`}
                          />
                        )}
                        <span className="text-sm text-gray-600">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminDashboardLayout>
    </>
  );
};

export default AdminVipTasks;
