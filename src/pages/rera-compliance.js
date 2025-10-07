import Head from "next/head";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {
  FaGavel,
  FaShieldAlt,
  FaCertificate,
  FaCheckCircle,
  FaBuilding,
  FaUserShield,
  FaFileContract,
  FaBalanceScale,
  FaEnvelope,
  FaArrowRight,
  FaInfoCircle,
  FaAward,
  FaHandshake,
} from "react-icons/fa";

const RERACompliance = () => {
  const complianceFeatures = [
    {
      icon: <FaCertificate />,
      title: "RERA Registration",
      description:
        "We are registered with the Real Estate Regulatory Authority and comply with all RERA guidelines and regulations.",
      status: "Active",
    },
    {
      icon: <FaShieldAlt />,
      title: "Consumer Protection",
      description:
        "We ensure complete transparency and protection of consumer rights as mandated by RERA.",
      status: "Compliant",
    },
    {
      icon: <FaFileContract />,
      title: "Legal Compliance",
      description:
        "All our property transactions and agreements are in accordance with RERA regulations.",
      status: "Verified",
    },
    {
      icon: <FaBalanceScale />,
      title: "Fair Practices",
      description:
        "We follow fair and transparent business practices as required by RERA guidelines.",
      status: "Maintained",
    },
  ];

  const reraBenefits = [
    {
      icon: <FaUserShield />,
      title: "Buyer Protection",
      description:
        "Complete protection of buyer rights and interests through RERA-mandated safeguards.",
    },
    {
      icon: <FaBuilding />,
      title: "Project Transparency",
      description:
        "Full disclosure of project details, approvals and timelines as per RERA requirements.",
    },
    {
      icon: <FaHandshake />,
      title: "Dispute Resolution",
      description:
        "Access to RERA's dispute resolution mechanism for any property-related issues.",
    },
    {
      icon: <FaAward />,
      title: "Quality Assurance",
      description:
        "Assurance of quality construction and timely delivery as per RERA standards.",
    },
  ];

  const reraRequirements = [
    "All projects must be registered with RERA before launch",
    "Complete project details and approvals must be disclosed",
    "Separate bank accounts for each project as per RERA guidelines",
    "Regular updates on project progress to buyers",
    "Timely delivery of projects as per agreed timelines",
    "Fair and transparent pricing without hidden charges",
    "Proper documentation and legal compliance",
    "Access to RERA's grievance redressal mechanism",
  ];

  const reraStats = [
    { number: "100%", label: "RERA Compliant Projects" },
    { number: "5+", label: "Years of Compliance" },
    { number: "0", label: "RERA Violations" },
    { number: "100%", label: "Customer Satisfaction" },
  ];

  return (
    <>
      <Head>
        <title>
          RERA Compliance - 11yards Real Estate | Legal & Regulatory Compliance
        </title>
        <meta
          name="description"
          content="Learn about 11yards Real Estate's RERA compliance and commitment to legal transparency. We follow all RERA guidelines to protect buyer interests and ensure fair practices."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 mb-6 sm:mb-8">
                  <FaGavel className="h-4 w-4 sm:h-5 sm:w-5 text-brand-theme" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-blue-800">
                    Legal Compliance
                  </span>
                </div>

                {/* Teal Line */}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                  <span className="">RERA </span>
                  <span className="bg-gradient-to-r from-brand-theme to-yellow-400 bg-clip-text text-transparent">
                    Compliance
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                  We are fully compliant with RERA regulations and committed to
                  protecting buyer interests through transparent and fair real
                  estate practices.
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
                    Our RERA Commitment
                  </h2>

                  <div className="space-y-4 sm:space-y-6 text-brand-gray-500">
                    <p className="text-base sm:text-lg leading-relaxed">
                      The Real Estate (Regulation and Development) Act, 2016
                      (RERA) was established to protect the interests of
                      homebuyers and promote transparency in the real estate
                      sector. We are fully committed to RERA compliance and
                      follow all guidelines to ensure fair practices.
                    </p>

                    <p className="text-base sm:text-lg leading-relaxed">
                      Our RERA compliance ensures that all our projects are
                      registered, transparent and delivered on time. We maintain
                      separate bank accounts for each project and provide
                      regular updates to buyers as mandated by RERA.
                    </p>

                    <div className="bg-gradient-to-r from-brand-theme/10 to-brand-theme-600/10 rounded-xl p-4 sm:p-6 border border-brand-theme/20">
                      <p className="text-base sm:text-lg font-semibold text-brand-blue-800">
                        <FaInfoCircle className="inline h-5 w-5 mr-2 text-brand-theme" />
                        All our projects are RERA registered and we maintain
                        100% compliance with all regulations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="py-16 sm:py-20 bg-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Our RERA Compliance Record
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-6 lg:gap-x-8 lg:gap-y-8 mb-12 sm:mb-16">
                {reraStats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <FaCheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
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

          {/* Compliance Features Section */}
          <div className="py-16 sm:py-20 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Our Compliance Features
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
                {complianceFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-2 sm:mb-3 group-hover:text-brand-theme transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed mb-3 sm:mb-4">
                      {feature.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      <FaCheckCircle className="h-3 w-3" />
                      {feature.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RERA Benefits Section */}
          <div className="py-16 sm:py-20 bg-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Benefits of RERA Compliance
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
                {reraBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-3 sm:mb-4 group-hover:text-brand-theme transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RERA Requirements Section */}
          <div className="py-16 sm:py-20 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                RERA Requirements We Follow
              </h2>

              <div className="max-w-4xl mx-auto">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg border border-white/30">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {reraRequirements.map((requirement, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 sm:gap-4"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-brand-theme to-brand-theme-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <FaCheckCircle className="h-3 w-3 text-white" />
                        </div>
                        <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                          {requirement}
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
                  Questions About RERA Compliance?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-brand-gray-500 mb-6 sm:mb-8">
                  If you have any questions about our RERA compliance or need
                  more information about our legal practices, please contact us.
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

export default RERACompliance;
