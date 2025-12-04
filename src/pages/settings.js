import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  FaUser,
  FaCog,
  FaFileAlt,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaKey,
  FaShieldAlt,
  FaChartLine,
  FaDollarSign,
  FaCalendarAlt,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [activeSubTab, setActiveSubTab] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "account", label: "Account", icon: FaCog },
    { id: "plans", label: "Plans", icon: FaFileAlt },
    { id: "history", label: "History", icon: FaClock },
  ];

  const profileData = {
    firstName: "Shreyansh",
    lastName: "Gohil",
    email: "shreyansh@codalent.com",
    phone: "",
  };

  const subscriptionData = {
    currentPlan: "Free Plan",
    period: "Sep 15, 2025 - Oct 15, 2025",
    status: "Active",
    credits: {
      total: 10,
      available: 8,
      used: 2,
    },
  };

  const usageHistory = [
    {
      date: "Sep 15, 2025, 10:23 PM",
      credits: -1,
      plan: "Free",
      page: "https://example.com/home",
    },
    {
      date: "Sep 15, 2025, 10:25 PM",
      credits: -1,
      plan: "Free",
      page: "https://example.com/about",
    },
  ];

  const subscriptionTimeline = [
    {
      plan: "Free",
      price: "$0.00/month",
      period: "Sep 15, 2025 - Oct 15, 2025",
      status: "Active",
      credits: 10,
    },
  ];

  const accountSecurityTabs = [
    {
      id: "change-password",
      label: "Change Password",
      description: "Update your password",
      icon: FaKey,
      active: true,
    },
  ];

  const planManagementTabs = [
    {
      id: "current-plan",
      label: "Current Plan",
      description: "View your plan details",
      icon: FaFileAlt,
      active: false,
    },
    {
      id: "usage-history",
      label: "Usage History",
      description: "Track credit usage",
      icon: FaChartLine,
      active: false,
    },
    {
      id: "billing-invoices",
      label: "Billing & Invoices",
      description: "Manage payments",
      icon: FaDollarSign,
      active: true,
    },
  ];

  const historyTabs = [
    {
      id: "subscription-timeline",
      label: "Subscription Timeline",
      description: "Plan changes history",
      icon: FaClock,
      active: false,
    },
    {
      id: "credit-usage-history",
      label: "Credit Usage History",
      description: "Complete usage record",
      icon: FaChartLine,
      active: true,
    },
  ];

  const renderProfileContent = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Profile Settings</h3>
          <p className="text-gray-600">Manage your personal information</p>
        </div>
        <button className="p-2 text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors">
          <FaEdit className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <FaUser className="h-4 w-4 text-gray-400" />
              <span>First Name</span>
            </div>
          </label>
          <input
            type="text"
            value={profileData.firstName}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <FaUser className="h-4 w-4 text-gray-400" />
              <span>Last Name</span>
            </div>
          </label>
          <input
            type="text"
            value={profileData.lastName}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <FaEnvelope className="h-4 w-4 text-gray-400" />
              <span>Email Address</span>
            </div>
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="email"
              value={profileData.email}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <button className="flex items-center space-x-2 text-brand-theme hover:text-brand-theme-600 text-sm font-medium">
              <FaEdit className="h-3 w-3" />
              <span>Change Email</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Click "Change Email" to update your email address
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <FaPhone className="h-4 w-4 text-gray-400" />
              <span>Contact Number</span>
            </div>
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
          />
        </div>
      </div>
    </div>
  );

  const renderAccountContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Account Security
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            Manage your account security settings
          </p>

          <div className="space-y-2">
            {accountSecurityTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-colors ${
                  tab.active
                    ? "bg-brand-theme text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">{tab.label}</div>
                  <div
                    className={`text-xs ${
                      tab.active ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {tab.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <FaKey className="h-6 w-6 text-brand-theme" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Change Password
              </h3>
              <p className="text-gray-600">
                Update your password to keep your account secure
              </p>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <FaShieldAlt className="h-4 w-4 text-brand-theme" />
              <span className="font-medium text-gray-900">
                Password Requirements
              </span>
            </div>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• At least 6 characters long</li>
              <li>• Use a combination of letters, numbers, and symbols</li>
              <li>• Avoid using easily guessable information</li>
            </ul>
          </div>

          {/* Password Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button className="w-full bg-brand-theme text-white py-3 px-4 rounded-lg hover:bg-brand-theme-600 transition-colors flex items-center justify-center space-x-2">
              <FaKey className="h-4 w-4" />
              <span>Change Password</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlansContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Plan Management
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            Manage your subscription and billing
          </p>

          <div className="space-y-2">
            {planManagementTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-colors ${
                  tab.active
                    ? "bg-brand-theme text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">{tab.label}</div>
                  <div
                    className={`text-xs ${
                      tab.active ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {tab.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="lg:col-span-3">
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Current Plan</h3>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Manage Plan
              </button>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">
                  {subscriptionData.period}
                </p>
                <h4 className="text-xl font-bold text-gray-900">
                  {subscriptionData.currentPlan}
                </h4>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-2 py-1 bg-brand-theme/10 text-brand-theme text-xs font-medium rounded-full">
                    Free
                  </span>
                  <span className="text-sm text-gray-600">20% used</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <FaChartLine className="h-4 w-4 text-brand-theme" />
                  <span className="text-sm text-gray-600">TOTAL</span>
                </div>
                <div className="text-2xl font-bold text-brand-theme">
                  {subscriptionData.credits.total}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <FaKey className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">AVAILABLE</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {subscriptionData.credits.available}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <FaChartLine className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-gray-600">USED</span>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {subscriptionData.credits.used}
                </div>
              </div>
            </div>
          </div>

          {/* Usage History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Usage History
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Page URL
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usageHistory.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.date}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-red-600">
                        {item.credits}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.plan}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <a
                          href="#"
                          className="text-brand-theme hover:text-brand-theme-600"
                        >
                          {item.page}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Billing & Invoices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Billing & Invoices
            </h3>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-brand-theme/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaDollarSign className="h-8 w-8 text-brand-theme" />
              </div>
              <p className="text-gray-600">
                No invoices generated yet. Invoices are automatically generated
                for your plan subscriptions when they end.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistoryContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Subscription History
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            View your subscription and usage history
          </p>

          <div className="space-y-2">
            {historyTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-colors ${
                  tab.active
                    ? "bg-brand-theme text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">{tab.label}</div>
                  <div
                    className={`text-xs ${
                      tab.active ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {tab.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="lg:col-span-3">
        <div className="space-y-6">
          {/* Subscription Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Subscription Timeline
                </h3>
                <p className="text-gray-600">
                  Your subscription plan history and changes
                </p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors">
                <span>View Plans</span>
                <FaArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscriptionTimeline.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.plan}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.price}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {item.period}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.credits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Credit Usage History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Credit Usage History
            </h3>
            <p className="text-gray-600 mb-6">
              Complete record of your credit consumption
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits Used
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Page URL
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usageHistory.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.date}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-red-600">
                        {item.credits}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.plan}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <a
                          href="#"
                          className="text-brand-theme hover:text-brand-theme-600"
                        >
                          {item.page}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileContent();
      case "account":
        return renderAccountContent();
      case "plans":
        return renderPlansContent();
      case "history":
        return renderHistoryContent();
      default:
        return renderProfileContent();
    }
  };

  return (
    <>
      <Head>
        <title>Settings - PageSpeed Performance Tool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SEO
        title="Settings - PageSpeed Performance Tool | Account Management"
        description="Manage your account preferences, profile, and subscription details. Update your personal information, security settings, and billing preferences."
        keywords="settings, account management, profile settings, security settings, billing, PageSpeed settings"
        url="/settings"
      />

      <DashboardLayout>
        <div className="min-h-screen bg-gray-50">
          {/* Header Section */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Settings
                </h1>
                <p className="text-gray-600 text-lg">
                  Manage your account preferences, profile, and subscription
                  details
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-brand-theme/10 text-brand-theme border-2 border-brand-theme"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {renderContent()}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Settings;
