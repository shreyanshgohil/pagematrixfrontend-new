import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import {
  FaUsers,
  FaChartLine,
  FaFileAlt,
  FaCalendarAlt,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
} from "react-icons/fa";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("active");

  const stats = [
    {
      title: "Total Users",
      value: "36",
      icon: FaUsers,
    },
    {
      title: "Active Users",
      value: "1",
      icon: FaChartLine,
    },
    {
      title: "Subscriptions",
      value: "0/1",
      subtitle: "Paid / Free",
      icon: FaFileAlt,
    },
    {
      title: "New This Month",
      value: "0",
      icon: FaCalendarAlt,
    },
  ];

  const users = [
    {
      id: 1,
      name: "Shreyansh Gohil",
      email: "shreyansh@example.com",
      phone: "+1 234 567 8900",
      isAdmin: true,
      created: "Sep 15, 2025",
      subscription: "Free",
      status: "active",
      daysRemaining: "6 days",
      credits: { total: 10, plan: 10, extra: 0 },
      usage: 2,
    },
    {
      id: 2,
      name: "ninja Gohil",
      email: "ninja@example.com",
      created: "Sep 10, 2025",
      subscription: "Corporate",
      status: "active",
      daysRemaining: "0 days",
      credits: { total: 40000, plan: 40000, extra: 0 },
      usage: 0,
    },
    {
      id: 3,
      name: "shreyansh.g+X@amrytt.com",
      email: "shreyansh.g+X@amrytt.com",
      created: "Sep 10, 2025",
      subscription: "Ultimate",
      status: "active",
      daysRemaining: "0 days",
      credits: { total: 40000, plan: 40000, extra: 0 },
      usage: 0,
    },
    {
      id: 4,
      name: "Hardik 16 Patel",
      email: "hardik@example.com",
      phone: "+1 987 654 3210",
      created: "Sep 10, 2025",
      subscription: "No Plan",
      status: "active",
      daysRemaining: "-",
      credits: { total: 0, plan: 0, extra: 0 },
      usage: 0,
    },
    {
      id: 5,
      name: "Test User",
      email: "test@example.com",
      created: "Sep 8, 2025",
      subscription: "Free",
      status: "active",
      daysRemaining: "3 days",
      credits: { total: 5, plan: 5, extra: 0 },
      usage: 1,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSubscriptionColor = (subscription) => {
    switch (subscription) {
      case "Corporate":
      case "Ultimate":
        return "text-brand-theme font-medium";
      case "Free":
        return "text-gray-600";
      case "No Plan":
        return "text-gray-400";
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      <Head>
        <title>Users - Admin Dashboard</title>
        <meta
          name="description"
          content="Manage users in the admin dashboard"
        />
      </Head>
      <SEO
        title="Users - Admin Dashboard"
        description="Manage users in the admin dashboard"
      />

      <AdminDashboardLayout>
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Users</h1>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Shreyansh Gohil</span>
                  <FaExternalLinkAlt className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="px-6 py-6">
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
                      <p className="text-3xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </p>
                      {stat.subtitle && (
                        <p className="text-sm text-gray-500">{stat.subtitle}</p>
                      )}
                    </div>
                    <div className="p-3 rounded-lg bg-brand-theme">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Users Table Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              {/* Table Header */}
              <div className="px-6 py-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Users</h2>
                  <span className="text-sm text-gray-600">36 users</span>
                </div>

                {/* Search Bar */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative flex-1 max-w-md">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users by name, email, or phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                    />
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab("active")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === "active"
                        ? "bg-brand-theme text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    Active Users
                  </button>
                  <button
                    onClick={() => setActiveTab("archive")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === "archive"
                        ? "bg-brand-theme text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    Archive
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Days Remaining
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credits
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-brand-theme flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .substring(0, 2)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="flex items-center space-x-2">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </div>
                                {user.isAdmin && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-theme/10 text-brand-theme">
                                    Admin
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                              {user.phone && (
                                <div className="text-sm text-gray-500">
                                  {user.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.created}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`text-sm ${getSubscriptionColor(
                              user.subscription
                            )}`}
                          >
                            {user.subscription}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <FaCalendarAlt className="h-3 w-3 text-gray-400 mr-1" />
                            {user.daysRemaining}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <FaFileAlt className="h-3 w-3 text-gray-400 mr-1" />
                            <span>
                              Total: {user.credits.total.toLocaleString()} |
                              Plan: {user.credits.plan.toLocaleString()} |
                              Extra: {user.credits.extra}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.usage} Total Usage
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors">
                              <FaPlus className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors">
                              <FaEdit className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing 1 to 20 of 36 users
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                      Previous
                    </button>
                    <button className="px-3 py-2 text-sm font-medium text-white bg-brand-theme border border-brand-theme rounded-lg">
                      1
                    </button>
                    <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminDashboardLayout>
    </>
  );
};

export default AdminUsers;
