import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import {
  FaCalendarAlt,
  FaUser,
  FaArrowLeft,
  FaShare,
  FaBookmark,
  FaTag,
  FaHome,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaClock,
  FaEye,
  FaMapMarkerAlt,
  FaChartLine,
  FaBuilding,
} from "react-icons/fa";
import { useState } from "react";
import { getBlogById, getAllBlogs } from "../../utils/api";

// Generate static paths for all blogs at build time
export async function getStaticPaths() {
  try {
    // Fetch all blogs to generate paths
    const response = await getAllBlogs({ limit: 100 });
    const blogs = response.data.blogs || [];

    // Generate paths for each blog using their slugs
    const paths = blogs.map((blog) => ({
      params: { id: blog.slug || blog._id },
    }));

    return {
      paths,
      fallback: "blocking", // Enable ISR for new blogs
    };
  } catch (error) {
    console.error("Error generating static paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

// Use ISR with revalidation
export async function getStaticProps(context) {
  const { id } = context.params;

  try {
    const response = await getBlogById(id);
    return {
      props: {
        blog: response.data.blog,
        relatedPosts: response.data.relatedBlogs || [],
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
}

export default function BlogPost({ blog, relatedPosts }) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Show loading state only during ISR fallback (when generating new page)
  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-theme mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-brand-blue-800">
            Loading article...
          </h2>
        </div>
      </div>
    );
  }

  // Use the blog data from props (already mapped from API response)
  const blogPost = {
    ...blog,
    author: blog.author?.name || blog.author,
    authorImage:
      blog.author?.image ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    date: blog.publishedAt,
    image: blog.featuredImage,
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blogPost.title;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        );
        break;
    }
  };

  return (
    <>
      <Head>
        <title>{blogPost.title} - 11yards Blog</title>
        <meta
          name="description"
          content={
            blogPost.content.replace(/<[^>]*>/g, "").substring(0, 160) + "..."
          }
        />
      </Head>

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
              {/* Back Button */}
              <div className="mb-6 sm:mb-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-full text-brand-blue-800 font-medium hover:bg-white hover:text-brand-theme transition-all duration-300 border border-white/30 shadow-lg"
                >
                  <FaArrowLeft className="mr-2 text-brand-theme" />
                  Back to Blog
                </Link>
              </div>

              {/* Article Header */}
              <div className="text-center mb-8 sm:mb-12">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 mb-6 sm:mb-8">
                  <FaHome className="h-4 w-4 sm:h-5 sm:w-5 text-brand-theme" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-blue-800 capitalize">
                    {blogPost.category.replace("-", " ")}
                  </span>
                </div>

                {/* Teal Line */}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                  {blogPost.title}
                </h1>

                {/* Article Meta */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/90 mb-6 sm:mb-8">
                  <div className="flex items-center">
                    <img
                      src={blogPost.authorImage}
                      alt={blogPost.author}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 border-2 border-white/20"
                    />
                    <div>
                      <div className="font-medium text-white text-sm sm:text-base">
                        {blogPost.author}
                      </div>
                      <div className="text-xs sm:text-sm text-white/80">
                        Real Estate Expert
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <FaCalendarAlt className="mr-2 text-brand-theme" />
                    <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <FaClock className="mr-2 text-brand-theme" />
                    <span>{blogPost.readTime}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <FaEye className="mr-2 text-brand-theme" />
                    <span>{blogPost.views} views</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  {blogPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm text-white/90 text-xs sm:text-sm rounded-full border border-white/20"
                    >
                      <FaTag className="inline mr-1 text-brand-theme" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Article Image */}
          <div className="py-12 sm:py-16 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={blogPost.image}
                    alt={blogPost.title}
                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="py-16 sm:py-20 bg-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg border border-white/30">
                    <div
                      className="prose prose-lg max-w-none prose-headings:text-brand-blue-800 prose-p:text-brand-gray-500 prose-li:text-brand-gray-500 prose-strong:text-brand-blue-800 prose-h2:text-brand-blue-800 prose-h3:text-brand-blue-800"
                      dangerouslySetInnerHTML={{ __html: blogPost.content }}
                    />
                  </div>

                  {/* Article Actions */}
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                          isBookmarked
                            ? "bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white shadow-lg shadow-brand-theme/25"
                            : "bg-white/80 text-brand-blue-800 hover:bg-brand-theme/10 hover:text-brand-theme border border-brand-gray-200"
                        }`}
                      >
                        <FaBookmark className="mr-2 text-brand-theme" />
                        {isBookmarked ? "Bookmarked" : "Bookmark"}
                      </button>

                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-brand-gray-500 font-medium text-sm sm:text-base">
                          Share:
                        </span>
                        <button
                          onClick={() => handleShare("twitter")}
                          className="p-2 sm:p-3 bg-white/80 text-brand-blue-800 rounded-xl hover:bg-brand-theme/10 hover:text-brand-theme transition-colors duration-300 border border-brand-gray-200"
                        >
                          <FaTwitter className="text-sm sm:text-base" />
                        </button>
                        <button
                          onClick={() => handleShare("linkedin")}
                          className="p-2 sm:p-3 bg-white/80 text-brand-blue-800 rounded-xl hover:bg-brand-theme/10 hover:text-brand-theme transition-colors duration-300 border border-brand-gray-200"
                        >
                          <FaLinkedin className="text-sm sm:text-base" />
                        </button>
                        <button
                          onClick={() => handleShare("facebook")}
                          className="p-2 sm:p-3 bg-white/80 text-brand-blue-800 rounded-xl hover:bg-brand-theme/10 hover:text-brand-theme transition-colors duration-300 border border-brand-gray-200"
                        >
                          <FaFacebook className="text-sm sm:text-base" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center text-xs sm:text-sm text-brand-gray-500">
                      <FaEye className="mr-2 text-brand-theme" />
                      {blogPost.likes} likes
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 z-10 space-y-4 sm:space-y-6">
                    {/* Author Card */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-white/30">
                      <div className="text-center">
                        <img
                          src={blogPost.authorImage}
                          alt={blogPost.author}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-3 sm:mb-4 border-2 border-brand-gray-200"
                        />
                        <h3 className="text-base sm:text-lg font-bold text-brand-blue-800 mb-2">
                          {blogPost.author}
                        </h3>
                        <p className="text-brand-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
                          {blog.author?.bio ||
                            "Real Estate Expert & Market Analyst"}
                        </p>
                        <button className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white font-semibold rounded-xl hover:from-brand-theme-600 hover:to-brand-theme-800 transition-all duration-300 text-sm sm:text-base">
                          Follow
                        </button>
                      </div>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts && relatedPosts.length > 0 && (
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-white/30">
                        <h3 className="text-base sm:text-lg font-bold text-brand-blue-800 mb-3 sm:mb-4">
                          Related Posts
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                          {relatedPosts.map((post) => (
                            <Link
                              key={post._id}
                              href={`/blog/${post.slug || post._id}`}
                              className="group block"
                            >
                              <div className="flex gap-2 sm:gap-3">
                                <img
                                  src={post.featuredImage}
                                  alt={post.title}
                                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-xs sm:text-sm font-semibold text-brand-blue-800 group-hover:text-brand-theme transition-colors duration-300 line-clamp-2">
                                    {post.title}
                                  </h4>
                                  <p className="text-xs text-brand-gray-500 mt-1">
                                    {post.author?.name || post.author} •{" "}
                                    {post.readTime}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-brand-blue-700 via-brand-blue-800 to-brand-theme-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white">
                      <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">
                        Ready to Find Your Dream Property?
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4">
                        Let our experts help you find the perfect property that
                        matches your needs and budget.
                      </p>
                      <Link
                        href="/properties"
                        className="block w-full text-center px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white font-semibold rounded-xl hover:from-brand-theme-600 hover:to-brand-theme-800 transition-all duration-300 text-sm sm:text-base"
                      >
                        Browse Properties
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="py-16 sm:py-20 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto">
                {/* Teal Line */}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6">
                  Stay Updated
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-brand-gray-500 mb-6 sm:mb-8">
                  Subscribe to our newsletter and never miss the latest insights
                  on real estate trends and investment opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 sm:py-4 bg-white border-2 border-brand-gray-200 rounded-xl text-brand-blue-800 placeholder-brand-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-theme focus:border-brand-theme transition-all duration-300 text-sm sm:text-base"
                  />
                  <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-brand-theme/25 text-sm sm:text-base">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
