import Head from "next/head";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SEO from "../components/common/SEO";
import {
  FaShieldAlt,
  FaLock,
  FaUserShield,
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaBan,
  FaEnvelope,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const Privacy = () => {
  const dataTypes = [
    {
      icon: <FaUserShield />,
      title: "Account Information",
      description:
        "Name, email, phone number and profile details you provide when creating an account.",
    },
    {
      icon: <FaEye />,
      title: "Usage Data",
      description:
        "Information about how you interact with our platform, including website URLs tested and performance preferences.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Technical Data",
      description:
        "IP address, browser type, device information and cookies to improve your experience and API performance.",
    },
    {
      icon: <FaEnvelope />,
      title: "Communication Data",
      description:
        "Messages, inquiries and other communications you send through our platform or API support.",
    },
  ];

  const dataUses = [
    {
      icon: <FaCheckCircle />,
      title: "Service Provision",
      description:
        "To provide and improve our website performance analysis services and deliver accurate PageSpeed insights.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Security",
      description:
        "To ensure the security and integrity of our platform and protect against fraud and API abuse.",
    },
    {
      icon: <FaEnvelope />,
      title: "Communication",
      description:
        "To communicate with you about our services, updates and relevant performance optimization information.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Legal Compliance",
      description:
        "To comply with legal obligations and regulatory requirements for data processing.",
    },
  ];

  const userRights = [
    {
      icon: <FaEye />,
      title: "Access",
      description: "Request access to your personal data we hold about you.",
    },
    {
      icon: <FaEdit />,
      title: "Rectification",
      description: "Correct any inaccurate or incomplete personal data.",
    },
    {
      icon: <FaTrash />,
      title: "Erasure",
      description:
        "Request deletion of your personal data in certain circumstances.",
    },
    {
      icon: <FaBan />,
      title: "Objection",
      description:
        "Object to processing of your personal data for certain purposes.",
    },
    {
      icon: <FaDownload />,
      title: "Portability",
      description:
        "Receive your personal data in a structured, machine-readable format.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Withdraw Consent",
      description: "Withdraw consent where we rely on consent for processing.",
    },
  ];

  return (
    <>
      <SEO
        title="Privacy Policy - PageSpeed Performance Tool | Data Protection & User Privacy"
        description="Learn how our PageSpeed performance tool collects, uses and protects your personal data. Comprehensive privacy policy covering data rights, security measures and user privacy protection. GDPR compliant data handling for performance analysis."
        keywords="privacy policy, data protection, user privacy, GDPR compliance, data security, personal data, privacy rights, data collection, PageSpeed privacy, performance tool privacy, API privacy"
        url="/privacy"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy - PageSpeed Performance Tool",
          description:
            "Learn how our PageSpeed performance tool collects, uses and protects your personal data. Comprehensive privacy policy covering data rights, security measures and user privacy protection.",
          url: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com"
          }/privacy`,
          isPartOf: {
            "@type": "WebSite",
            name: "PageSpeed Performance Tool",
            url:
              process.env.NEXT_PUBLIC_SITE_URL || "https://pagespeed-tool.com",
          },
          about: {
            "@type": "Thing",
            name: "Data Protection and Privacy",
            description:
              "Privacy policy and data protection measures for PageSpeed performance analysis platform",
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
                  <FaShieldAlt className="h-4 w-4 sm:h-5 sm:w-5 text-brand-theme" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-blue-800">
                    Your Privacy Matters
                  </span>
                </div>

                {/* Teal Line */}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                  <span className="">Privacy</span>{" "}
                  <span className="bg-gradient-to-r from-brand-theme to-yellow-400 bg-clip-text text-transparent">
                    Policy
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                  We take your privacy seriously. Learn how we collect, use and
                  protect your personal data to provide you with the best
                  website performance analysis experience.
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
                    Our Commitment to Your Privacy
                  </h2>

                  <div className="space-y-4 sm:space-y-6 text-brand-gray-500">
                    <p className="text-base sm:text-lg leading-relaxed">
                      When you trust us with your personal data, we take our
                      responsibility to protect it very seriously. We respect
                      your privacy and your rights to control your personal
                      data.
                    </p>

                    <p className="text-base sm:text-lg leading-relaxed">
                      The primary purpose of collecting your data is to provide
                      you with our website performance analysis services,
                      whether that's analyzing your website speed, providing
                      optimization recommendations or accessing valuable
                      performance insights through our API.
                    </p>

                    <div className="bg-gradient-to-r from-brand-theme/10 to-brand-theme-600/10 rounded-xl p-4 sm:p-6 border border-brand-theme/20">
                      <p className="text-base sm:text-lg font-semibold text-brand-blue-800">
                        <FaShieldAlt className="inline h-5 w-5 mr-2 text-brand-theme" />
                        We do not and will not sell your data to third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Collection Section */}
          <div className="py-16 sm:py-20 bg-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Information We Collect
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
                {dataTypes.map((type, index) => (
                  <div
                    key={index}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      {type.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-3 sm:mb-4 group-hover:text-brand-theme transition-colors duration-300">
                      {type.title}
                    </h3>
                    <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Usage Section */}
          <div className="py-16 sm:py-20 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                How We Use Your Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
                {dataUses.map((use, index) => (
                  <div
                    key={index}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      {use.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-3 sm:mb-4 group-hover:text-brand-theme transition-colors duration-300">
                      {use.title}
                    </h3>
                    <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                      {use.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Rights Section */}
          <div className="py-16 sm:py-20 bg-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Your Rights
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                {userRights.map((right, index) => (
                  <div
                    key={index}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-theme-600 to-brand-theme-800 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      {right.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-3 sm:mb-4 group-hover:text-brand-theme transition-colors duration-300">
                      {right.title}
                    </h3>
                    <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                      {right.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Protection Section */}
          <div className="py-16 sm:py-20 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                {/* Teal Line */}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg border border-white/30">
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue-800 mb-6 sm:mb-8 text-center">
                    Data Protection & Security
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                        <FaLock />
                      </div>
                      <h3 className="text-lg font-bold text-brand-blue-800 mb-3">
                        Encryption
                      </h3>
                      <p className="text-sm text-brand-gray-500">
                        All data is encrypted in transit and at rest using
                        industry-standard protocols.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                        <FaShieldAlt />
                      </div>
                      <h3 className="text-lg font-bold text-brand-blue-800 mb-3">
                        Access Control
                      </h3>
                      <p className="text-sm text-brand-gray-500">
                        Strict access controls ensure only authorized personnel
                        can access your data.
                      </p>
                    </div>
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
                  Questions About Your Privacy?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-brand-gray-500 mb-6 sm:mb-8">
                  If you have any questions about this Privacy Policy or our
                  data practices, please don't hesitate to contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="mailto:privacy@pagespeed-tool.com"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white font-semibold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl hover:shadow-lg hover:shadow-brand-theme/25 transition-all duration-300 text-sm sm:text-base"
                  >
                    <FaEnvelope className="text-sm" />
                    Email Us
                    <FaArrowRight className="text-sm" />
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border-2 border-brand-theme text-brand-theme font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-brand-theme hover:text-white transition-all duration-300 text-sm sm:text-base"
                  >
                    Contact Us
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

export default Privacy;
