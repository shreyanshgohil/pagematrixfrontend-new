import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import {
  FaFolder,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaFileAlt,
} from "react-icons/fa";

const AdminBlogCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Getting Started",
      slug: "getting-started",
      description: "Articles for beginners to get started with PageSpeed analysis",
      postCount: 5,
      createdAt: "2025-01-01",
    },
    {
      id: 2,
      name: "Technical",
      slug: "technical",
      description: "Technical deep-dives and advanced topics",
      postCount: 12,
      createdAt: "2025-01-05",
    },
    {
      id: 3,
      name: "Tutorials",
      slug: "tutorials",
      description: "Step-by-step guides and tutorials",
      postCount: 8,
      createdAt: "2025-01-10",
    },
    {
      id: 4,
      name: "News",
      slug: "news",
      description: "Latest updates and announcements",
      postCount: 3,
      createdAt: "2025-01-15",
    },
  ]);

  const handleAddCategory = () => {
    setIsAddCategoryModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setCategoryToEdit(category);
    setIsEditCategoryModalOpen(true);
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setIsDeleteConfirmModalOpen(true);
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryToDelete.id)
      );
      console.log("Category deleted:", categoryToDelete.id);
    }
    setIsDeleteConfirmModalOpen(false);
    setCategoryToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setCategoryToDelete(null);
  };

  const handleCloseEditModal = () => {
    setIsEditCategoryModalOpen(false);
    setCategoryToEdit(null);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Blog Categories - Admin Dashboard</title>
        <meta
          name="description"
          content="Manage blog categories in the admin dashboard"
        />
      </Head>
      <SEO
        title="Blog Categories - Admin Dashboard"
        description="Manage blog categories in the admin dashboard"
      />

      <AdminDashboardLayout>
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Blog Categories
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Organize your blog posts with categories
                  </p>
                </div>
                <button
                  onClick={handleAddCategory}
                  className="flex items-center space-x-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-sm"
                >
                  <FaPlus className="h-4 w-4" />
                  <span className="font-medium">Add Category</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-6">
            {/* Search Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
              <div className="relative max-w-md">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                />
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                        <FaFolder className="h-6 w-6 text-brand-theme" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500">/{category.slug}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors"
                      >
                        <FaEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FaFileAlt className="h-4 w-4" />
                      <span>{category.postCount} posts</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Created: {category.createdAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaFolder className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  No categories found
                </h3>
                <p className="text-gray-500 text-lg">
                  {searchQuery
                    ? "No categories match your search criteria."
                    : "You haven't created any categories yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </AdminDashboardLayout>

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onSave={(newCategory) => {
          const newId = Math.max(...categories.map((c) => c.id), 0) + 1;
          setCategories([
            ...categories,
            {
              ...newCategory,
              id: newId,
              postCount: 0,
              createdAt: new Date().toISOString().split("T")[0],
            },
          ]);
          setIsAddCategoryModalOpen(false);
        }}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        isOpen={isEditCategoryModalOpen}
        onClose={handleCloseEditModal}
        category={categoryToEdit}
        onSave={(updatedCategory) => {
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category.id === updatedCategory.id
                ? { ...category, ...updatedCategory }
                : category
            )
          );
          handleCloseEditModal();
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteCategoryConfirmModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeleteCategory}
        category={categoryToDelete}
      />
    </>
  );
};

// Add Category Modal Component
const AddCategoryModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Auto-generate slug from name
    if (name === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
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
      name: "",
      slug: "",
      description: "",
    });
    setErrors({});
  };

  const handleClose = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        ></div>

        <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New Category
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter category name..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="category-slug"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                    errors.slug ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Brief description of the category..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                />
              </div>
            </div>

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
                Create Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Edit Category Modal Component
const EditCategoryModal = ({ isOpen, onClose, category, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
      });
    }
  }, [category]);

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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave({
      ...formData,
      id: category.id,
    });
  };

  const handleClose = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        ></div>

        <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Category
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter category name..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="category-slug"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                    errors.slug ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Brief description of the category..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                />
              </div>
            </div>

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
                Update Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Delete Category Confirmation Modal Component
const DeleteCategoryConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  category,
}) => {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-md w-full">
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Category
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <FaTrash className="h-6 w-6 text-red-600" />
            </div>

            <h4 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Are you sure you want to delete this category?
            </h4>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Name:
                  </span>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {category.name}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Posts:
                  </span>
                  <span className="ml-2 text-sm text-gray-900">
                    {category.postCount} posts
                  </span>
                </div>
              </div>
            </div>

            {category.postCount > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ This category has {category.postCount} posts. Deleting it
                  may affect those posts.
                </p>
              </div>
            )}

            <p className="text-sm text-gray-600 mb-6 text-center">
              This action is permanent and cannot be undone.
            </p>

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
                Delete Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogCategories;

