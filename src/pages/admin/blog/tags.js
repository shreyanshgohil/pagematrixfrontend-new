import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import {
  FaTag,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaFileAlt,
} from "react-icons/fa";

const AdminBlogTags = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const [isEditTagModalOpen, setIsEditTagModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [tagToEdit, setTagToEdit] = useState(null);
  const [tagToDelete, setTagToDelete] = useState(null);

  const [tags, setTags] = useState([
    {
      id: 1,
      name: "PageSpeed",
      slug: "pagespeed",
      description: "Articles related to PageSpeed optimization",
      postCount: 15,
      createdAt: "2025-01-01",
    },
    {
      id: 2,
      name: "Performance",
      slug: "performance",
      description: "Website performance optimization tips",
      postCount: 22,
      createdAt: "2025-01-02",
    },
    {
      id: 3,
      name: "Core Web Vitals",
      slug: "core-web-vitals",
      description: "Core Web Vitals metrics and optimization",
      postCount: 8,
      createdAt: "2025-01-05",
    },
    {
      id: 4,
      name: "Optimization",
      slug: "optimization",
      description: "General optimization techniques",
      postCount: 18,
      createdAt: "2025-01-08",
    },
    {
      id: 5,
      name: "Speed",
      slug: "speed",
      description: "Website speed improvement strategies",
      postCount: 12,
      createdAt: "2025-01-10",
    },
  ]);

  const handleAddTag = () => {
    setIsAddTagModalOpen(true);
  };

  const handleEditTag = (tag) => {
    setTagToEdit(tag);
    setIsEditTagModalOpen(true);
  };

  const handleDeleteTag = (tag) => {
    setTagToDelete(tag);
    setIsDeleteConfirmModalOpen(true);
  };

  const confirmDeleteTag = () => {
    if (tagToDelete) {
      setTags((prevTags) =>
        prevTags.filter((tag) => tag.id !== tagToDelete.id)
      );
      console.log("Tag deleted:", tagToDelete.id);
    }
    setIsDeleteConfirmModalOpen(false);
    setTagToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setTagToDelete(null);
  };

  const handleCloseEditModal = () => {
    setIsEditTagModalOpen(false);
    setTagToEdit(null);
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Blog Tags - Admin Dashboard</title>
        <meta
          name="description"
          content="Manage blog tags in the admin dashboard"
        />
      </Head>
      <SEO
        title="Blog Tags - Admin Dashboard"
        description="Manage blog tags in the admin dashboard"
      />

      <AdminDashboardLayout>
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Blog Tags
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Organize and categorize your blog posts with tags
                  </p>
                </div>
                <button
                  onClick={handleAddTag}
                  className="flex items-center space-x-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-sm"
                >
                  <FaPlus className="h-4 w-4" />
                  <span className="font-medium">Add Tag</span>
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
                  placeholder="Search tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                />
              </div>
            </div>

            {/* Tags Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTags.map((tag) => (
                <div
                  key={tag.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-brand-theme/10 rounded-lg flex items-center justify-center">
                        <FaTag className="h-6 w-6 text-brand-theme" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {tag.name}
                        </h3>
                        <p className="text-sm text-gray-500">/{tag.slug}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditTag(tag)}
                        className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors"
                      >
                        <FaEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTag(tag)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {tag.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FaFileAlt className="h-4 w-4" />
                      <span>{tag.postCount} posts</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Created: {tag.createdAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredTags.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaTag className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  No tags found
                </h3>
                <p className="text-gray-500 text-lg">
                  {searchQuery
                    ? "No tags match your search criteria."
                    : "You haven't created any tags yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </AdminDashboardLayout>

      {/* Add Tag Modal */}
      <AddTagModal
        isOpen={isAddTagModalOpen}
        onClose={() => setIsAddTagModalOpen(false)}
        onSave={(newTag) => {
          const newId = Math.max(...tags.map((t) => t.id), 0) + 1;
          setTags([
            ...tags,
            {
              ...newTag,
              id: newId,
              postCount: 0,
              createdAt: new Date().toISOString().split("T")[0],
            },
          ]);
          setIsAddTagModalOpen(false);
        }}
      />

      {/* Edit Tag Modal */}
      <EditTagModal
        isOpen={isEditTagModalOpen}
        onClose={handleCloseEditModal}
        tag={tagToEdit}
        onSave={(updatedTag) => {
          setTags((prevTags) =>
            prevTags.map((tag) =>
              tag.id === updatedTag.id ? { ...tag, ...updatedTag } : tag
            )
          );
          handleCloseEditModal();
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteTagConfirmModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeleteTag}
        tag={tagToDelete}
      />
    </>
  );
};

// Add Tag Modal Component
const AddTagModal = ({ isOpen, onClose, onSave }) => {
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
                Add New Tag
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
                  Tag Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter tag name..."
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
                  placeholder="tag-slug"
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
                  placeholder="Brief description of the tag..."
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
                Create Tag
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Edit Tag Modal Component
const EditTagModal = ({ isOpen, onClose, tag, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (tag) {
      setFormData({
        name: tag.name || "",
        slug: tag.slug || "",
        description: tag.description || "",
      });
    }
  }, [tag]);

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
      id: tag.id,
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

  if (!isOpen || !tag) return null;

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
              <h3 className="text-lg font-semibold text-gray-900">Edit Tag</h3>
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
                  Tag Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter tag name..."
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
                  placeholder="tag-slug"
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
                  placeholder="Brief description of the tag..."
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
                Update Tag
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Delete Tag Confirmation Modal Component
const DeleteTagConfirmModal = ({ isOpen, onClose, onConfirm, tag }) => {
  if (!isOpen || !tag) return null;

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
                Delete Tag
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
              Are you sure you want to delete this tag?
            </h4>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Name:
                  </span>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {tag.name}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Posts:
                  </span>
                  <span className="ml-2 text-sm text-gray-900">
                    {tag.postCount} posts
                  </span>
                </div>
              </div>
            </div>

            {tag.postCount > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ This tag is used in {tag.postCount} posts. Deleting it
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
                Delete Tag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogTags;

