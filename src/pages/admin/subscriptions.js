import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import {
  FaUsers,
  FaCalendarCheck,
  FaCalendarTimes,
  FaChartLine,
  FaSearch,
  FaEye,
} from "react-icons/fa";

const AdminSubscriptions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("All Plans");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const stats = [
    {
      title: "Total Subscriptions",
      value: "11 / 15",
      subtitle: "Paid / Free",
      icon: FaUsers,
    },
    {
      title: "Active",
      value: "1",
      icon: FaCalendarCheck,
    },
    {
      title: "Expired",
      value: "14",
      icon: FaCalendarTimes,
    },
    {
      title: "Monthly Revenue",
      value: "$0.00",
      icon: FaChartLine,
    },
  ];

  const subscriptions = [
    {
      id: 1,
      user: {
        name: "Shreyansh Gohil",
        email: "shreyansh@codalent.com",
      },
      planName: "Free",
      planPrice: "$0.00/month",
      status: "Active",
      startDate: "Sep 15, 2025",
      endDate: "Oct 15, 2025",
      credits: 10,
      usage: 2,
      autoRenew: true,
    },
    {
      id: 2,
      user: {
        name: "ninja Gohil",
        email: "ninja@example.com",
      },
      planName: "Corporate",
      planPrice: "$1,499.00/month",
      status: "Expired",
      startDate: "Sep 10, 2025",
      endDate: "Oct 10, 2025",
      credits: 40000,
      usage: 0,
      autoRenew: true,
    },
    {
      id: 3,
      user: {
        name: "shreyansh.g+12@amrytt.com",
        email: "shreyansh.g+12@amrytt.com",
      },
      planName: "Corporate",
      planPrice: "$1,499.00/month",
      status: "Expired",
      startDate: "Sep 10, 2025",
      endDate: "Oct 10, 2025",
      credits: 40000,
      usage: 0,
      autoRenew: true,
    },
    {
      id: 4,
      user: {
        name: "shreyansh.g+11@amrytt.com",
        email: "shreyansh.g+11@amrytt.com",
      },
      planName: "Corporate",
      planPrice: "$1,499.00/month",
      status: "Expired",
      startDate: "Sep 10, 2025",
      endDate: "Oct 10, 2025",
      credits: 40000,
      usage: 0,
      autoRenew: true,
    },
    {
      id: 5,
      user: {
        name: "shreyansh.g+10@amrytt.com",
        email: "shreyansh.g+10@amrytt.com",
      },
      planName: "Ultimate",
      planPrice: "$749.00/month",
      status: "Expired",
      startDate: "Sep 10, 2025",
      endDate: "Oct 10, 2025",
      credits: 20000,
      usage: 0,
      autoRenew: true,
    },
    {
      id: 6,
      user: {
        name: "shreyansh.g+9@amrytt.com",
        email: "shreyansh.g+9@amrytt.com",
      },
      planName: "Free",
      planPrice: "$0.00/month",
      status: "Expired",
      startDate: "Sep 10, 2025",
      endDate: "Oct 10, 2025",
      credits: 10,
      usage: 3,
      autoRenew: true,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-brand-theme text-white";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPlanColor = (planName) => {
    switch (planName) {
      case "Corporate":
        return "text-brand-theme font-medium";
      case "Ultimate":
        return "text-purple-600 font-medium";
      case "Free":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      <Head>
        <title>Active Subscriptions - Admin Dashboard</title>
        <meta
          name="description"
          content="Manage active subscriptions in the admin dashboard"
        />
      </Head>
      <SEO
        title="Active Subscriptions - Admin Dashboard"
        description="Manage active subscriptions in the admin dashboard"
      />

      <AdminDashboardLayout>
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Active Subscriptions
                  </h1>
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

            {/* Subscriptions Table Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              {/* Table Header */}
              <div className="px-6 py-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Active Subscriptions
                  </h2>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-md">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, email, or phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                    />
                  </div>
                  <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  >
                    <option value="All Plans">All Plans</option>
                    <option value="Free">Free</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Ultimate">Ultimate</option>
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                  </select>
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
                        Plan Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        End Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credits
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Auto Renew
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscriptions.map((subscription) => (
                      <tr key={subscription.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-brand-theme flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                  {subscription.user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .substring(0, 2)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {subscription.user.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {subscription.user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div
                              className={`text-sm font-medium ${getPlanColor(
                                subscription.planName
                              )}`}
                            >
                              {subscription.planName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {subscription.planPrice}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              subscription.status
                            )}`}
                          >
                            {subscription.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {subscription.startDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {subscription.endDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {subscription.credits.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {subscription.usage} Total Usage
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme text-white">
                            {subscription.autoRenew ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-brand-theme bg-brand-theme/10 rounded-lg hover:bg-brand-theme/20 transition-colors">
                            <FaEye className="h-3 w-3 mr-1" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </AdminDashboardLayout>
    </>
  );
};

export default AdminSubscriptions;
