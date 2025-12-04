import React from "react";
import {
  FaTachometerAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaChartLine,
  FaGlobe,
} from "react-icons/fa";

const DashboardOverview = () => {
  const stats = [
    {
      name: "Total Pages Analyzed",
      value: "1,247",
      change: "+12% from last month",
      changeType: "positive",
      icon: FaTachometerAlt,
      color: "from-brand-theme to-brand-theme-600",
      bgColor: "bg-brand-theme/5",
      iconBg: "bg-brand-theme/10",
    },
    {
      name: "Completed Analysis",
      value: "1,189",
      change: "+8% from last month",
      changeType: "positive",
      icon: FaCheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      name: "Processing",
      value: "58",
      change: "-3% from last month",
      changeType: "negative",
      icon: FaClock,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100",
    },
    {
      name: "Failed Analysis",
      value: "12",
      change: "+2% from last month",
      changeType: "negative",
      icon: FaExclamationTriangle,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
    },
  ];

  const recentTasks = [
    {
      id: 1,
      url: "https://example-store.com",
      status: "completed",
      performanceScore: 85,
      loadTime: "1.8s",
      date: "2 hours ago",
    },
    {
      id: 2,
      url: "https://myblog.com",
      status: "processing",
      performanceScore: null,
      loadTime: null,
      date: "4 hours ago",
    },
    {
      id: 3,
      url: "https://portfolio.dev",
      status: "completed",
      performanceScore: 92,
      loadTime: "1.2s",
      date: "6 hours ago",
    },
    {
      id: 4,
      url: "https://news-site.com",
      status: "failed",
      performanceScore: null,
      loadTime: null,
      date: "8 hours ago",
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

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </p>
                <p
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
              <div
                className={`w-14 h-14 ${stat.iconBg} rounded-xl flex items-center justify-center shadow-sm`}
              >
                <stat.icon
                  className={`h-7 w-7 ${
                    stat.changeType === "positive" &&
                    stat.name === "Total Analysis"
                      ? "text-brand-theme"
                      : stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.name === "Pending Tasks"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Performance Trends
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              <FaChartLine className="h-4 w-4" />
              <span>Last 30 days</span>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-theme/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="h-8 w-8 text-brand-theme" />
              </div>
              <p className="text-gray-600 font-medium">
                Performance chart will be displayed here
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Interactive charts coming soon
              </p>
            </div>
          </div>
        </div>

        {/* Recent Pages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Pages
            </h3>
            <button 
              onClick={() => window.location.href = "/tasks-dashboard"}
              className="text-brand-theme hover:text-brand-theme-600 text-sm font-medium px-3 py-1 rounded-lg hover:bg-brand-theme/5 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {getStatusText(task.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 font-medium mb-2 truncate">{task.url}</p>
                  <div className="flex items-center space-x-4 flex-wrap">
                    <span className="text-xs text-gray-400">{task.date}</span>
                    {task.performanceScore && (
                      <div className="flex items-center space-x-1">
                        <FaTachometerAlt className={`h-3 w-3 ${
                          task.performanceScore >= 90 ? "text-green-600" :
                          task.performanceScore >= 50 ? "text-yellow-600" : "text-red-600"
                        }`} />
                        <span className={`text-xs font-semibold ${
                          task.performanceScore >= 90 ? "text-green-600" :
                          task.performanceScore >= 50 ? "text-yellow-600" : "text-red-600"
                        }`}>
                          Score: {task.performanceScore}
                        </span>
                      </div>
                    )}
                    {task.loadTime && (
                      <div className="flex items-center space-x-1">
                        <FaClock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {task.loadTime}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {task.status === "completed" && (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <FaCheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                )}
                {task.status === "processing" && (
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <FaClock className="h-5 w-5 text-yellow-600" />
                  </div>
                )}
                {task.status === "failed" && (
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <FaExclamationTriangle className="h-5 w-5 text-red-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-4 p-6 bg-brand-theme/5 border border-brand-theme/20 rounded-xl hover:bg-brand-theme/10 hover:shadow-md transition-all duration-200 group">
            <div className="w-12 h-12 bg-brand-theme/10 rounded-lg flex items-center justify-center group-hover:bg-brand-theme/20 transition-colors">
              <FaTachometerAlt className="h-6 w-6 text-brand-theme" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 group-hover:text-brand-theme transition-colors">
                Add Pages
              </p>
              <p className="text-sm text-gray-500">
                Analyze new pages for speed and performance
              </p>
            </div>
          </button>
          <button className="flex items-center space-x-4 p-6 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 hover:shadow-md transition-all duration-200 group">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <FaChartLine className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                View Reports
              </p>
              <p className="text-sm text-gray-500">
                Check detailed performance reports
              </p>
            </div>
          </button>
          <button className="flex items-center space-x-4 p-6 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 hover:shadow-md transition-all duration-200 group">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <FaGlobe className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                API Access
              </p>
              <p className="text-sm text-gray-500">
                Manage your API integrations
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
