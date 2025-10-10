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
  FaTasks,
  FaChartLine,
  FaCreditCard,
  FaCog as FaSettings,
} from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: FaChartBar },
    { name: "Tasks", href: "/tasks-dashboard", icon: FaTasks },
    {
      name: "Reports",
      href: "/reports",
      icon: FaChartLine,
    },
    {
      name: "Plans & Billing",
      href: "/plans-billing",
      icon: FaCreditCard,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: FaSettings,
    },
  ];

  // Get the current active navigation item based on the current path
  const getCurrentNavigation = () => {
    return navigation.map((item) => ({
      ...item,
      current: router.pathname === item.href,
    }));
  };

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
        <div
          className="flex items-center justify-between h-16 px-6 border-b border-gray-200"
          style={{ height: "65px" }}
        >
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-brand-theme to-brand-theme-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="text-xl font-bold text-brand-blue-800 leading-none">
              PageSpeed
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-1">
            {getCurrentNavigation().map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  item.current
                    ? "bg-brand-theme/10 text-brand-theme border-l-4 border-brand-theme shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    item.current
                      ? "text-brand-theme"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <IoMenu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-6">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-500 relative transition-colors">
                <FaBell className="h-5 w-5" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>

              {/* User menu */}
              <div className="relative">
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="w-10 h-10 bg-gradient-to-r from-brand-theme to-brand-theme-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                    <span className="text-white font-semibold text-sm">SG</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900 leading-tight">
                      Shreyansh Gohil
                    </p>
                    <p className="text-xs text-gray-500 leading-tight">
                      shreyansh@example.com
                    </p>
                  </div>
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

export default DashboardLayout;
