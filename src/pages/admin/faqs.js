import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import {
  FaQuestionCircle,
  FaCheckCircle,
  FaEdit,
  FaEye,
  FaTrash,
  FaPlus,
  FaSearch,
} from "react-icons/fa";

const AdminFAQs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const stats = [
    {
      title: "Total FAQs",
      value: "10",
      icon: FaQuestionCircle,
      color: "blue",
    },
    {
      title: "Published",
      value: "10",
      icon: FaCheckCircle,
      color: "green",
    },
    {
      title: "Drafts",
      value: "0",
      icon: FaEdit,
      color: "orange",
    },
    {
      title: "Categories",
      value: "3",
      icon: FaQuestionCircle,
      color: "purple",
    },
  ];

  const categories = [
    "All",
    "Billing & Credits",
    "Technical",
    "Getting Started",
  ];

  const faqs = [
    {
      id: 1,
      question: "What can I use credits for?",
      category: "Billing & Credits",
      status: "Published",
    },
    {
      id: 2,
      question: "How fast does page analysis work?",
      category: "Technical",
      status: "Published",
    },
    {
      id: 3,
      question: "Can I cancel my subscription anytime?",
      category: "Billing & Credits",
      status: "Published",
    },
    {
      id: 4,
      question: "What happens if I exceed my monthly credits?",
      category: "Billing & Credits",
      status: "Published",
    },
    {
      id: 5,
      question: "How do I add URLs for analysis?",
      category: "Getting Started",
      status: "Published",
    },
    {
      id: 6,
      question: "What file formats are supported for URL uploads?",
      category: "Getting Started",
      status: "Published",
    },
    {
      id: 7,
      question: "How do I check if my pages have been analyzed?",
      category: "Technical",
      status: "Published",
    },
    {
      id: 8,
      question: "What is the VIP queue and how does it work?",
      category: "Technical",
      status: "Published",
    },
    {
      id: 9,
      question: "Can I get a refund if I'm not satisfied?",
      category: "Billing & Credits",
      status: "Published",
    },
    {
      id: 10,
      question: "How does the monthly credit system work?",
      category: "Billing & Credits",
      status: "Published",
    },
  ];

  const getStatIconColor = (color) => {
    const colors = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      orange: "bg-orange-500",
      purple: "bg-purple-500",
    };
    return colors[color] || "bg-gray-500";
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Billing & Credits":
        return "bg-green-100 text-green-800";
      case "Technical":
        return "bg-green-100 text-green-800";
      case "Getting Started":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = faq.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Head>
        <title>FAQs - Admin Dashboard</title>
        <meta name="description" content="Manage FAQs in the admin dashboard" />
      </Head>
      <SEO
        title="FAQs - Admin Dashboard"
        description="Manage FAQs in the admin dashboard"
      />

      <AdminDashboardLayout>
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">FAQs</h1>
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

            {/* FAQ Management Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              {/* Section Header */}
              <div className="px-6 py-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    FAQ Management
                  </h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-sm">
                    <FaPlus className="h-4 w-4" />
                    <span className="font-medium">Add FAQ</span>
                  </button>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-md">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search FAQs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          activeCategory === category
                            ? "bg-brand-theme text-white"
                            : "bg-white text-brand-theme border border-brand-theme hover:bg-brand-theme/5"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQ List */}
              <div className="p-6">
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div
                      key={faq.id}
                      className="flex items-center justify-between p-4 border-l-4 border-brand-theme bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                              faq.category
                            )}`}
                          >
                            {faq.category}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-theme text-white">
                            {faq.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors">
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors">
                          <FaEye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminDashboardLayout>
    </>
  );
};

export default AdminFAQs;
