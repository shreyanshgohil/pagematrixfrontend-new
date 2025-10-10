import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaChartLine,
  FaSearch,
  FaEye,
  FaRedo,
  FaExternalLinkAlt,
} from "react-icons/fa";

const AdminPayments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [planFilter, setPlanFilter] = useState("All Plans");
  const [timeFilter, setTimeFilter] = useState("All Time");

  const stats = [
    {
      title: "Total Revenue",
      value: "$15,739.00",
      icon: FaDollarSign,
      color: "green",
    },
    {
      title: "Total Transactions",
      value: "11",
      icon: FaCalendarAlt,
      color: "blue",
    },
    {
      title: "Success Rate",
      value: "100.0%",
      icon: FaChartLine,
      color: "purple",
    },
    {
      title: "This Month",
      value: "$0.00",
      icon: FaCalendarAlt,
      color: "orange",
    },
  ];

  const payments = [
    {
      id: 1,
      user: {
        name: "ninja Gohil",
        email: "shreyansh.g+12@amrytt.com",
      },
      plan: {
        name: "Corporate",
        price: "$1,499.00/monthly",
      },
      amount: "$1,499.00",
      date: "9/10/2025",
      stripeId: "pi_3••••izxq",
      status: "succeeded",
    },
    {
      id: 2,
      user: {
        name: "shreyansh.g+11@amrytt.com",
        email: "shreyansh.g+11@amrytt.com",
      },
      plan: {
        name: "Corporate",
        price: "$1,499.00/monthly",
      },
      amount: "$1,499.00",
      date: "9/10/2025",
      stripeId: "pi_3••••D9HY",
      status: "succeeded",
    },
    {
      id: 3,
      user: {
        name: "shreyansh.g+10@amrytt.com",
        email: "shreyansh.g+10@amrytt.com",
      },
      plan: {
        name: "Corporate",
        price: "$1,499.00/monthly",
      },
      amount: "$1,499.00",
      date: "9/10/2025",
      stripeId: "pi_3••••C8GX",
      status: "succeeded",
    },
    {
      id: 4,
      user: {
        name: "shreyansh.g+9@amrytt.com",
        email: "shreyansh.g+9@amrytt.com",
      },
      plan: {
        name: "Corporate",
        price: "$1,499.00/monthly",
      },
      amount: "$1,499.00",
      date: "9/10/2025",
      stripeId: "pi_3••••B7FW",
      status: "succeeded",
    },
    {
      id: 5,
      user: {
        name: "shreyansh.g+8@amrytt.com",
        email: "shreyansh.g+8@amrytt.com",
      },
      plan: {
        name: "Corporate",
        price: "$1,499.00/monthly",
      },
      amount: "$1,499.00",
      date: "9/10/2025",
      stripeId: "pi_3••••A6EV",
      status: "succeeded",
    },
    {
      id: 6,
      user: {
        name: "shreyansh.g+7@amrytt.com",
        email: "shreyansh.g+7@amrytt.com",
      },
      plan: {
        name: "Corporate",
        price: "$1,499.00/monthly",
      },
      amount: "$1,499.00",
      date: "9/10/2025",
      stripeId: "pi_3••••Z5DU",
      status: "succeeded",
    },
    {
      id: 7,
      user: {
        name: "shreyansh.g+6@amrytt.com",
        email: "shreyansh.g+6@amrytt.com",
      },
      plan: {
        name: "Corporate",
        price: "$1,499.00/monthly",
      },
      amount: "$1,499.00",
      date: "9/10/2025",
      stripeId: "pi_3••••Y4CT",
      status: "succeeded",
    },
    {
      id: 8,
      user: {
        name: "shreyansh.g+5@amrytt.com",
        email: "shreyansh.g+5@amrytt.com",
      },
      plan: {
        name: "Corporate",
        price: "$1,499.00/monthly",
      },
      amount: "$1,499.00",
      date: "9/10/2025",
      stripeId: "pi_3••••X3BS",
      status: "succeeded",
    },
    {
      id: 9,
      user: {
        name: "shreyansh.g+4@amrytt.com",
        email: "shreyansh.g+4@amrytt.com",
      },
      plan: {
        name: "Corporate",
        price: "$1,499.00/monthly",
      },
      amount: "$1,499.00",
      date: "9/10/2025",
      stripeId: "pi_3••••W2AR",
      status: "succeeded",
    },
    {
      id: 10,
      user: {
        name: "shreyansh.g+3@amrytt.com",
        email: "shreyansh.g+3@amrytt.com",
      },
      plan: {
        name: "Ultimate",
        price: "$749.00/monthly",
      },
      amount: "$749.00",
      date: "9/10/2025",
      stripeId: "pi_3••••v555",
      status: "succeeded",
    },
    {
      id: 11,
      user: {
        name: "shreyansh.g+2@amrytt.com",
        email: "shreyansh.g+2@amrytt.com",
      },
      plan: {
        name: "Corporate",
        price: "$1,499.00/monthly",
      },
      amount: "$1,499.00",
      date: "9/10/2025",
      stripeId: "pi_3••••Fmwc",
      status: "succeeded",
    },
  ];

  const getStatIconColor = (color) => {
    const colors = {
      green: "bg-green-500",
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
    };
    return colors[color] || "bg-gray-500";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "succeeded":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
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
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      <Head>
        <title>Payment History - Admin Dashboard</title>
        <meta
          name="description"
          content="View payment history in the admin dashboard"
        />
      </Head>
      <SEO
        title="Payment History - Admin Dashboard"
        description="View payment history in the admin dashboard"
      />

      <AdminDashboardLayout>
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Payment History
                  </h1>
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
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${getStatIconColor(
                        stat.color
                      )}`}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment History Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              {/* Section Header */}
              <div className="px-6 py-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Payment History
                  </h2>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-md">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search payments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Succeeded">Succeeded</option>
                    <option value="Failed">Failed</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  >
                    <option value="All Plans">All Plans</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Ultimate">Ultimate</option>
                    <option value="Free">Free</option>
                  </select>
                  <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  >
                    <option value="All Time">All Time</option>
                    <option value="Last 7 Days">Last 7 Days</option>
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="Last 90 Days">Last 90 Days</option>
                  </select>
                </div>
              </div>

              {/* Payment Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stripe ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-brand-theme flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                  {payment.user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .substring(0, 2)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {payment.user.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {payment.user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div
                              className={`text-sm font-medium ${getPlanColor(
                                payment.plan.name
                              )}`}
                            >
                              {payment.plan.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {payment.plan.price}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <span className="mr-2">{payment.stripeId}</span>
                            <button className="p-1 text-gray-400 hover:text-brand-theme">
                              <FaEye className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              payment.status
                            )}`}
                          >
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors">
                              <FaEye className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors">
                              <FaRedo className="h-4 w-4" />
                            </button>
                          </div>
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

export default AdminPayments;
