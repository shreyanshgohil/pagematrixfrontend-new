import Head from "next/head";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SEO from "../components/common/SEO";
import {
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
  FaSearch,
  FaTag,
  FaHome,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaBuilding,
  FaMapMarkerAlt,
  FaChartLine,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { getAllBlogs, getBlogCategories } from "../utils/api";
import CTASection from "../components/pages/Home/CTASection";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Fetch blogs and categories on mount and when filters change
  useEffect(() => {
    fetchBlogs();
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [currentPage, selectedCategory, searchTerm]);

  // Scroll to blog section when page changes (except initial load)
  useEffect(() => {
    if (!isInitialLoad) {
      const element = document.getElementById("featured-posts");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [currentPage]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoadingBlogs(true);
      const params = {
        page: currentPage,
        limit: 9,
      };

      if (selectedCategory && selectedCategory !== "all") {
        params.category = selectedCategory;
      }

      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await getAllBlogs(params);
      setBlogPosts(response.data.blogs);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogPosts([]);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getBlogCategories();
      const cats = response.data || [];
      // Add "all" category at the beginning
      const allCount = cats.reduce((sum, cat) => sum + cat.count, 0);
      setCategories([
        { id: "all", name: "All Posts", count: allCount },
        ...cats,
      ]);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([{ id: "all", name: "All Posts", count: 0 }]);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <SEO
        title="Real Estate Blog - 11yards | Market Insights, Investment Tips & Property News"
        description="Stay updated with the latest insights on real estate market trends, investment tips and property news from 11yards experts. Expert analysis, market reports and investment strategies for Indian real estate."
        keywords="real estate blog, property news, real estate trends, investment tips, market insights, property investment, real estate analysis, property market, real estate advice, 11yards blog"
        url="/blog"
        type="blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "11yards Real Estate Blog",
          description:
            "Stay updated with the latest insights on real estate market trends, investment tips and property news from 11yards experts.",
          url: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"
          }/blog`,
          publisher: {
            "@type": "Organization",
            name: "11yards",
            url: process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com",
            logo: {
              "@type": "ImageObject",
              url: `${
                process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"
              }/images/logos/logo-header.svg`,
            },
          },
          blogPost: blogPosts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            author: {
              "@type": "Person",
              name: post.author?.name || post.author,
            },
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            url: `${
              process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"
            }/blog/${post.slug || post._id}`,
            image: post.featuredImage,
            keywords: post.tags.join(", "),
            articleSection: post.category,
            wordCount: post.readTime,
          })),
        }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-brand-blue-700 via-brand-blue-800 to-brand-theme-600 py-20 sm:py-24 lg:py-32 overflow-hidden">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Main Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700/90 via-brand-blue-800/80 to-brand-theme-600/70"></div>

              {/* Animated Background Shapes */}
              {/* <div className="absolute top-20 left-4 sm:left-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-brand-theme/30 to-brand-theme-600/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-4 sm:right-10 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-l from-brand-blue-700/30 to-brand-theme/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-brand-theme/20 to-brand-blue-700/20 rounded-full blur-2xl animate-pulse delay-500"></div> */}

              {/* Additional Floating Elements */}
              <div className="absolute top-1/4 right-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-r from-brand-theme/15 to-brand-blue-700/15 rounded-full blur-2xl animate-pulse delay-700"></div>
              <div className="absolute bottom-1/4 left-1/4 w-40 sm:w-56 h-40 sm:h-56 bg-gradient-to-r from-brand-blue-700/15 to-brand-theme/15 rounded-full blur-2xl animate-pulse delay-300"></div>

              {/* Enhanced Grid Pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>

              {/* Subtle Wave Pattern */}
              <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-white/10 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:pt-8 lg:py-16">
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 mb-6 sm:mb-8">
                  <FaHome className="h-4 w-4 sm:h-5 sm:w-5 text-brand-theme" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-blue-800">
                    Real Estate Insights
                  </span>
                </div>

                {/* Teal Line */}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                  <span className="block">Real Estate</span>
                  <span className="bg-gradient-to-r from-brand-theme to-yellow-400 bg-clip-text text-transparent">
                    Knowledge Hub
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                  Stay ahead with expert insights, market analysis and
                  investment strategies from our real estate specialists. Make
                  informed property decisions with confidence.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 lg:mb-16">
                  <Link
                    href="#featured-posts"
                    className="group relative px-6 sm:px-8 py-3.5 w-full sm:w-auto sm:py-4 bg-gradient-to-r from-brand-theme to-brand-theme-600 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg text-white hover:from-brand-theme-600 hover:to-brand-theme-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-brand-theme/25 inline-flex items-center justify-center"
                  >
                    Explore Articles
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 w-full sm:w-auto border-white/30 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    Get Expert Advice
                  </Link>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-12 sm:gap-y-6 lg:gap-x-8 lg:gap-y-8">
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaUser className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                    10+
                  </div>
                  <div className="text-xs sm:text-sm text-white/80 font-medium">
                    Expert Articles
                  </div>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaChartLine className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                    25K+
                  </div>
                  <div className="text-xs sm:text-sm text-white/80 font-medium">
                    Monthly Readers
                  </div>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaTag className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                    5+
                  </div>
                  <div className="text-xs sm:text-sm text-white/80 font-medium">
                    Categories
                  </div>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaCalendarAlt className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                    Weekly
                  </div>
                  <div className="text-xs sm:text-sm text-white/80 font-medium">
                    New Content
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div
            id="featured-posts"
            className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-brand-gray-300 to-white"
          >
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Featured Articles
              </h2>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-white/30 mb-8 sm:mb-12">
                <div className="flex flex-col lg:flex-row gap-6 items-center">
                  {/* Search */}
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-theme" />
                      <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white border-2 border-brand-gray-200 rounded-xl text-brand-blue-800 placeholder-brand-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:border-brand-theme transition-all duration-300 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryChange(category.id)}
                          className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                            selectedCategory === category.id
                              ? "bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white shadow-lg shadow-brand-theme/25"
                              : "bg-white/80 text-brand-blue-800 hover:bg-brand-theme/10 hover:text-brand-theme border border-brand-gray-200"
                          }`}
                        >
                          {category.name} ({category.count})
                        </button>
                      ))
                    ) : (
                      <div className="text-brand-gray-500 text-sm">
                        Loading categories...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Blog Posts Grid */}
              {blogPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {blogPosts.map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug || post._id}`}
                      className="group block"
                    >
                      <article className="relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30 cursor-pointer">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg shadow-brand-theme/25 capitalize">
                              {post.category.replace("-", " ")}
                            </span>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <span className="px-2 py-1 sm:px-3 sm:py-2 bg-white/90 text-brand-blue-800 text-xs font-medium rounded-full border border-white/30">
                              {post.readTime}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 sm:p-6">
                          <div className="flex items-center text-xs sm:text-sm text-brand-gray-500 mb-3 sm:mb-4">
                            <FaUser className="mr-2 text-brand-theme" />
                            <span className="mr-4">
                              {post.author?.name || post.author}
                            </span>
                            <FaCalendarAlt className="mr-2 text-brand-theme" />
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                          </div>

                          <h2 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-3 sm:mb-4 group-hover:text-brand-theme transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </h2>

                          <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-brand-theme/10 text-brand-theme text-xs rounded-full border border-brand-theme/20"
                              >
                                <FaTag className="inline mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="group/link inline-flex items-center text-brand-theme hover:text-brand-theme-800 font-semibold transition-colors duration-300 text-sm sm:text-base">
                            Read More
                            <FaArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              ) : null}

              {/* No Results */}
              {!isLoadingBlogs && blogPosts.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-2xl mb-4 sm:mb-6">
                    <FaSearch className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-2 sm:mb-3">
                    No articles found
                  </h3>
                  <p className="text-sm sm:text-base text-brand-gray-500">
                    Try adjusting your search terms or category filter.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center mt-8 sm:mt-12">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={!pagination.hasPrevPage}
                      className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 border ${
                        pagination.hasPrevPage
                          ? "bg-white/80 text-brand-blue-800 hover:bg-brand-theme/10 hover:text-brand-theme border-brand-gray-200"
                          : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                      }`}
                    >
                      <FaChevronLeft className="h-4 w-4" />
                    </button>

                    {[...Array(pagination.totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      // Show first, last, current, and adjacent pages
                      if (
                        pageNumber === 1 ||
                        pageNumber === pagination.totalPages ||
                        (pageNumber >= currentPage - 1 &&
                          pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300 ${
                              currentPage === pageNumber
                                ? "bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white shadow-lg shadow-brand-theme/25"
                                : "bg-white/80 text-brand-blue-800 hover:bg-brand-theme/10 hover:text-brand-theme border border-brand-gray-200"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return (
                          <span
                            key={pageNumber}
                            className="px-2 text-brand-gray-500"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(pagination.totalPages, prev + 1)
                        )
                      }
                      disabled={!pagination.hasNextPage}
                      className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 border ${
                        pagination.hasNextPage
                          ? "bg-white/80 text-brand-blue-800 hover:bg-brand-theme/10 hover:text-brand-theme border-brand-gray-200"
                          : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                      }`}
                    >
                      <FaChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
}
