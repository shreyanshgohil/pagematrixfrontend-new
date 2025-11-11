import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import EditUserModal from "@/components/dashboard/EditUserModal";
import {
  FaUsers,
  FaChartLine,
  FaFileAlt,
  FaCalendarAlt,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaArchive,
  FaTimes,
} from "react-icons/fa";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [isAddCreditsModalOpen, setIsAddCreditsModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isArchiveConfirmModalOpen, setIsArchiveConfirmModalOpen] =
    useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [creditsAmount, setCreditsAmount] = useState(0);
  const [reason, setReason] = useState("");
  const [expiresInDays, setExpiresInDays] = useState("");

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

  const [users, setUsers] = useState([
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
    {
      id: 6,
      name: "Archived User 1",
      email: "archived1@example.com",
      created: "Sep 5, 2025",
      subscription: "Free",
      status: "archived",
      daysRemaining: "-",
      credits: { total: 0, plan: 0, extra: 0 },
      usage: 0,
    },
    {
      id: 7,
      name: "Archived User 2",
      email: "archived2@example.com",
      created: "Sep 3, 2025",
      subscription: "Corporate",
      status: "archived",
      daysRemaining: "-",
      credits: { total: 0, plan: 0, extra: 0 },
      usage: 0,
    },
  ]);

  const handleAddCredits = (user) => {
    setSelectedUser(user);
    setCreditsAmount(0);
    setReason("");
    setExpiresInDays("");
    setIsAddCreditsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleUpdateUser = (updatedData) => {
    console.log("Updating user:", {
      userId: selectedUser.id,
      updatedData: updatedData,
    });
    // Handle user update logic here
  };

  const handleArchiveUser = (user) => {
    setSelectedUser(user);
    setIsArchiveConfirmModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteConfirmModalOpen(true);
  };

  const confirmArchiveUser = () => {
    if (selectedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, status: "archived" } : user
        )
      );
      console.log("User archived:", selectedUser.id);
    }
    setIsArchiveConfirmModalOpen(false);
    setSelectedUser(null);
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUser.id)
      );
      console.log("User deleted:", selectedUser.id);
    }
    setIsDeleteConfirmModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseModal = () => {
    setIsAddCreditsModalOpen(false);
    setIsEditUserModalOpen(false);
    setIsArchiveConfirmModalOpen(false);
    setIsDeleteConfirmModalOpen(false);
    setSelectedUser(null);
    setCreditsAmount(0);
    setReason("");
    setExpiresInDays("");
  };

  const handleSubmitCredits = () => {
    console.log("Adding credits:", {
      user: selectedUser,
      credits: creditsAmount,
      reason: reason,
      expiresInDays: expiresInDays,
    });
    // Handle credit addition logic here
    handleCloseModal();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-yellow-100 text-yellow-800";
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
                  <span className="text-sm text-gray-600">
                    {
                      users.filter((user) =>
                        activeTab === "active"
                          ? user.status === "active"
                          : user.status === "archived"
                      ).length
                    }{" "}
                    users
                  </span>
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
                    {users
                      .filter((user) => {
                        const matchesSearch =
                          user.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          user.email
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase());
                        const matchesTab =
                          activeTab === "active"
                            ? user.status === "active"
                            : user.status === "archived";
                        return matchesSearch && matchesTab;
                      })
                      .map((user) => (
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
                              <button
                                onClick={() => handleAddCredits(user)}
                                className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors"
                              >
                                <FaPlus className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEditUser(user)}
                                className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors"
                              >
                                <FaEdit className="h-4 w-4" />
                              </button>
                              {user.status === "active" ? (
                                <button
                                  onClick={() => handleArchiveUser(user.id)}
                                  className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                >
                                  <FaArchive className="h-4 w-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <FaTrash className="h-4 w-4" />
                                </button>
                              )}
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
                    Showing 1 to{" "}
                    {
                      users.filter((user) =>
                        activeTab === "active"
                          ? user.status === "active"
                          : user.status === "archived"
                      ).length
                    }{" "}
                    of{" "}
                    {
                      users.filter((user) =>
                        activeTab === "active"
                          ? user.status === "active"
                          : user.status === "archived"
                      ).length
                    }{" "}
                    users
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

      {/* Add Credits Modal */}
      {isAddCreditsModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={handleCloseModal}
            ></div>

            {/* Modal panel */}
            <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-md w-full">
              {/* Header */}
              <div className="bg-white px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    + Add Credits to User
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {/* User Information */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    User Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-900">
                      {selectedUser.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedUser.email}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Current monthly credits: {selectedUser.credits.total}
                    </p>
                  </div>
                </div>

                {/* Credits Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credits
                  </label>
                  <input
                    type="number"
                    value={creditsAmount}
                    onChange={(e) =>
                      setCreditsAmount(parseInt(e.target.value) || 0)
                    }
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  />
                </div>

                {/* Reason Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason (Optional)
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    placeholder="e.g., Manual payment received, Promotional credits, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme resize-none"
                  />
                </div>

                {/* Expires In Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expires in (Days) - Optional
                  </label>
                  <input
                    type="number"
                    value={expiresInDays}
                    onChange={(e) => setExpiresInDays(e.target.value)}
                    min="1"
                    placeholder="Leave empty for plan expiry date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to set expiry at user's current plan expiry date
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitCredits}
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-theme rounded-lg hover:bg-brand-theme-600 transition-colors"
                  >
                    Add Credits
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        onUpdate={handleUpdateUser}
      />

      {/* Archive Confirmation Modal */}
      {isArchiveConfirmModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={handleCloseModal}
            ></div>

            {/* Modal panel */}
            <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-md w-full">
              {/* Modal header */}
              <div className="bg-white px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Archive User
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal content */}
              <div className="px-6 py-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-12 w-12">
                    <div className="h-12 w-12 rounded-full bg-brand-theme flex items-center justify-center">
                      <span className="text-lg font-medium text-white">
                        {selectedUser?.name
                          ?.split(" ")
                          ?.map((n) => n[0])
                          ?.join("")
                          ?.substring(0, 2) || "U"}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-medium text-gray-900">
                      {selectedUser?.name || "Unknown User"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedUser?.email || "No email"}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  Are you sure you want to archive this user? They will be moved
                  to the archive tab and will no longer appear in the active
                  users list.
                </p>

                {/* Action buttons */}
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmArchiveUser}
                    className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Archive User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={handleCloseModal}
            ></div>

            {/* Modal panel */}
            <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-md w-full">
              {/* Modal header */}
              <div className="bg-white px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete User
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal content */}
              <div className="px-6 py-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-12 w-12">
                    <div className="h-12 w-12 rounded-full bg-brand-theme flex items-center justify-center">
                      <span className="text-lg font-medium text-white">
                        {selectedUser?.name
                          ?.split(" ")
                          ?.map((n) => n[0])
                          ?.join("")
                          ?.substring(0, 2) || "U"}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-medium text-gray-900">
                      {selectedUser?.name || "Unknown User"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedUser?.email || "No email"}
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaTrash className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Warning: This action cannot be undone
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>
                          This will permanently delete the user and all their
                          data. This action cannot be reversed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  Are you absolutely sure you want to delete this user? This
                  action is permanent and cannot be undone.
                </p>

                {/* Action buttons */}
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteUser}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUsers;
