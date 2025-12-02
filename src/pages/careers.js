import Head from "next/head";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SEO from "../components/common/SEO";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaRocket,
  FaHeart,
  FaGraduationCap,
  FaLightbulb,
  FaTrophy,
  FaBuilding,
  FaTachometerAlt,
  FaCode,
  FaStar,
} from "react-icons/fa";
import { useState } from "react";
import JobApplicationModal from "../components/common/JobApplicationModal";
import Toast from "../components/common/Toast";

const Careers = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const jobCategories = [
    { id: "all", name: "All Positions", count: 6 },
    { id: "engineering", name: "Engineering", count: 3 },
    { id: "product", name: "Product & Design", count: 2 },
    { id: "marketing", name: "Marketing", count: 1 },
  ];

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      category: "engineering",
      location: "Gandhinagar, Gujarat, India",
      type: "Full-time",
      experience: "3-5 years",
      description:
        "We're looking for a passionate frontend developer to join our team and help build amazing PageSpeed analysis experiences.",
      requirements: [
        "3+ years of experience with React.js and Next.js",
        "Strong knowledge of TypeScript and modern CSS",
        "Experience with performance optimization and Core Web Vitals",
        "Familiarity with PageSpeed API integration",
        "Experience with testing frameworks (Jest, React Testing Library)",
      ],
      benefits: [
        "Competitive salary and equity",
        "Health insurance and wellness programs",
        "Flexible work arrangements",
        "Professional development budget",
        "Team building activities",
      ],
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      category: "product",
      location: "Gandhinagar, Gujarat, India",
      type: "Full-time",
      experience: "4-6 years",
      description:
        "Lead product strategy and execution for our PageSpeed performance platform, working closely with engineering and design teams.",
      requirements: [
        "4+ years of product management experience",
        "Strong analytical and problem-solving skills",
        "Experience with agile development methodologies",
        "Excellent communication and leadership skills",
        "Background in web performance or developer tools preferred",
      ],
      benefits: [
        "Competitive salary and equity",
        "Health insurance and wellness programs",
        "Flexible work arrangements",
        "Professional development budget",
        "Team building activities",
      ],
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      category: "product",
      location: "Gandhinagar, Gujarat, India",
      type: "Full-time",
      experience: "2-4 years",
      description:
        "Create beautiful and intuitive user experiences that help developers analyze and optimize website performance.",
      requirements: [
        "2+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, or Adobe Creative Suite",
        "Strong portfolio showcasing user-centered design",
        "Experience with design systems and component libraries",
        "Understanding of developer tools and performance metrics",
      ],
      benefits: [
        "Competitive salary and equity",
        "Health insurance and wellness programs",
        "Flexible work arrangements",
        "Professional development budget",
        "Team building activities",
      ],
    },
    {
      id: 4,
      title: "Backend Developer",
      department: "Engineering",
      category: "engineering",
      location: "Gandhinagar, Gujarat, India",
      type: "Full-time",
      experience: "2-4 years",
      description:
        "Build scalable backend services and APIs that power our PageSpeed analysis platform.",
      requirements: [
        "2+ years of backend development experience",
        "Proficiency in Node.js, Python, or Java",
        "Experience with PageSpeed API integration",
        "Knowledge of cloud platforms (AWS, GCP, Azure)",
        "Understanding of performance monitoring and caching",
      ],
      benefits: [
        "Competitive salary and equity",
        "Health insurance and wellness programs",
        "Flexible work arrangements",
        "Professional development budget",
        "Team building activities",
      ],
    },
    {
      id: 5,
      title: "Performance Engineer",
      department: "Engineering",
      category: "engineering",
      location: "Gandhinagar, Gujarat, India",
      type: "Full-time",
      experience: "3-5 years",
      description:
        "Specialize in web performance optimization and Core Web Vitals analysis to enhance our PageSpeed tool capabilities.",
      requirements: [
        "3+ years of web performance optimization experience",
        "Deep knowledge of Core Web Vitals and PageSpeed metrics",
        "Experience with PageSpeed Insights API",
        "Proficiency in performance testing tools (Lighthouse, WebPageTest)",
        "Understanding of CDN, caching, and optimization strategies",
      ],
      benefits: [
        "Competitive salary and equity",
        "Health insurance and wellness programs",
        "Flexible work arrangements",
        "Professional development budget",
        "Team building activities",
      ],
    },
    {
      id: 6,
      title: "Developer Relations Manager",
      department: "Marketing",
      category: "marketing",
      location: "Gandhinagar, Gujarat, India",
      type: "Full-time",
      experience: "2-3 years",
      description:
        "Build and nurture relationships with the developer community to promote our PageSpeed performance tool and API.",
      requirements: [
        "2+ years of developer relations or technical marketing experience",
        "Strong technical background in web development",
        "Experience with developer communities and events",
        "Knowledge of API documentation and developer tools",
        "Excellent communication and presentation skills",
      ],
      benefits: [
        "Competitive salary and equity",
        "Health insurance and wellness programs",
        "Flexible work arrangements",
        "Professional development budget",
        "Team building activities",
      ],
    },
  ];

  const filteredJobs = jobOpenings.filter(
    (job) => selectedCategory === "all" || job.category === selectedCategory
  );

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = () => {
    setToast({ isVisible: false, message: "", type: "success" });
  };

  const handleSubmitApplication = async (formData, jobPosition) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("resume", formData.resume);
      formDataToSend.append("position", jobPosition.title);
      formDataToSend.append("department", jobPosition.department);
      formDataToSend.append("location", jobPosition.location);
      formDataToSend.append("experience", jobPosition.experience);

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";
      const response = await fetch(`${backendUrl}/job-application`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      const result = await response.json();
      showToast(
        "Application submitted successfully! We will get back to you soon.",
        "success"
      );
    } catch (error) {
      console.error("Error submitting application:", error);
      showToast("Failed to submit application. Please try again.", "error");
      throw error;
    }
  };

  const perks = [
    {
      icon: <FaRocket />,
      title: "Growth Opportunities",
      description:
        "Fast-paced environment with opportunities to learn and grow in web performance",
      color: "from-brand-theme to-brand-theme-600",
    },
    {
      icon: <FaHeart />,
      title: "Work-Life Balance",
      description: "Flexible hours and remote work options",
      color: "from-brand-blue-700 to-brand-blue-800",
    },
    {
      icon: <FaGraduationCap />,
      title: "Learning & Development",
      description:
        "Budget for courses, conferences and performance optimization training",
      color: "from-brand-theme-600 to-brand-theme-800",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description:
        "Work on cutting-edge PageSpeed API and performance technology",
      color: "from-brand-blue-800 to-brand-theme",
    },
    {
      icon: <FaTrophy />,
      title: "Recognition",
      description:
        "Regular recognition and rewards for outstanding performance contributions",
      color: "from-brand-theme to-brand-blue-700",
    },
    {
      icon: <FaBuilding />,
      title: "Great Culture",
      description:
        "Collaborative, inclusive and supportive developer-focused environment",
      color: "from-brand-blue-600 to-brand-theme-600",
    },
  ];

  const stats = [
    {
      number: "6",
      label: "Team Members",
      icon: <FaUsers />,
      color: "from-brand-theme to-brand-theme-600",
    },
    {
      number: "6",
      label: "Open Positions",
      icon: <FaBriefcase />,
      color: "from-brand-blue-700 to-brand-blue-800",
    },
    {
      number: "100%",
      label: "Developer Satisfaction",
      icon: <FaTachometerAlt />,
      color: "from-brand-theme-600 to-brand-theme-800",
    },
    {
      number: "4.9/5",
      label: "Developer Rating",
      icon: <FaStar />,
      color: "from-brand-blue-800 to-brand-theme",
    },
  ];

  return (
    <>
      <SEO
        title="Careers - PageSpeed Performance Tool | Join Our Team & Build Your Career"
        description="Join our PageSpeed performance tool team and be part of a mission to revolutionize website performance optimization. Explore open positions, career opportunities and benefits. Work with cutting-edge performance technology."
        keywords="careers, jobs, employment, PageSpeed jobs, performance jobs, tech jobs, join PageSpeed team, career opportunities, job openings, performance careers, tech careers, developer jobs, API jobs"
        url="/careers"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Careers - PageSpeed Performance Tool",
          description:
            "Join our PageSpeed performance tool team and be part of a mission to revolutionize website performance optimization. Explore open positions and career opportunities.",
          url: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com"
          }/careers`,
          isPartOf: {
            "@type": "WebSite",
            name: "PageSpeed Performance Tool",
            url:
              process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com",
          },
          about: {
            "@type": "Organization",
            name: "PageSpeed Performance Tool",
            description:
              "Website performance analysis platform company offering career opportunities",
            url:
              process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Gandhinagar",
              addressCountry: "India",
            },
            numberOfEmployees: "10+",
            industry: "Web Performance Technology",
          },
          mainEntity: {
            "@type": "ItemList",
            name: "Job Openings",
            itemListElement: jobOpenings.map((job, index) => ({
              "@type": "JobPosting",
              position: job.title,
              description: job.description,
              employmentType: job.type,
              workHours: "Full-time",
              datePosted: new Date().toISOString(),
              jobLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: job.location,
                  addressCountry: "India",
                },
              },
              hiringOrganization: {
                "@type": "Organization",
                name: "PageSpeed Performance Tool",
                url:
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  "https://pagespeed-tool.com",
              },
            })),
          },
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

            <div className="container--boxed relative z-10 px-4 sm:px-6 lg:px-8 w-full py-12 lg:pt-8 lg:py-16">
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 mb-6 sm:mb-8">
                  <FaBriefcase className="h-4 w-4 sm:h-5 sm:w-5 text-brand-theme" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-blue-800">
                    Join Our Team
                  </span>
                </div>

                {/* Teal Line */}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                  <span className="block">Build Your</span>
                  <span className="bg-gradient-to-r from-brand-theme to-yellow-400 bg-clip-text text-transparent">
                    Career With Us
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                  Join our mission to revolutionize website performance
                  optimization. We're looking for passionate, talented
                  developers who want to make a difference in how websites
                  perform and load faster.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="py-16 sm:py-20 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Why Work With Us?
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-6 lg:gap-x-8 lg:gap-y-8 sm:mb-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white text-lg sm:text-xl">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-blue-800 mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-brand-gray-500 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Perks Section */}
          <div className="py-16 sm:py-20 bg-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Perks & Benefits
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                {perks.map((perk, index) => (
                  <div
                    key={index}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30"
                  >
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${perk.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {perk.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-3 sm:mb-4 group-hover:text-brand-theme transition-colors duration-300">
                      {perk.title}
                    </h3>
                    <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Openings Section */}
          <div className="py-16 sm:py-20 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Open Positions
              </h2>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
                {jobCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white shadow-lg shadow-brand-theme/25"
                        : "bg-white/80 text-brand-blue-800 hover:bg-brand-theme/10 hover:text-brand-theme border border-brand-gray-200"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* Job Listings */}
              <div className="space-y-6 sm:space-y-8">
                {filteredJobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="job-card group p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                          <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 group-hover:text-brand-theme transition-colors duration-300">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-brand-theme/10 text-brand-theme text-xs rounded-full">
                              {job.department}
                            </span>
                            <span className="px-2 py-1 bg-brand-blue-100 text-brand-blue-800 text-xs rounded-full">
                              {job.type}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-brand-gray-500 mb-3 sm:mb-4">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="h-4 w-4 text-brand-theme" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaClock className="h-4 w-4 text-brand-theme" />
                            <span>{job.experience}</span>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed mb-4">
                          {job.description}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => handleApplyNow(job)}
                          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white font-semibold rounded-xl hover:from-brand-theme-600 hover:to-brand-theme-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-brand-theme/25 flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                          Apply Now
                          <FaArrowRight className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-2xl mb-4 sm:mb-6">
                    <FaBriefcase className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-2 sm:mb-3">
                    No positions found
                  </h3>
                  <p className="text-sm sm:text-base text-brand-gray-500">
                    Try selecting a different category or check back later for
                    new openings.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        jobPosition={selectedJob}
        onSubmit={handleSubmitApplication}
      />

      {/* Toast Notification */}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </>
  );
};

export default Careers;
