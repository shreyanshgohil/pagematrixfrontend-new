import React, { useState, useEffect } from "react";
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
  FaTimes,
} from "react-icons/fa";

const AdminFAQs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAddFAQModalOpen, setIsAddFAQModalOpen] = useState(false);
  const [isEditFAQModalOpen, setIsEditFAQModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [faqToEdit, setFaqToEdit] = useState(null);
  const [faqToDelete, setFaqToDelete] = useState(null);

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

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "What can I use credits for?",
      answer:
        "Credits can be used for PageSpeed analysis of your URLs. Each URL analyzed uses one credit.",
      category: "Billing & Credits",
      status: "Published",
    },
    {
      id: 2,
      question: "How fast does page analysis work?",
      answer:
        "Page analysis typically completes within 2 minutes. VIP queue users get priority processing with 5-minute crawler visits.",
      category: "Technical",
      status: "Published",
    },
    {
      id: 3,
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription anytime through the customer portal. Your credits will remain available until the end of your billing period.",
      category: "Billing & Credits",
      status: "Published",
    },
    {
      id: 4,
      question: "What happens if I exceed my monthly credits?",
      answer:
        "If you exceed your monthly credits, you'll need to wait until the next billing cycle or upgrade your plan to get more credits.",
      category: "Billing & Credits",
      status: "Published",
    },
    {
      id: 5,
      question: "How do I add URLs for analysis?",
      answer:
        "You can add URLs by clicking the 'Add Pages' button and entering URLs one per line. Each URL will be analyzed for speed and performance metrics.",
      category: "Getting Started",
      status: "Published",
    },
    {
      id: 6,
      question: "What file formats are supported for URL uploads?",
      answer:
        "You can enter URLs directly in the text area. URLs must start with http:// or https:// and be entered one per line.",
      category: "Getting Started",
      status: "Published",
    },
    {
      id: 7,
      question: "How do I check if my pages have been analyzed?",
      answer:
        "You can check the status of your page analysis in the Tasks Dashboard. Completed analyses will show performance scores and Core Web Vitals metrics.",
      category: "Technical",
      status: "Published",
    },
    {
      id: 8,
      question: "What is the VIP queue and how does it work?",
      answer:
        "The VIP queue provides priority processing with faster analysis times. All paid plans include VIP queue access.",
      category: "Technical",
      status: "Published",
    },
    {
      id: 9,
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "Refund policies vary by plan. Please contact our support team for assistance with refund requests.",
      category: "Billing & Credits",
      status: "Published",
    },
    {
      id: 10,
      question: "How does the monthly credit system work?",
      answer:
        "Credits refresh every month on your billing date. Unused credits do not roll over to the next month.",
      category: "Billing & Credits",
      status: "Published",
    },
  ]);

  const handleAddFAQ = () => {
    setIsAddFAQModalOpen(true);
  };

  const handleEditFAQ = (faq) => {
    setFaqToEdit(faq);
    setIsEditFAQModalOpen(true);
  };

  const handleDeleteFAQ = (faq) => {
    setFaqToDelete(faq);
    setIsDeleteConfirmModalOpen(true);
  };

  const confirmDeleteFAQ = () => {
    if (faqToDelete) {
      setFaqs((prevFaqs) =>
        prevFaqs.filter((faq) => faq.id !== faqToDelete.id)
      );
      console.log("FAQ deleted:", faqToDelete.id);
    }
    setIsDeleteConfirmModalOpen(false);
    setFaqToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setFaqToDelete(null);
  };

  const handleCloseEditModal = () => {
    setIsEditFAQModalOpen(false);
    setFaqToEdit(null);
  };

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
                  <button
                    onClick={handleAddFAQ}
                    className="flex items-center space-x-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-sm"
                  >
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
                        <button
                          onClick={() => handleEditFAQ(faq)}
                          className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors"
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors">
                          <FaEye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteFAQ(faq)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
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

      {/* Add FAQ Modal */}
      <AddFAQModal
        isOpen={isAddFAQModalOpen}
        onClose={() => setIsAddFAQModalOpen(false)}
        categories={categories.filter((c) => c !== "All")}
        onSave={(newFAQ) => {
          const newId = Math.max(...faqs.map((f) => f.id), 0) + 1;
          setFaqs([...faqs, { ...newFAQ, id: newId }]);
          setIsAddFAQModalOpen(false);
        }}
      />

      {/* Edit FAQ Modal */}
      <EditFAQModal
        isOpen={isEditFAQModalOpen}
        onClose={handleCloseEditModal}
        faq={faqToEdit}
        categories={categories.filter((c) => c !== "All")}
        onSave={(updatedFAQ) => {
          setFaqs((prevFaqs) =>
            prevFaqs.map((faq) => (faq.id === updatedFAQ.id ? updatedFAQ : faq))
          );
          handleCloseEditModal();
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteFAQConfirmModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeleteFAQ}
        faq={faqToDelete}
      />
    </>
  );
};

// Add FAQ Modal Component
const AddFAQModal = ({ isOpen, onClose, categories, onSave }) => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: categories[0] || "",
    status: "Published",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.question.trim()) {
      newErrors.question = "Question is required";
    }

    if (!formData.answer.trim()) {
      newErrors.answer = "Answer is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave(formData);

    // Reset form
    setFormData({
      question: "",
      answer: "",
      category: categories[0] || "",
      status: "Published",
    });
    setErrors({});
  };

  const handleClose = () => {
    setFormData({
      question: "",
      answer: "",
      category: categories[0] || "",
      status: "Published",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-2xl w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New FAQ
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="space-y-4">
              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  placeholder="Enter the FAQ question..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                    errors.question ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.question && (
                  <p className="mt-1 text-sm text-red-600">{errors.question}</p>
                )}
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer *
                </label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Enter the FAQ answer..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                    errors.answer ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.answer && (
                  <p className="mt-1 text-sm text-red-600">{errors.answer}</p>
                )}
              </div>

              {/* Category and Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                      errors.category ? "border-red-300" : "border-gray-300"
                    }`}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors"
              >
                Create FAQ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Edit FAQ Modal Component
const EditFAQModal = ({ isOpen, onClose, faq, categories, onSave }) => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
    status: "Published",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (faq) {
      setFormData({
        question: faq.question || "",
        answer: faq.answer || "",
        category: faq.category || categories[0] || "",
        status: faq.status || "Published",
      });
    }
  }, [faq, categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.question.trim()) {
      newErrors.question = "Question is required";
    }

    if (!formData.answer.trim()) {
      newErrors.answer = "Answer is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave({ ...formData, id: faq.id });
  };

  const handleClose = () => {
    setFormData({
      question: "",
      answer: "",
      category: "",
      status: "Published",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen || !faq) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-2xl w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Edit FAQ</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="space-y-4">
              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  placeholder="Enter the FAQ question..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                    errors.question ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.question && (
                  <p className="mt-1 text-sm text-red-600">{errors.question}</p>
                )}
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer *
                </label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Enter the FAQ answer..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                    errors.answer ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.answer && (
                  <p className="mt-1 text-sm text-red-600">{errors.answer}</p>
                )}
              </div>

              {/* Category and Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                      errors.category ? "border-red-300" : "border-gray-300"
                    }`}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors"
              >
                Update FAQ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Delete FAQ Confirmation Modal Component
const DeleteFAQConfirmModal = ({ isOpen, onClose, onConfirm, faq }) => {
  if (!isOpen || !faq) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-md w-full">
          {/* Modal header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete FAQ
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Modal content */}
          <div className="px-6 py-6">
            {/* Warning icon */}
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <FaTrash className="h-6 w-6 text-red-600" />
            </div>

            <h4 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Are you sure you want to delete this FAQ?
            </h4>

            {/* FAQ details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Question:
                  </span>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {faq.question}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Category:
                  </span>
                  <span className="ml-2 text-sm text-gray-900">
                    {faq.category}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Status:
                  </span>
                  <span className="ml-2 text-sm text-gray-900">
                    {faq.status}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6 text-center">
              This action is permanent and cannot be undone. The FAQ will be
              removed from the system.
            </p>

            {/* Action buttons */}
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFAQs;
