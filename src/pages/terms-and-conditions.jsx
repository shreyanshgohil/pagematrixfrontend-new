import Head from "next/head";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SEO from "../components/common/SEO";
import {
  FaFileContract,
  FaUserCheck,
  FaShieldAlt,
  FaGavel,
  FaExclamationTriangle,
  FaCopyright,
  FaLock,
  FaInfoCircle,
  FaLink,
  FaEdit,
  FaBalanceScale,
  FaEnvelope,
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const TermsAndConditions = () => {
  const termsSections = [
    {
      number: "01",
      title: "Acceptance of Terms",
      icon: <FaUserCheck />,
      description:
        "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
      details:
        "Additionally, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.",
    },
    {
      number: "02",
      title: "Use License",
      icon: <FaFileContract />,
      description:
        "Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only.",
      details:
        "This is the grant of a license, not a transfer of title and under this license you may not modify, copy or use materials for commercial purposes.",
    },
    {
      number: "03",
      title: "User Accounts",
      icon: <FaShieldAlt />,
      description:
        "When you create an account with us, you must provide information that is accurate, complete and current at all times.",
      details:
        "You are responsible for safeguarding the password and for all activities that occur under your account.",
    },
    {
      number: "04",
      title: "Property Listings",
      icon: <FaGavel />,
      description:
        "Our platform allows users to list and search for real estate properties, but we do not list properties ourselves.",
      details:
        "Users are solely responsible for the details and authenticity of their property listings and must comply with all applicable laws.",
    },
    {
      number: "05",
      title: "Prohibited Uses",
      icon: <FaExclamationTriangle />,
      description:
        "You may not use our website for any unlawful purpose or to solicit others to perform unlawful acts.",
      details:
        "This includes violating laws, infringing intellectual property rights, harassment, submitting false information or uploading malicious code.",
    },
    {
      number: "06",
      title: "Intellectual Property",
      icon: <FaCopyright />,
      description:
        "The Service and its original content, features and functionality are the exclusive property of our company.",
      details:
        "The Service is protected by copyright, trademark and other laws.",
    },
    {
      number: "07",
      title: "Privacy Policy",
      icon: <FaLock />,
      description:
        "Your privacy is important to us. Please review our Privacy Policy to understand our practices.",
      details:
        "Our Privacy Policy governs your use of the Service and explains how we collect, use and protect your information.",
    },
    {
      number: "08",
      title: "Disclaimers",
      icon: <FaInfoCircle />,
      description:
        "The information on this website is provided on an 'as is' basis without warranties of any kind.",
      details:
        "We disclaim all warranties including merchantability, fitness for a particular purpose or non-infringement of rights.",
    },
    {
      number: "09",
      title: "Limitations",
      icon: <FaTimesCircle />,
      description:
        "In no event shall our company be liable for any damages arising from the use of our website.",
      details:
        "This includes damages for loss of data, profit or business interruption.",
    },
    {
      number: "10",
      title: "Governing Law",
      icon: <FaBalanceScale />,
      description:
        "These terms are governed by and construed in accordance with applicable laws.",
      details:
        "You irrevocably submit to the exclusive jurisdiction of the courts in the relevant location.",
    },
  ];

  const keyPoints = [
    {
      icon: <FaCheckCircle />,
      title: "User Responsibility",
      description:
        "Users are responsible for maintaining accurate account information and complying with all terms.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Platform Security",
      description:
        "We implement security measures to protect user data and platform integrity.",
    },
    {
      icon: <FaGavel />,
      title: "Legal Compliance",
      description:
        "All users must comply with applicable laws and regulations when using our platform.",
    },
    {
      icon: <FaCopyright />,
      title: "Intellectual Property",
      description:
        "Our platform content is protected by copyright and trademark laws.",
    },
  ];

  const prohibitedActions = [
    "Violate any applicable laws or regulations",
    "Infringe upon intellectual property rights",
    "Harass, abuse or discriminate against others",
    "Submit false or misleading information",
    "Upload viruses or malicious code",
    "Collect personal information of others",
    "Spam, phish or engage in fraudulent activities",
  ];

  return (
    <>
      <SEO
        title="Terms & Conditions - 11yards Real Estate | User Agreement & Legal Terms"
        description="Read our comprehensive terms and conditions for using 11yards Real Estate platform. User agreement covering property listings, user accounts, legal terms and platform usage guidelines."
        keywords="terms and conditions, user agreement, legal terms, platform terms, real estate terms, user guidelines, terms of service, 11yards terms, property platform terms"
        url="/terms-and-conditions"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms & Conditions - 11yards Real Estate",
          description:
            "Read our comprehensive terms and conditions for using 11yards Real Estate platform. User agreement covering property listings, user accounts and legal terms.",
          url: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com"
          }/terms-and-conditions`,
          isPartOf: {
            "@type": "WebSite",
            name: "11yards Real Estate",
            url: process.env.NEXT_PUBLIC_SITE_URL || "https://11yards.com",
          },
          about: {
            "@type": "Thing",
            name: "Terms and Conditions",
            description:
              "Legal terms and conditions for using the 11yards Real Estate platform",
          },
          dateModified: new Date().toISOString(),
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
                  <FaFileContract className="h-4 w-4 sm:h-5 sm:w-5 text-brand-theme" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-blue-800">
                    Legal Terms
                  </span>
                </div>

                {/* Teal Line */}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                  <span>Terms &</span>{" "}
                  <span className="bg-gradient-to-r from-brand-theme to-yellow-400 bg-clip-text text-transparent">
                    Conditions
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                  Please read these terms and conditions carefully before using
                  our real estate platform. By accessing our services, you agree
                  to be bound by these terms.
                </p>
              </div>
            </div>
          </div>

          {/* Introduction Section */}
          <div className="py-16 sm:py-20 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                {/* Teal Line */}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg border border-white/30">
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue-800 mb-6 sm:mb-8">
                    Our Legal Agreement
                  </h2>

                  <div className="space-y-4 sm:space-y-6 text-brand-gray-500">
                    <p className="text-base sm:text-lg leading-relaxed">
                      These terms and conditions ("Terms") govern your use of
                      our website and services. By accessing or using our
                      platform, you agree to be bound by these Terms. If you
                      disagree with any part of these terms, you may not access
                      our services.
                    </p>

                    <div className="bg-gradient-to-r from-brand-theme/10 to-brand-theme-600/10 rounded-xl p-4 sm:p-6 border border-brand-theme/20">
                      <p className="text-base sm:text-lg font-semibold text-brand-blue-800">
                        <FaInfoCircle className="inline h-5 w-5 mr-2 text-brand-theme" />
                        These terms are effective as of the date you first
                        access our platform.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Points Section */}
          <div className="py-16 sm:py-20 bg-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Key Points
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
                {keyPoints.map((point, index) => (
                  <div
                    key={index}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      {point.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-3 sm:mb-4 group-hover:text-brand-theme transition-colors duration-300">
                      {point.title}
                    </h3>
                    <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="py-16 sm:py-20 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Terms & Conditions
              </h2>

              <div className="space-y-6 sm:space-y-8">
                {termsSections.map((section, index) => (
                  <div
                    key={index}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex items-center gap-4 sm:gap-6">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                            {section.number}
                          </div>
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">
                            {section.icon}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-3 sm:mb-4 group-hover:text-brand-theme transition-colors duration-300">
                          {section.title}
                        </h3>
                        <p className="text-base sm:text-lg text-brand-gray-500 leading-relaxed mb-3 sm:mb-4">
                          {section.description}
                        </p>
                        <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                          {section.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prohibited Actions Section */}
          <div className="py-16 sm:py-20 bg-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Prohibited Actions
              </h2>

              <div className="max-w-4xl mx-auto">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg border border-white/30">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {prohibitedActions.map((action, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 sm:gap-4"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <FaTimesCircle className="h-3 w-3 text-white" />
                        </div>
                        <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                          {action}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="py-16 sm:py-20 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto">
                {/* Teal Line */}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6">
                  Questions About Our Terms?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-brand-gray-500 mb-6 sm:mb-8">
                  If you have any questions about these Terms & Conditions,
                  please don't hesitate to contact our legal team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="mailto:legal@11yards.com"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white font-semibold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl hover:shadow-lg hover:shadow-brand-theme/25 transition-all duration-300 text-sm sm:text-base"
                  >
                    <FaEnvelope className="text-sm" />
                    Contact Legal Team
                    <FaArrowRight className="text-sm" />
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border-2 border-brand-theme text-brand-theme font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-brand-theme hover:text-white transition-all duration-300 text-sm sm:text-base"
                  >
                    General Contact
                    <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TermsAndConditions;
