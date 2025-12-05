import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/common/SEO";
import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import {
  FaFileAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaTimes,
  FaCalendarAlt,
  FaUser,
  FaTag,
} from "react-icons/fa";

const AdminBlogPosts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with PageSpeed Analysis",
      slug: "getting-started-with-pagespeed-analysis",
      author: "Admin",
      category: "Getting Started",
      tags: ["PageSpeed", "Performance"],
      status: "Published",
      publishedDate: "2025-01-15",
      views: 1250,
    },
    {
      id: 2,
      title: "Understanding Core Web Vitals",
      slug: "understanding-core-web-vitals",
      author: "Admin",
      category: "Technical",
      tags: ["Core Web Vitals", "Performance"],
      status: "Published",
      publishedDate: "2025-01-10",
      views: 890,
    },
    {
      id: 3,
      title: "Optimizing Website Speed",
      slug: "optimizing-website-speed",
      author: "Admin",
      category: "Technical",
      tags: ["Optimization", "Speed"],
      status: "Draft",
      publishedDate: null,
      views: 0,
    },
  ]);

  const categories = ["Getting Started", "Technical", "Tutorials", "News"];
  const statusOptions = ["All", "Published", "Draft", "Archived"];

  const handleAddPost = () => {
    setIsAddPostModalOpen(true);
  };

  const handleEditPost = (post) => {
    setPostToEdit(post);
    setIsEditPostModalOpen(true);
  };

  const handleDeletePost = (post) => {
    setPostToDelete(post);
    setIsDeleteConfirmModalOpen(true);
  };

  const confirmDeletePost = () => {
    if (postToDelete) {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postToDelete.id)
      );
      console.log("Post deleted:", postToDelete.id);
    }
    setIsDeleteConfirmModalOpen(false);
    setPostToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setPostToDelete(null);
  };

  const handleCloseEditModal = () => {
    setIsEditPostModalOpen(false);
    setPostToEdit(null);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Head>
        <title>Blog Posts - Admin Dashboard</title>
        <meta
          name="description"
          content="Manage blog posts in the admin dashboard"
        />
      </Head>
      <SEO
        title="Blog Posts - Admin Dashboard"
        description="Manage blog posts in the admin dashboard"
      />

      <AdminDashboardLayout>
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Blog Posts
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Manage and publish your blog posts
                  </p>
                </div>
                <button
                  onClick={handleAddPost}
                  className="flex items-center space-x-2 px-4 py-2 bg-brand-theme text-white rounded-lg hover:bg-brand-theme-600 transition-colors shadow-sm"
                >
                  <FaPlus className="h-4 w-4" />
                  <span className="font-medium">Add Post</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-6">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
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
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Published Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Views
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPosts.map((post) => (
                      <tr
                        key={post.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <FaFileAlt className="h-4 w-4 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {post.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                /{post.slug}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaUser className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">
                              {post.author}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              post.status
                            )}`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {post.publishedDate ? (
                            <div className="flex items-center text-sm text-gray-900">
                              <FaCalendarAlt className="h-3 w-3 text-gray-400 mr-2" />
                              {post.publishedDate}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {post.views.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors"
                            >
                              <FaEdit className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-brand-theme hover:bg-brand-theme/10 rounded-lg transition-colors">
                              <FaEye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaFileAlt className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    No posts found
                  </h3>
                  <p className="text-gray-500 text-lg">
                    {searchQuery || statusFilter !== "All"
                      ? "No posts match your search criteria."
                      : "You haven't created any posts yet."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminDashboardLayout>

      {/* Add Post Modal */}
      <AddPostModal
        isOpen={isAddPostModalOpen}
        onClose={() => setIsAddPostModalOpen(false)}
        categories={categories}
        onSave={(newPost) => {
          const newId = Math.max(...posts.map((p) => p.id), 0) + 1;
          setPosts([
            ...posts,
            {
              ...newPost,
              id: newId,
              views: 0,
            },
          ]);
          setIsAddPostModalOpen(false);
        }}
      />

      {/* Edit Post Modal */}
      <EditPostModal
        isOpen={isEditPostModalOpen}
        onClose={handleCloseEditModal}
        post={postToEdit}
        categories={categories}
        onSave={(updatedPost) => {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === updatedPost.id ? updatedPost : post
            )
          );
          handleCloseEditModal();
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeletePostConfirmModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeletePost}
        post={postToDelete}
      />
    </>
  );
};

// Add Post Modal Component
const AddPostModal = ({ isOpen, onClose, categories, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: categories[0] || "",
    tags: "",
    status: "Draft",
    publishedDate: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Auto-generate slug from title
    if (name === "title") {
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

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.status === "Published" && !formData.publishedDate) {
      newErrors.publishedDate = "Published date is required for published posts";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    onSave({
      ...formData,
      tags: tagsArray,
      publishedDate:
        formData.status === "Published" ? formData.publishedDate : null,
    });

    // Reset form
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      category: categories[0] || "",
      tags: "",
      status: "Draft",
      publishedDate: "",
    });
    setErrors({});
  };

  const handleClose = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      category: categories[0] || "",
      tags: "",
      status: "Draft",
      publishedDate: "",
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

        <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-white px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New Post
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
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter post title..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                    errors.title ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
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
                  placeholder="post-url-slug"
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
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Brief description of the post..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={10}
                  placeholder="Write your post content here..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                    errors.content ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.content}
                  </p>
                )}
              </div>

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
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="tag1, tag2, tag3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Published Date
                  </label>
                  <input
                    type="date"
                    name="publishedDate"
                    value={formData.publishedDate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                      errors.publishedDate
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.publishedDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.publishedDate}
                    </p>
                  )}
                </div>
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
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Edit Post Modal Component
const EditPostModal = ({ isOpen, onClose, post, categories, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    status: "Draft",
    publishedDate: "",
  });
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        slug: post.slug || "",
        content: post.content || "",
        excerpt: post.excerpt || "",
        category: post.category || categories[0] || "",
        tags: post.tags ? post.tags.join(", ") : "",
        status: post.status || "Draft",
        publishedDate: post.publishedDate || "",
      });
    }
  }, [post, categories]);

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

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.status === "Published" && !formData.publishedDate) {
      newErrors.publishedDate = "Published date is required for published posts";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    onSave({
      ...formData,
      id: post.id,
      tags: tagsArray,
      publishedDate:
        formData.status === "Published" ? formData.publishedDate : null,
      views: post.views,
    });
  };

  const handleClose = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      category: "",
      tags: "",
      status: "Draft",
      publishedDate: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        ></div>

        <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-white px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Post
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
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter post title..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                    errors.title ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
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
                  placeholder="post-url-slug"
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
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Brief description of the post..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={10}
                  placeholder="Write your post content here..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                    errors.content ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.content}
                  </p>
                )}
              </div>

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
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="tag1, tag2, tag3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Published Date
                  </label>
                  <input
                    type="date"
                    name="publishedDate"
                    value={formData.publishedDate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-theme focus:border-brand-theme ${
                      errors.publishedDate
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.publishedDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.publishedDate}
                    </p>
                  )}
                </div>
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
                Update Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Delete Post Confirmation Modal Component
const DeletePostConfirmModal = ({ isOpen, onClose, onConfirm, post }) => {
  if (!isOpen || !post) return null;

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
                Delete Post
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
              Are you sure you want to delete this post?
            </h4>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Title:
                  </span>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {post.title}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Category:
                  </span>
                  <span className="ml-2 text-sm text-gray-900">
                    {post.category}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Status:
                  </span>
                  <span className="ml-2 text-sm text-gray-900">
                    {post.status}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6 text-center">
              This action is permanent and cannot be undone. The post will be
              removed from the system.
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
                Delete Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogPosts;

