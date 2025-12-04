import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaChartBar,
  FaUsers,
  FaFileAlt,
  FaCube,
  FaQuestionCircle,
  FaDollarSign,
  FaChevronRight,
} from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";

const AdminDashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const router = useRouter();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: FaChartBar },
    { name: "Users", href: "/admin/users", icon: FaUsers },
    {
      name: "Active Subscriptions",
      href: "/admin/subscriptions",
      icon: FaFileAlt,
    },
    { name: "Plans", href: "/admin/plans", icon: FaCube },
    {
      name: "Blog Management",
      href: "/admin/blog",
      icon: FaFileAlt,
      hasChildren: true,
      children: [
        { name: "Posts", href: "/admin/blog/posts" },
        { name: "Categories", href: "/admin/blog/categories" },
        { name: "Tags", href: "/admin/blog/tags" },
      ],
    },
    { name: "FAQs", href: "/admin/faqs", icon: FaQuestionCircle },
    { name: "Payment History", href: "/admin/payments", icon: FaDollarSign },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: FaChartBar,
      hasChildren: true,
      children: [
        { name: "Task Status Overview", href: "/admin/reports/task-status" },
        { name: "API Logs", href: "/admin/reports/api-logs" },
      ],
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: FaCog,
      hasChildren: true,
      children: [
        { name: "Email Templates", href: "/admin/settings/email-templates" },
        { name: "SEO", href: "/admin/settings/seo" },
      ],
    },
    { name: "VIP Task Management", href: "/admin/vip-tasks", icon: FaChartBar },
  ];

  // Toggle expanded state for items with children
  const toggleExpanded = (itemName) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  // Check if a navigation item or its children is active
  const isItemActive = (item) => {
    if (router.pathname === item.href) return true;
    if (item.children) {
      return item.children.some((child) => router.pathname === child.href);
    }
    return false;
  };

  // Check if a child item is active
  const isChildActive = (childHref) => {
    return router.pathname === childHref;
  };

  // Auto-expand parent items when a child is active
  useEffect(() => {
    const newExpandedItems = {};
    navigation.forEach((item) => {
      if (item.hasChildren) {
        const hasActiveChild = item.children.some(
          (child) => router.pathname === child.href
        );
        if (hasActiveChild) {
          newExpandedItems[item.name] = true;
        }
      }
    });
    setExpandedItems((prev) => ({ ...prev, ...newExpandedItems }));
  }, [router.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:w-64 lg:flex-shrink-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link href="/admin/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-brand-theme to-brand-theme-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="text-xl font-bold text-brand-blue-800 leading-none">
              GetIndexedNow
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = isItemActive(item);
              const isExpanded = expandedItems[item.name];

              return (
                <div key={item.name}>
                  {/* Parent Item */}
                  {item.hasChildren ? (
                    <div
                      className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-brand-theme text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                      }`}
                      onClick={() => toggleExpanded(item.name)}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`mr-3 h-5 w-5 ${
                            isActive
                              ? "text-white"
                              : "text-gray-400 group-hover:text-gray-600"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      <FaChevronRight
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isExpanded ? "rotate-90" : ""
                        } ${isActive ? "text-white" : "text-gray-400"}`}
                      />
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-brand-theme text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`mr-3 h-5 w-5 ${
                            isActive
                              ? "text-white"
                              : "text-gray-400 group-hover:text-gray-600"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  )}

                  {/* Children Items */}
                  {item.hasChildren && isExpanded && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => {
                        const childIsActive = isChildActive(child.href);
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                              childIsActive
                                ? "bg-brand-theme text-white shadow-sm"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                            }`}
                          >
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <FaSignOutAlt className="mr-3 h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <IoMenu className="h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <FaBell className="h-5 w-5" />
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-theme rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">SG</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    Shreyansh Gohil
                  </p>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <FaUser className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
