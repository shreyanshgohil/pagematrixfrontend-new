// API Configuration
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

// API Endpoints
export const API_ENDPOINTS = {
  MESSAGES: {
    CONTACT: "/messages/contact",
    INQUIRE: "/messages/inquire",
  },
  PROPERTIES: "/properties",
  NEWSLETTER: "/newsletter",
  BLOGS: {
    LIST: "/blogs",
    DETAIL: "/blogs",
    CATEGORIES: "/blogs/categories",
    FEATURED: "/blogs/featured",
    RECENT: "/blogs/recent",
  },
};

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// Specific API functions

// Message APIs
export const sendContactMessage = async (formData) => {
  return apiCall(API_ENDPOINTS.MESSAGES.CONTACT, {
    method: "POST",
    body: JSON.stringify(formData),
  });
};

export const sendInquiryMessage = async (formData) => {
  return apiCall(API_ENDPOINTS.MESSAGES.INQUIRE, {
    method: "POST",
    body: JSON.stringify(formData),
  });
};

// Blog APIs
export const getAllBlogs = async (params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const endpoint = queryParams
    ? `${API_ENDPOINTS.BLOGS.LIST}?${queryParams}`
    : API_ENDPOINTS.BLOGS.LIST;
  return apiCall(endpoint);
};

export const getBlogById = async (id) => {
  return apiCall(`${API_ENDPOINTS.BLOGS.DETAIL}/${id}`);
};

export const getBlogCategories = async () => {
  return apiCall(API_ENDPOINTS.BLOGS.CATEGORIES);
};

export const getFeaturedBlogs = async (limit = 6) => {
  return apiCall(`${API_ENDPOINTS.BLOGS.FEATURED}?limit=${limit}`);
};

export const getRecentBlogs = async (limit = 5) => {
  return apiCall(`${API_ENDPOINTS.BLOGS.RECENT}?limit=${limit}`);
};
