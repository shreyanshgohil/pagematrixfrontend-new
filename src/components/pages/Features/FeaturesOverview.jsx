import React from "react";
import {
  FaRocket,
  FaTachometerAlt,
  FaMobile,
  FaCode,
  FaChartLine,
  FaShieldAlt,
  FaGlobe,
  FaCogs,
  FaClock,
  FaUsers,
} from "react-icons/fa";

const FeaturesOverview = () => {
  const features = [
    {
      title: "Google PageSpeed API Integration",
      description:
        "Powered by Google's official PageSpeed Insights API for accurate and reliable performance metrics that match Google's own analysis.",
      icon: <FaRocket className="text-3xl" />,
      color: "from-brand-blue-700 to-brand-blue-800",
      highlight: true,
    },
    {
      title: "Real-time Performance Analysis",
      description:
        "Get instant performance insights with comprehensive Core Web Vitals analysis and detailed optimization recommendations.",
      icon: <FaTachometerAlt className="text-3xl" />,
      color: "from-brand-theme to-brand-theme-600",
      highlight: true,
    },
    {
      title: "Mobile & Desktop Testing",
      description:
        "Test your website performance across both mobile and desktop devices with detailed comparison reports and device-specific insights.",
      icon: <FaMobile className="text-3xl" />,
      color: "from-brand-theme-600 to-brand-theme-800",
      highlight: true,
    },
    {
      title: "Developer-Friendly API",
      description:
        "Easy integration with our RESTful API endpoints. Get performance data programmatically for your applications with comprehensive documentation.",
      icon: <FaCode className="text-3xl" />,
      color: "from-brand-blue-800 to-brand-theme",
      highlight: true,
    },
    {
      title: "Core Web Vitals Analysis",
      description:
        "Comprehensive analysis of LCP, FID, CLS, and other critical metrics that directly impact your SEO rankings and user experience.",
      icon: <FaChartLine className="text-3xl" />,
      color: "from-brand-blue-700 to-brand-theme-600",
      highlight: false,
    },
    {
      title: "Security & Reliability",
      description:
        "Enterprise-grade security with 99.9% uptime guarantee. Your data is protected with bank-level encryption and security protocols.",
      icon: <FaShieldAlt className="text-3xl" />,
      color: "from-brand-theme-600 to-brand-blue-700",
      highlight: false,
    },
    {
      title: "Global Performance Monitoring",
      description:
        "Monitor your website performance from multiple global locations to ensure consistent user experience worldwide.",
      icon: <FaGlobe className="text-3xl" />,
      color: "from-brand-blue-800 to-brand-theme-800",
      highlight: false,
    },
    {
      title: "Automated Testing",
      description:
        "Schedule automated performance tests and receive alerts when your website performance drops below acceptable thresholds.",
      icon: <FaCogs className="text-3xl" />,
      color: "from-brand-theme-800 to-brand-blue-600",
      highlight: false,
    },
    {
      title: "Fast Response Times",
      description:
        "Get your performance analysis results in under 2 seconds with our optimized infrastructure and caching systems.",
      icon: <FaClock className="text-3xl" />,
      color: "from-brand-blue-600 to-brand-theme-500",
      highlight: false,
    },
    {
      title: "Team Collaboration",
      description:
        "Share performance reports with your team, set up notifications, and collaborate on optimization strategies with built-in team features.",
      icon: <FaUsers className="text-3xl" />,
      color: "from-brand-theme-500 to-brand-blue-700",
      highlight: false,
    },
  ];

  return (
    <section
      id="features-overview"
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-brand-gray-300 to-white"
      aria-labelledby="features-overview-heading"
    >
      <div className="container--boxed--lg px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <h2
            id="features-overview-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6"
          >
            Comprehensive PageSpeed Features
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-500 max-w-3xl mx-auto leading-relaxed">
            Our PageSpeed tool comes packed with powerful features designed to
            give you complete control over your website's performance
            optimization and monitoring needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg sm:hover:shadow-2xl transition-all duration-500 sm:transform sm:hover:-translate-y-2 border ${
                feature.highlight
                  ? "border-brand-theme/30 ring-2 ring-brand-theme/10"
                  : "border-brand-gray-300/50"
              } text-center relative overflow-hidden`}
            >
              {/* Highlight Badge */}
              {feature.highlight && (
                <div className="absolute top-3 right-3">
                  <div className="bg-gradient-to-r from-brand-theme to-brand-theme-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Popular
                  </div>
                </div>
              )}

              {/* Icon Container */}
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white mx-auto mb-4 sm:mb-6 sm:group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-lg sm:text-2xl lg:text-3xl">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-3 sm:mb-4 sm:group-hover:text-brand-theme transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-base sm:text-lg text-brand-gray-500 mb-6">
            Ready to experience these features in action?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="/pagespeed-test"
              className="group bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-brand-theme/25 flex items-center justify-center gap-2 sm:gap-3"
            >
              <FaTachometerAlt className="text-sm sm:text-base" />
              <span>Try All Features</span>
            </a>
            <a
              href="/contact"
              className="group border-2 border-brand-theme text-brand-theme font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl hover:bg-brand-theme hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
            >
              <FaCode className="text-sm sm:text-base" />
              <span>Get API Access</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
