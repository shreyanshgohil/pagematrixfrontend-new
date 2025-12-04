import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import {
  FaCube,
  FaDollarSign,
  FaPlus,
  FaSync,
  FaEdit,
  FaTrash,
  FaCheck,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";

const AdminPlans = () => {
  const [activeTab, setActiveTab] = useState("subscription");

  const stats = [
    {
      title: "Total Plans",
      value: "9",
      icon: FaCube,
    },
    {
      title: "Monthly Revenue",
      value: "$15,739.00",
      icon: FaDollarSign,
    },
  ];

  const plans = [
    {
      id: 1,
      name: "Starter",
      status: "Active",
      price: "$45.00",
      description: "Perfect for small projects and individual developers",
      credits: 800,
      activeUsers: 0,
      features: [
        "Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Monthly recurring payment",
      ],
    },
    {
      id: 2,
      name: "Professional",
      status: "Active",
      price: "$99.00",
      description: "Great for growing businesses and teams",
      credits: 2000,
      activeUsers: 1,
      features: [
        "Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Monthly recurring payment",
      ],
    },
    {
      id: 3,
      name: "Premium",
      status: "Active",
      price: "$199.00",
      description: "Ideal for established companies with high volume needs",
      credits: 5000,
      activeUsers: 0,
      features: [
        "Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Monthly recurring payment",
      ],
    },
    {
      id: 4,
      name: "Enterprise",
      status: "Active",
      price: "$499.00",
      description: "For large enterprises with extensive page analysis requirements",
      credits: 12000,
      activeUsers: 0,
      features: [
        "Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Monthly recurring payment",
      ],
    },
    {
      id: 5,
      name: "Ultimate",
      status: "Active",
      price: "$749.00",
      description: "Maximum performance for enterprise-level operations",
      credits: 20000,
      activeUsers: 0,
      features: [
        "Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Monthly recurring payment",
      ],
    },
    {
      id: 6,
      name: "Corporate",
      status: "Active",
      price: "$1,499.00",
      description: "Comprehensive solution for corporate environments",
      credits: 40000,
      activeUsers: 10,
      features: [
        "Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Monthly recurring payment",
      ],
    },
    {
      id: 7,
      name: "Free",
      status: "Active",
      price: "$0.00",
      description: "Free tier for testing and small-scale projects",
      credits: 10,
      activeUsers: 4,
      features: [
        "Credits per month",
        "PageSpeed analysis for your URLs",
        "No payment required",
      ],
    },
    {
      id: 8,
      name: "Legacy Basic",
      status: "Legacy",
      price: "$29.00",
      description: "Legacy plan with basic features",
      credits: 500,
      activeUsers: 0,
      features: [
        "Credits per month",
        "PageSpeed analysis for your URLs",
        "Legacy plan features",
      ],
      isLegacy: true,
    },
    {
      id: 9,
      name: "Admin Plan",
      status: "Active",
      price: "$0.00",
      description: "Special plan for administrative purposes",
      credits: 50000,
      activeUsers: 0,
      features: [
        "Admin-only features",
        "Custom expiration dates",
        "Unlimited access",
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-brand-theme text-white";
      case "Legacy":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const currentAdminSubscription = {
    planName: "Free",
    description: "Free tier for testing and small projects",
    status: "Active",
    credits: 10,
    billingCycle: "monthly",
    startDate: "9/15/2025",
    endDate: "10/15/2025",
  };

  const adminPlans = [
    {
      id: 1,
      name: "Admin Plan",
      status: "Active",
      adminOnly: true,
      description:
        "Admin-only plan with high credit limit for system management",
      credits: 50000,
      billing: "monthly",
      price: "Free",
      features: [
        "50,000 Credits per month",
        "PageSpeed analysis for your URLs",
        "VIP queue access",
        "Admin-only features",
        "Custom expiration dates",
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Plans - Admin Dashboard</title>
        <meta
          name="description"
          content="Manage subscription plans in the admin dashboard"
        />
      </Head>
      <SEO
        title="Plans - Admin Dashboard"
        description="Manage subscription plans in the admin dashboard"
      />

      <AdminDashboardLayout>
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Plans</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                    <div className="p-3 rounded-lg bg-brand-theme">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs and Add Plan Button */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("subscription")}
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "subscription"
                      ? "border-brand-theme text-brand-theme"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Subscription Plans
                </button>
                <button
                  onClick={() => setActiveTab("admin")}
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "admin"
                      ? "border-brand-theme text-brand-theme"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Admin Plans
                </button>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-sm">
                <FaPlus className="h-4 w-4" />
                <span className="font-medium">Add Plan</span>
              </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === "subscription" ? (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Subscription Plans
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Plan Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {plan.name}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              plan.status
                            )}`}
                          >
                            {plan.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {plan.isLegacy && (
                            <button className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors">
                              <FaSync className="h-4 w-4" />
                            </button>
                          )}
                          <button className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors">
                            <FaEdit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <p className="text-2xl font-bold text-gray-900">
                          {plan.price}
                          <span className="text-sm font-normal text-gray-500">
                            /monthly
                          </span>
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4">
                        {plan.description}
                      </p>

                      {/* Credits and Active Users */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Credits</p>
                          <p className="text-sm font-medium text-gray-900">
                            {plan.credits.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Active Users
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {plan.activeUsers}
                          </p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <FaCheck className="h-3 w-3 text-brand-theme flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Legacy Plan Note */}
                      {plan.isLegacy && (
                        <div className="mt-4 p-3 border border-orange-200 bg-orange-50 rounded-lg">
                          <p className="text-xs text-orange-800">
                            Legacy Plan: This plan is marked as legacy but still
                            available for new subscriptions.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-6">
                {/* Current Admin Subscription Status */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Current Admin Subscription Status
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme text-white">
                      {currentAdminSubscription.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {currentAdminSubscription.planName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {currentAdminSubscription.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Credits</p>
                      <p className="text-sm font-medium text-gray-900">
                        {currentAdminSubscription.credits}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Billing Cycle
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {currentAdminSubscription.billingCycle}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Start Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {currentAdminSubscription.startDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">End Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {currentAdminSubscription.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Extend Subscription
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                      Revoke Subscription
                    </button>
                  </div>
                </div>

                {/* Available Admin Plans */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Available Admin Plans
                    </h3>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-sm">
                      <FaPlus className="h-4 w-4" />
                      <span className="font-medium">Add Admin Plan</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {adminPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        {/* Plan Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {plan.name}
                            </h4>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-theme text-white">
                              {plan.status}
                            </span>
                            {plan.adminOnly && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Admin Only
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 mb-4">
                          {plan.description}
                        </p>

                        {/* Plan Details */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Credits
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {plan.credits.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Billing
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {plan.billing}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Price</p>
                            <p className="text-sm font-medium text-gray-900">
                              {plan.price}
                            </p>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-2 mb-6">
                          {plan.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <FaCheck className="h-3 w-3 text-brand-theme flex-shrink-0" />
                              <span className="text-sm text-gray-600">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3">
                          <button className="flex items-center space-x-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors">
                            <FaUser className="h-4 w-4" />
                            <span>Assign to Self</span>
                          </button>
                          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            <FaUser className="h-4 w-4" />
                            <span>Assign to Other Admin</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </AdminDashboardLayout>
    </>
  );
};

export default AdminPlans;
