import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import TaskForm from "@/components/dashboard/TaskForm";
import RecentTasks from "@/components/dashboard/RecentTasks";
import NewTaskModal from "@/components/dashboard/NewTaskModal";
import { FaChartBar, FaTasks, FaPlus } from "react-icons/fa";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: FaChartBar },
    { id: "recent", label: "Recent Pages", icon: FaTasks },
    { id: "new", label: "Add Pages", icon: FaPlus },
  ];

  const handleTabClick = (tabId) => {
    if (tabId === "recent") {
      window.location.href = "/tasks-dashboard";
    } else if (tabId === "new") {
      setIsNewTaskModalOpen(true);
    } else {
      setActiveTab(tabId);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />;
      case "recent":
        return <RecentTasks />;
      case "new":
        return <TaskForm />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard - PageSpeed Performance Tool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SEO
        title="Dashboard - PageSpeed Performance Tool | Website Performance Analysis"
        description="Access your PageSpeed performance analysis dashboard. Monitor website performance, view reports, and manage your optimization tasks."
        keywords="PageSpeed dashboard, performance analysis, website optimization, performance monitoring, PageSpeed reports"
        url="/dashboard"
      />

      <DashboardLayout>
        <div className="min-h-screen bg-gray-50">
          {/* Header Section */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Dashboard
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    Here's what's happening with your performance analysis today
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => (window.location.href = "/reports")}
                    className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <FaChartBar className="h-4 w-4" />
                    <span className="font-medium">View Reports</span>
                  </button>
                  <button
                    onClick={() => setIsNewTaskModalOpen(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white rounded-lg hover:from-brand-theme-600 hover:to-brand-theme-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <FaPlus className="h-4 w-4" />
                    <span className="font-medium">Add Pages</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? "border-brand-theme text-brand-theme"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderTabContent()}
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

export default Dashboard;
